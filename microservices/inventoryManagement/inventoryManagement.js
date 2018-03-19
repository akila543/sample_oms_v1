////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
//  filename : inventoryManagement.js                                                                             //
//  author: Prateek Pandey(Digital)                                                                               //
//  language: nodejs                                                                                              //
//  description: This is the main file for Inventory Management Service. It is responsible for updating the       //
//               inventory after order is placed and the user clicks final payment option                         //
//  input: orderId                                                                                                //
//  output: success or failure message                                                                            //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


'use strict'
const http = require('http')                                  // initializing http package inside http constant
    , express = require('express')                            // initializing express package inside express constant
    , path = require('path')                                  // initializing path package inside path constant
    , MongoClient = require('mongodb').MongoClient            // initializing MongoClient package inside MongoClient constant
    , assert = require('assert')                              // initializing assert package inside assert constant
    , urlInventory = 'mongodb://localhost:27017/inventory'    // initializing mongodb inventory collection url inside urlInventory constant
    , urlOrders = 'mongodb://localhost:27017/trial';          // initializing mongodb trial collection url inside urlOrders constant
//  , url = 'mongodb://10.201.97.93:27017/oms'

const app = express()                                         // initializing express application inside app constant
    , server = http.createServer(app);                        // initializing application server inside server constant

// route to check whether the server is running properly
app.get('/inventoryManagement', (req, res) => {
  res.send("Hey!! It's the Inventory Management Service")
})

// route to update the inventory status
app.get('/inventoryManagement/updateInventory', (req, res) => {
  var orderId = req.query.orderId;                            // storing the orderId received from server

  // connecting to mongdb orders database
  MongoClient.connect(urlOrders, function(err, db) {
    if (err) throw err;                                       // if error in creating database connection throw error

    // query to extract order details from placedOrders collection
    var query = {
      orderId: orderId
    }
    // executing query to extract the order details from placedOrders collection
    db.collection("orders").find(query).toArray(function(err, result) {
      if (err) throw err;                                     // if error while executing query throw error
      // iterating for every product in the order
      result[0].dcDetails.forEach(function(element){
        // connecting to mongodb inventory database
        console.log(element)
        MongoClient.connect(urlInventory, function(err, dbIn){
          if (err) throw err                                  // if error in creating database connection throw error

          // new values to be updated in the database
          var updateValues = {
            // increment availability negatively with the product quantity
            $inc: {availability: -1*(element.productQuantity)}
          }
          // setting up the productId to identify the proper product to update inventory
          var updateQuery = {
            productId : element.productId
          }
          // executing query on a specific dc for fulfilling a specific product to update inventory
          dbIn.collection(element.dcId).updateOne(updateQuery, updateValues, function(err, res) {
            if (err) throw err;                               // if error executing query throw error
            console.log("1 document updated");
            dbIn.close();                                     // closing database connection to inventory databse
          });
        })
      })
      db.close();                                             // closing database connection to orders database
      res.json('Updation Complete')                           // sending up the proper response
    })
  })
})

// creating server and making it listen on port 1108
server.listen(1108, err => {
  // if error while starting server throw error
  if(err) throw err
  console.log('inventory management server running on 1108')
})
