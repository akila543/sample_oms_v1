const express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , request = require('superagent')
    , mongodb = require('mongodb').MongoClient
    , url = 'mongodb://admin:admin@ds117759.mlab.com:17759/trial'
    , amqp = require('amqplib/callback_api');
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
     });
// Queeeeeueeeeeeeee
amqp.connect('amqp://vnjjgaat:p4GSk4IMbZLpFQBRRsRuB7B3FoDkfpt0@skunk.rmq.cloudamqp.com/vnjjgaat', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'orderQueue2';
    ch.assertQueue(q, {durable: false});
    ch.consume(q, function(msg) {
      var ord = JSON.parse(msg.content.toString());
      console.log(" [x] Received %s", msg.content.toString());
      var dcList = []
        , dcLocDetails = []
        , dcDetails = {}
        , orderId = ord.orderId
        , lng = parseFloat(ord.lng)
        , lat = parseFloat(ord.lat);
      console.log('coo 1',lng, lat);
      mongodb.connect(url, function(err, db){
        if (err) {
          console.log('MongoDB connection failed!');
        }
        else {
          console.log('Connected to DB!');
          db.collection('dcs').find({dcLocation:{$near:{$geometry:{type:"Point", coordinates:[lng, lat]}}}},{_id:0}).limit(30).toArray(function(err, docs){
            if(err){
              console.log(err);
            }
            console.log('inside /sortDc db call')
            for (var i = 0; i < docs.length; i++) {
              dcList.push(docs[i].DC_Id);
              dcLocDetails.push(docs[i]);
            }
            dcDetails['dcList'] = dcList;
            dcDetails['dcLocDetails']=dcLocDetails;
            request.get('http://localhost:1102/ors/order')
            .query({dcDetails : JSON.stringify(dcDetails.dcLocDetails), orderId: orderId})
            .end((err, res)=>{
              console.log('res: ',res.text);
            });
          });
        }
        db.close();
      });
      // conn.close();
    }, {noAck: true});
  });
});
  var lng = 0.0
    , lat = 0.0;
app.get('/sortDc/ORS', function(req, resp){
  var dcList = []
    , dcLocDetails = []
    , dcDetails = {}
    , orderId = req.query.orderId
    , attempt = (parseInt(req.query.attempt)+1)*30
    , lng = parseFloat(req.query.lng)
    , lat = parseFloat(req.query.lat);
  console.log('lng lat  - > ', attempt,lng, lat, typeof lat, typeof attempt);
  mongodb.connect(url, function(err, db){
    if (err) {
      console.log('MongoDB connection failed!');
    }
    else {
      console.log('Connected to DB!');
      db.collection('dcs').find({dcLocation:{$near:{$geometry:{type:"Point", coordinates:[lng, lat]}}}},{_id:0}).limit(attempt).toArray(function(err, docs){
        console.log('docs sortedDcdc - > ',docs);
        if (docs.length>(req.query.attempt*10)) {
          console.log('inside /sortDc/ORS db call')
          for (var i = req.query.attempt*10; i < docs.length; i++) {
            dcList.push(docs[i].DC_Id);
            dcLocDetails.push(docs[i]);
          }
          dcDetails['dcList'] = dcList;
          dcDetails['dcLocDetails']=dcLocDetails;
          request.get('http://localhost:1102/ors/order')
                  .query({dcDetails : JSON.stringify(dcDetails.dcLocDetails), orderId: orderId})
                  .end((err, res)=>{
                    console.log('res: ',res.text);
                    resp.send('Hello ORS')
                  });
        } else {
          // request.get('http://localhost:1100/orders')
          //         .query()
          //         .end((err, res)=>{
          //           resp.send('Hello ORS')
          //         });
          console.log('struck in sorted DC');
        }
      });
    }
    db.close();
  });
});
server.listen(1101, function(err, reply){
  if (err) {
    console.log('server not listening!');
  } else {
    console.log('sortedDc Server running on 1101');
  }
});
