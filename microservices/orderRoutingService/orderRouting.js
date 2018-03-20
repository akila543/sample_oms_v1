'use strict'
const http = require('http')
const express = require('express')
const path = require('path')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://admin:admin@ds117759.mlab.com:17759/trial'
// var url = 'mongodb://10.201.97.93:27017/trial'
var request = require('superagent')
var amqp = require('amqplib/callback_api');

const app = express()
const server = http.createServer(app)

app.get('/ors/', (req, res) => {
  res.send("Hey!! It's the Order Routing Service")
})

app.get('/ors/order', (req, res) => {
  var orderId = req.query.orderId;
  //console.log('req.query.dcDetails---------- ',req.query.dcDetails );
  var dcLocDetails = JSON.parse(req.query.dcDetails);

  //console.log('dcloc :', dcLocDetails, ' ', typeof dcLocDetails);

  MongoClient.connect(url, function(err, db) {
    var query = {
      orderId: orderId
    }
    db.collection('finalOrder').find(query).toArray(function(err, resExist) {
      if (err)
        throw err;

      // console.log(resExist);
      // console.log(resExist.length);
      if (resExist.length == 0) {
        var finalOrder = {
          orderId: '',
          products: new Array(),
          customerInfo: ''
        }
        db.collection('orders').find(query).toArray(function(err, result) {
          if (err)
            throw err;
          console.log('res - > ', result[0].orderDetails.products);

          //check
          console.log(result);

          var tempProduct = result[0].orderDetails.products[0],
            productObj = {};
          //console.log(result[0].orderDetails.customerInfo.customerLocation)
          //change
          console.log('teeeeemp product', tempProduct, ' typeof ', typeof tempProduct);
          //console.log(dcLocDetails);
          finalOrder.orderId = result[0].orderId;

          tempProduct.forEach(function(element) {
            productObj[element.productId] = element.totalProductQuantity;
            var tempProd = {
              productId: element.productId,
              productName: element.productName,
              productQuantity: element.productQuantity,
              totalProductQuantity: element.totalProductQuantity,
              dcList: new Array()
            }
            finalOrder.products.push(tempProd);
          })
          finalOrder.customerInfo = result[0].orderDetails.customerInfo;
          //console.log('Final Order: ', finalOrder);
          //console.log(dcList, ' inside first ', typeof dcList, ' ', dcList.length)
          //  console.log(dcLocDetails);
          console.log('product obj -------------- > ', productObj);

          request.get('localhost:1103/inventory/check').query({dcList: JSON.stringify(dcLocDetails), productObj: productObj}).end(function(err, reqRes) {
            var inventoryResponse = JSON.parse(reqRes.text);
            inventoryResponse.fullfilledProducts.forEach(function(element) {
              var index = finalOrder.products.findIndex((x) => x.productId == element.productId);
              finalOrder.products[index].dcList = element.dcList;
            })
            //  console.log(finalOrder.customerInfo.customerLocation)
            // console.log(finalOrder.products[0].dcList)

            if (Object.keys(inventoryResponse.unFullfilledProducts).length == 0) {
              //full order satisfied
              //forward to order satisfied queue
              amqp.connect('amqp://vnjjgaat:p4GSk4IMbZLpFQBRRsRuB7B3FoDkfpt0@skunk.rmq.cloudamqp.com/vnjjgaat', function(err, conn) {
                conn.createChannel(function(err, ch) {
                  var q = 'orderSatisfiedQueue1';
                  var temp = new Array();
                  temp.push(finalOrder)
                  var msg = temp;
                  console.log(JSON.stringify(msg));
                  //console.log(finalOrder.products[0].dcList[0].dcLoc.coordinates[0], ' typeof ', typeof finalOrder.products[0].dcList[0].dcLoc.coordinates[0])
                  // console.log(finalOrder.products[0].dcList);
                  console.log('OOOOOOOOOOOOOOOOOOOOOrrrrrrrrrrrrrrrder sssssssssssssseeeeeeeeeeeeeeeennnnnnnnnnnnnnnt');
                  //console.log(finalOrder);

                  ch.assertQueue(q, {durable: false});
                  // Note: on Node 6 Buffer.from(msg) should be used
                  ch.sendToQueue(q, new Buffer(JSON.stringify(msg)));
                  // console.log(" [x] Sent %s", msg);
                });
                //  setTimeout(function() { conn.close(); }, 500);
              });
              db.close()
              res.send("Order Complete");
            } else {
              //push finalOrder to mongodb finalOrder collection
              console.log('Not finished in this go');
              db.collection('finalOrder').insertOne(finalOrder, function(err, resFinalOrder) {
                if (err)
                  throw err
              })
              //push unFullfilledProducts to mongodb unFullfilledProducts collection
              var unfulfilledProd = {
                  orderId: orderId,
                  attempt: 1,
                  unfullfilledProd: inventoryResponse.unFullfilledProducts
                }

                db.collection('unfullfilledProducts').insertOne(unfulfilledProd, function(err, resUnfullFill) {
                  if (err)
                    throw err
                })
                var lng = finalOrder.customerInfo.customerCoordinates[0],
                  lat = finalOrder.customerInfo.customerCoordinates[1]
                console.log(' lng lat - > ', lng, lat);
                console.log('finalOrder - > ', finalOrder);
                //call the sorted dc api
                request.get('localhost:1101/sortDc/ORS').query({orderId: orderId, lng: lng, lat: lat, attempt: 1}).end(function(err, sortRes) {
                  //console.log('soooooooorted dc reply: ', sortRes)
                });

                db.close()
                res.send("Order Incomplete");

                // db.close()
              }

              // res.send(inventoryResponse)
            });
          })
        } else {
          console.log('tryin')
          MongoClient.connect(url, function(err, db) {
            if (err)
              throw err
            var query = {
              orderId: orderId
            }
            var finalOrder;
            db.collection('finalOrder').find(query).toArray(function(err, resQueryFinal) {
              if (err)
                throw err
                //console.log(resQueryFinal[0])
              finalOrder = resQueryFinal[0]
              db.collection('finalOrder').deleteOne(query, function(err, resDelFinal) {
                if (err)
                  throw err
                  //console.log(resQueryFinal[0])
                //console.log('deletion successfull');
              })
            })
            db.collection('unfullfilledProducts').find(query).toArray(function(err, resQueryUnfull) {
              if (err)
                throw err
                //console.log('Unfullfilled Product: ', resQueryUnfull[0].unfullfilledProd)

              db.collection('unfullfilledProducts').deleteOne(query, function(err, resDelUnfull) {
                if (err)
                  throw err
                  //console.log(resQueryFinal[0])
                //  console.log('deletion successfull');
              })

              //  console.log('dcloc :', dcLocDetails, ' ', typeof dcLocDetails);
              var productObj = resQueryUnfull[0].unfullfilledProd
              var attempt = resQueryUnfull[0].attempt + 1;
              //console.log(dcList, ' inside second ', typeof dcList, ' ', dcList.length)
              request.get('localhost:1103/inventory/check').query({dcList: JSON.stringify(dcLocDetails), productObj: productObj}).end(function(err, reqRes) {
                var inventoryResponse = JSON.parse(reqRes.text);
                //console.log('finalOrder:  ',finalOrder)
                // console.log(inventoryResponse);
                // console.log(inventoryResponse.fullfilledProducts[0].dcList);
                inventoryResponse.fullfilledProducts.forEach(function(element) {
                  var index = finalOrder.products.findIndex((x) => x.productId == element.productId);
                  finalOrder.products[index].dcList = element.dcList;
                })
                //  console.log(finalOrder)
                // console.log(finalOrder.products[0].dcList)

                if (Object.keys(inventoryResponse.unFullfilledProducts).length == 0) {
                  //full order satisfied
                  //forward to order satisfied queue
                  amqp.connect('amqp://vnjjgaat:p4GSk4IMbZLpFQBRRsRuB7B3FoDkfpt0@skunk.rmq.cloudamqp.com/vnjjgaat', function(err, conn) {
                    conn.createChannel(function(err, ch) {
                      var q = 'orderSatisfiedQueue1';
                      var temp = new Array();
                      temp.push(finalOrder)
                      var msg = temp;
                      console.log(JSON.stringify(msg));
                      console.log('OOOOOOOOOOOOOOOOOOOOOrrrrrrrrrrrrrrrder sssssssssssssseeeeeeeeeeeeeeeennnnnnnnnnnnnnnt');

                      ch.assertQueue(q, {durable: false});
                      // Note: on Node 6 Buffer.from(msg) should be used
                      ch.sendToQueue(q, new Buffer(JSON.stringify(msg)));
                      //console.log(" [x] Sent %s", msg);
                    });
                    //setTimeout(function() { conn.close(); }, 500);
                  });
                  db.close()
                  res.send("Order Complete");
                } else {
                  // push finalOrder to mongodb finalOrder collection
                  console.log('Not finished in this go');
                  db.collection('finalOrder').insertOne(finalOrder, function(err, resFinalOrder) {
                    if (err)
                      throw err
                  })
                  //push unFullfilledProducts to mongodb unFullfilledProducts collection
                  var unfulfilledProd = {
                    orderId: orderId,
                    attempt: attempt,
                    unfullfilledProd: inventoryResponse.unFullfilledProducts
                  }

                  db.collection('unfullfilledProducts').insertOne(unfulfilledProd, function(err, resUnfullFill) {
                    if (err)
                      throw err
                  })

                  //call the sorted dc api
                  console.log('finalOrder - > ', finalOrder);
                  var lng = finalOrder.customerInfo.customerCoordinates[0],
                    lat = finalOrder.customerInfo.customerCoordinates[1]

                  request.get('localhost:1101/sortDc/ORS').query({orderId: orderId, lng: lng, lat: lat, attempt: attempt}).end(function(err, sortRes) {
                    //console.log('soooooooorted dc reply: ', sortRes)
                  });

                  db.close()
                  res.send("Order Incomplete");
                }
              })
            })
          })
        }
      })

      // db.close();
    })
  })

  server.listen(1102, err => {
    if (err) {
      throw err
    }
    console.log('ORS Server running on 1102')
  })
