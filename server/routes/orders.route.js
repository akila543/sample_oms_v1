const orders =  require('express').Router(),
      request = require('superagent')
      mongodb = require('mongodb').MongoClient,
      url = 'mongodb://admin:admin@ds117759.mlab.com:17759/trial',
      idGenerator = require('./../idGenerator.js');

//var amqp = require('amqplib/callback_api');

orders.post('/orders',function (req, res) {
  var coordinates = [req.query.lng, req.query.lat]
    , orderDetails = JSON.parse(req.query.orderDetails)
    , status = JSON.parse(req.query.status);
  orderDetails.customerInfo.customerCoordinates = coordinates;
  // console.log('order res - > ', orderDetails);
  var orderId = '';
  console.log('- > ',orderId);
  mongodb.connect(url, function(err, db){
    if (err) {
      console.log('MongoDB connection failed!',err);
    } else {
      console.log('Connected to DB!');
      db.collection('orders').find({}).sort({$natural:-1}).limit(1).toArray((err, docs)=>{
        if (err) {
          console.log(err);
        } else if (docs.length==0) {
          orderId = 'OR10000001';
          db.collection('orders').insert({orderId:orderId,orderDetails:orderDetails,status:status}, (err, docs)=>{
            if (err) {
              console.log(err);
            } else {
              // console.log(docs);
              // request.get('http://localhost:1101/sortDc')
              // .query({
              //   orderId:orderId,
              //   lat: req.query.lat,
              //   lng: req.query.lng
              // })
              // .end((err, res) => {    if (err) console.log(err);
              //   console.log('backend - > ',res.text);
              // });
              // Queeeeeueeeeeeeee - - - - - >
              var orderQueueObj = {
                orderId:orderId,
                lat: req.query.lat,
                lng: req.query.lng
              };
              amqp.connect('amqp://vnjjgaat:p4GSk4IMbZLpFQBRRsRuB7B3FoDkfpt0@skunk.rmq.cloudamqp.com/vnjjgaat:5672', function(err, conn) {
                conn.createChannel(function(err, ch) {
                  var q = 'orderQueue2';
                  var msg = orderQueueObj;

                  ch.assertQueue(q, {durable: false});
                  // Note: on Node 6 Buffer.from(msg) should be used
                  ch.sendToQueue(q, new Buffer(JSON.stringify(msg)));
                  console.log(" [x] Sent %s", msg);
                });
              });

            }
          });
        } else {
          orderId = idGenerator(docs[0].orderId.toString());
          db.collection('orders').insert({orderId:orderId,orderDetails:orderDetails,status:status}, (err, docs)=>{
            if (err) {
              console.log(err);
            } else {
              // console.log(docs);
              // request.get('http://localhost:1101/sortDc')
              // .query({
              //   orderId:orderId,
              //   lat: req.query.lat,
              //   lng: req.query.lng
              // })
              // .end((err, res) => {
              //   if (err) console.log(err);
              //   console.log('backend - > ',res.text);
              // });
              // Queeeeeueeeeeeeee - - - - - >\
              console.log('--------->',orderId);
              var orderQueueObj = {
                orderId:orderId,
                lat: req.query.lat,
                lng: req.query.lng
              };
              amqp.connect('amqp://vnjjgaat:p4GSk4IMbZLpFQBRRsRuB7B3FoDkfpt0@skunk.rmq.cloudamqp.com/vnjjgaat', function(err, conn) {
                conn.createChannel(function(err, ch) {
                  var q = 'orderQueue2';
                  var msg = orderQueueObj;

                  ch.assertQueue(q, {durable: false});
                  // Note: on Node 6 Buffer.from(msg) should be used
                  ch.sendToQueue(q, new Buffer(JSON.stringify(msg)));
                  console.log(" [x] Sent %s", msg);
                });
              });
            }
          });
        }
      });
    }
  });
  res.send('All fine')
})

module.exports = orders;
