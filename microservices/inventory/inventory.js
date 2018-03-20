'use strict'
const http = require('http')
const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// const url = 'mongodb://10.201.97.93:27017/oms'
var url = 'mongodb://admin:admin@ds117719.mlab.com:17719/inventory'

const app = express()
const server = http.createServer(app)

app.get('/inventory', (req, res) => {
  res.send("Hey!! It's the Inventory Service")
})

app.get('/inventory/check', (req, res) => {
  var inTime = new Date();
  var productList = req.query.productObj;
  console.log('Product List', productList)
  var dcList = new Array();
  console.log('dcList : ', req.query.dcList);
  var tempDC = JSON.parse(req.query.dcList);
  var actualDCList = new Array() ;
  if(typeof req.query.dcList === 'string'){
    dcList.push(tempDC)
  }
  else{
    dcList = tempDC
  }

  // if(Array.isArray(dcList[0])){
  //   console.log('true');
  // }
  // else{
  //   console.log('false');
  // }
  //
  // console.log('type of dclist Content : ',typeof dcList[0]);
  // console.log('length of dclist Content : ',dcList[0].length);


  var unFullfilledProducts =  req.query.productObj;
  var fullfilledProducts = new Array();
  var dcLength = dcList[0].length;
  var totalProducts = 0;
  for(var product in productList){
    if(productList.hasOwnProperty(product)){
      totalProducts++;
    }
  }
  console.log('no of dc :',dcLength);
  MongoClient.connect(url, function(err, db){
    if(err) throw err;
    for( var product in productList ){
      if(productList.hasOwnProperty(product)){
        var count = 0;
        dcList[0].forEach(function(element){
          var prodQuantity = parseInt(productList[product]);
          var query = [{
            $project:{
              productId: 1,
              actualAvailability:{
                $gte: [{
                  $subtract:['$availability','$safetyStock']
                }, prodQuantity]
              }
            }
          },{
            $match:{
              productId: product,
              actualAvailability: true
            }
          }]
        //  console.log('element in inventory - > ',element);
        //console.log(element.dcId, ' element  ', typeof element.dcId);
          db.collection(element.dcId).aggregate(query).toArray(function(err, result){
            if (err) throw err
            console.log('result --> ', result);
            count++;
            console.log('count :',count);
            if(result.length > 0)
            {
              console.log('----------------------------------------------------------------------------------');
              // console.log(result);
              // console.log('element: ', element);
              var tempEl = {
                dcId: element.dcId,
                dcLoc: element.dcLocation,
                quantity: prodQuantity
              }
              console.log(tempEl);
              delete unFullfilledProducts[result[0].productId];
              console.log('unFullfilledProducts', unFullfilledProducts);
              var found = fullfilledProducts.some(function(elem){
                return elem.productId === result[0].productId;
              })
              if(!found){
                var tempArr = new Array();
                var tempEl = {
                  dcId: element.dcId,
                  dcLoc: element.dcLocation,
                  quantity: prodQuantity
                }
                tempArr.push(tempEl)
                fullfilledProducts.push( {productId: result[0].productId, dcList: tempArr })
              }
              else{
                var index = fullfilledProducts.findIndex((x) => x.productId === result[0].productId);
                var tempEl = {
                  dcId: element.dcId,
                  dcLoc: element.dcLocation,
                  quantity: prodQuantity
                }
                fullfilledProducts[index].dcList.push(tempEl);
              }
              console.log('fullfilledProducts : ',fullfilledProducts);
              if( count == totalProducts*dcLength ){
                console.log('Inventory Task Complete');
                var reply = {
                  fullfilledProducts: fullfilledProducts,
                  unFullfilledProducts: unFullfilledProducts
                }
                res.send(JSON.stringify(reply));
              }
            }
            else{
              if( count == totalProducts*dcLength ){
                console.log('Inventory Task Complete');
                var reply = {
                  fullfilledProducts: fullfilledProducts,
                  unFullfilledProducts: unFullfilledProducts
                }
                res.send(JSON.stringify(reply));
              }
            }
          })
        })
      }
    }
    db.close();
  })
})

server.listen(1103, err => {
  if(err){
    throw err
  }
  console.log('inventory Server running on 1103')
})
