////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
//  filename : sortedDC.js                                                                                        //
//  author: Rubanraj R(Digital)                                                                                   //
//  language: nodejs                                                                                              //
//  description: This file is the main file for sortedDC service. This file sorts the DC's nearest to the         //
//               customer's location.                                                                             //
//  input: customer's location in terms of latitude and longitude with respect to the orderId                     //
//  output: list of 10 or 30 nearest sortedDC                                                                     //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Requiring the necessary packages ---------->
const express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , request = require('superagent')
    , db = require('./../../db/connections/mongo.trial.js')
    , dcSchema = require('./../../db/models/dcs.schema.js')
    , amqp = require('amqplib/callback_api');


app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
     });

//Mongo connection ---------->
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to mongo from sortedDC');
});


 // Queue connection
 // Happy control flow of the architecture
 amqp.connect('amqp://vnjjgaat:p4GSk4IMbZLpFQBRRsRuB7B3FoDkfpt0@skunk.rmq.cloudamqp.com/vnjjgaat:5672', function(err, conn) {
   conn.createChannel(function(err, ch) {
     var q = 'orderQueue2';
     ch.assertQueue(q, {durable: false});
     ch.consume(q, function(msg) {                                              // consuming the order queue filled by the app server
       var ord = JSON.parse(msg.content.toString());
       console.log(" [x] Received %s", msg.content.toString());
       var dcList = []                                                          // temperory variable declarations
         , dcLocDetails = []
         , dcDetails = {}
         , orderId = ord.orderId                                                // value of orderId in the queue
         , lng = parseFloat(ord.lng)                                            // parsing the longitude value fetched from the queue
         , lat = parseFloat(ord.lat);                                           // parsing the latitude value fetched from the queue
       console.log('longitude and latitude from the queue : ',lng, lat);
       dcSchema.find({dcLocation:{$near:{$geometry:{type:"Point", coordinates:[lng, lat]}}}}, (err, docs)=>{    // Mongo Geo Spatial Query
         if(err){
           console.log(err);
         }
         else {
           console.log('sorted dcs - > ',docs);
           for (var i = 0; i < docs.length; i++) {
             dcList.push(docs[i].DC_Id);
             dcLocDetails.push(docs[i]);
           }
           dcDetails['dcList'] = dcList;
           dcDetails['dcLocDetails']=dcLocDetails;
           request.get('http://localhost:1102/ors/order')                       // sending the sorted dc's lcoation details and the respective orderId to ORS
           .query({dcDetails : JSON.stringify(dcDetails.dcLocDetails), orderId: orderId})
           .end((err, res)=>{
             console.log('res: ',res.text);
           });
         }
       }).limit(30);
     }, {noAck: true});
   });
 });



 // The below route is for the unhappy path flow of the architecture
 // This route communicates with order routing service in bi-directional
 var lng = 0.0
   , lat = 0.0;
 app.get('/sortDc/ORS', function(req, resp){
   var dcList = []                                                              // temperory variable declarations
     , dcLocDetails = []
     , dcDetails = {}
     , orderId = req.query.orderId                                              // value of orderId from ORS
     , attempt = (parseInt(req.query.attempt)+1)*30                             // attempt to identify the nth iteration
     , lng = parseFloat(req.query.lng)                                          // longitude value from ORS
     , lat = parseFloat(req.query.lat);                                         // latitude value from ORS
   console.log('lng lat  - > ', attempt,lng, lat, typeof lat, typeof attempt);
   dcSchema.find({dcLocation:{$near:{$geometry:{type:"Point", coordinates:[lng, lat]}}}}, (err, docs)=>{           // Mongo Geo Spatial Query
     console.log('sorted dc - > ',docs);
      if (docs.length>(req.query.attempt*10)) {
        console.log('inside /sortDc/ORS db call')
        for (var i = req.query.attempt*10; i < docs.length; i++) {
          dcList.push(docs[i].DC_Id);
          dcLocDetails.push(docs[i]);
        }
        dcDetails['dcList'] = dcList;
        dcDetails['dcLocDetails']=dcLocDetails;
        request.get('http://localhost:1102/ors/order')                          // sending the sorted dc's lcoation details and the respective orderId to ORS
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
   }).limit(attempt);
 });


// sortedDC server
server.listen(1101, function(err, reply){
  if (err) {
    console.log('server not listening!');
  } else {
    console.log('sortedDc Server running on 1101');
  }
});
