const finalOrder=  require('express').Router(),
      mongodb = require('mongodb').MongoClient,
      url = 'mongodb://admin:admin@ds117759.mlab.com:17759/trial',
      request = require('superagent');

finalOrder.post('/finalOrder',(req,res)=>{
  console.log('inside final order');
  var finalorderdetails=JSON.parse(req.query.finalOrder);
  console.log('-------- > ',finalorderdetails.dcDetails," - final order");
mongodb.connect(url,function(err,db){
  if(err){
    console.log('Mongo connection failed');
  }else {
    console.log('connected to DB(final order saving)');
  }
  db.collection('orders').update({"orderId":finalorderdetails.orderId},{$set: {"dcDetails":finalorderdetails.dcDetails}},(err,docs)=>{
    if(err){
      console.log('error from final order ',err);
    }
    else {
      console.log("result from final order",docs);
      db.collection('orders').update({"orderId":finalorderdetails.orderId},{$set: {"status.placed":true}}, (err, docs)=>{
        if (err) {
          console.log('err in updating placed-status - > ',err);
        } else {
          console.log('successfully updated placed-status - > ',docs);
          request.get('http://localhost:1108/inventoryManagement/updateInventory')
           .query({ orderId: finalorderdetails.orderId })
           .end(function(err, res){
             console.log(res);
         });
        }
      })
    }
  })
})



  res.send('final order saved');
})

module.exports = finalOrder;
