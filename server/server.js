'use strict'
const http = require('http')
    , express = require('express')
    , app = express()
    , server = http.createServer(app)
    , path = require('path')
    , assert = require('assert')
    , PORT = process.env.PORT || 1100 ;
//routes
 //mongoose.connect('mongodb://localhost/loginapp');
//var db = mongoose.connection;
const ordersRoute = require('./routes/orders.route.js')
    , finalResult = require('./routes/finalResult.route.js')
    , finalOrder = require('./routes/finalOrder.route.js');//This route is not used

app.use(function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
 	});

app.use(express.static('./../'));

app.use('/',(req,res,next)=>{
  console.log('inside routes');
  next();

},ordersRoute, finalResult, finalOrder);



//App server ---------->
module.exports = server.listen(PORT, err => {
  if(err){
    throw err
  }
  console.log('ORS Server running on 1100')
})
