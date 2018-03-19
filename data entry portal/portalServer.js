const express = require('express')
    , app = express()
    , request = require('superagent')
    , mongodb = require('mongodb').MongoClient
    , url = 'mongodb://10.201.97.93:27017/oms'
    , http = require('http')
    , server = http.createServer(app);

app.use(function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
 });

app.get('/product', (req,res)=>{
  mongodb.connect(url, (err, db)=>{
    if (err) {
      console.log('MongoDB connection error!');
    } else {
      db.collection('products').insert({productId:req.query.productId,productName:req.query.productName,productImageUrl:req.query.productImageUrl,productBrand:req.query.productBrand,productPrice:req.query.productPrice,productCategory:req.query.productCategory,productSubCategory:req.query.productSubCategory,productDescription:req.query.productDescription}, (err, docs)=>{
        if (err) {
          console.log('err in inserting Product details in products collection - > ',err);
        } else {
          console.log('res from product insertion - > ',docs);
        }
      });
    }
  });
});

app.get('/dc', (req,res)=>{
  mongodb.connect(url, (err, db)=>{
    if (err) {
      console.log('MongoDB connection error!');
    } else {
      db.collection('dcs').insert({dcId:req.query.dcId,dcName:req.query.dcName,dcLocation:req.query.dcLocation}, (err, docs)=>{
        if (err) {
          console.log('err in inserting DC details in dcs collection - > ',err);
        } else {
          console.log('res from dc insertion - > ',docs);
        }
      });
    }
  });
});

 server.listen('1111', (err, res)=>{
   if (err) {
     console.log('server not listening!');
   } else {
     console.log('server started on 1111!');
   }
 });
