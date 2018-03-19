var async = require('async');
var amqp = require('amqplib/callback_api');
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBAGUdKKRCpOfxLJUwLwJrxuPt2LXR7L7A'
});

var temp=[];
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'orderSatisfiedQueue1';
    ch.assertQueue(q, {durable: false});
    ch.consume(q, function(msg) {
      // console.log(msg.content.toString());
      var order_details = JSON.parse(msg.content.toString());
    //  console.log(order_details[0].customerInfo);
      console.log(JSON.stringify(order_details[0].products));
      var nearest_dcs=[];
      var customer_location = order_details[0].customerInfo.customerCoordinates[1]+','+order_details[0].customerInfo.customerCoordinates[0];
      async.each(order_details[0].products, function(product){
        //console.log(product);
        var product_Id = product.productId;
        var product_Quantity=product.productQuantity;
        var product_Name=product.productName;
        var dc_location = '';
        var dc_Ids=[];
        //console.log(product.dcList);
        for(var j=0;j < product.dcList.length; j++){
        //  console.log(product.dcList[j].dcLoc);
          if(j!=product.dcList.length-1){
           dc_location = dc_location+product.dcList[j].dcLoc.coordinates[1]+','+product.dcList[j].dcLoc.coordinates[0]+',';
          }
          else {
            dc_location = dc_location+product.dcList[j].dcLoc.coordinates[1]+','+product.dcList[j].dcLoc.coordinates[0];
          }
          dc_Ids.push(product.dcList[j].dcId);
        }

        googleMapsClient.distanceMatrix({
          origins: customer_location,
          destinations: dc_location
          }, function(err,response){
            if(err)
            {
              console.log(err);
            }

          var distance_data=response.json.rows;
          var index;
          var nearest=100000;
          for(var k=0;k<distance_data.length;k++){
          var distance=JSON.stringify(distance_data[k].elements[0].distance.value/1000);
            if(distance<nearest){
              nearest=distance;
              index = k;
            }
          }
          nearest_dcs.push({
             orderId: order_details[0].orderId,
             productId:  product_Id,
             dcId: dc_Ids[index],
             distance: nearest,
             productName: product_Name,
             productQuantity: product_Quantity
           });
            //console.log(JSON.stringify(nearest_dcs)+"/////////////////////////");
          if(order_details[0].products.length==nearest_dcs.length){

            var sum=0;
            var cost=0;
            var id=order_details[0].orderId;

            amqp.connect('amqp://localhost', function(err, conn) {
            conn.createChannel(function(err, ch) {
            var q1='finalresults';

          var dc_array=[];
          //delivery service
          for(var i=0;i<nearest_dcs.length;i++)
          {
              if(dc_array.indexOf(nearest_dcs[i].dcId) == -1){
                  dc_array.push(nearest_dcs[i].dcId);
                  var distance=nearest_dcs[i].distance;
                  //console.log(distance+"distance");
                  if(distance >= 0 && distance <= 500)
                  {
                    cost=20;
                  }
                  else if(distance > 500 && distance <= 1000)
                  {
                    cost=40;
                  }
                  else {
                    cost=50
                  }
                  sum=sum+cost;
                  cost=0;
              }
          }
  //final result to results queue
          var results=[]
            , dcDetails = [];

            // iterated for fetching each dcDetails
          for (var i = 0; i < nearest_dcs.length; i++) {
            var tempDCDetails = {
              'productId' : nearest_dcs[i].productId,
              'dcId' : nearest_dcs[i].dcId,
              'productQuantity' : nearest_dcs[i].productQuantity
            };
            dcDetails.push(tempDCDetails);
          }
          results.push({
             "deliverycost":sum,
             "orderid":id,
             "dcDetails":dcDetails
          })
          sum=0;
          //console.log(JSON.stringify(results));
             ch.assertQueue(q1, {durable: true});
             ch.sendToQueue(q1,new Buffer(JSON.stringify(results)));
             // console.log('res - >',results);
             console.log("sent",JSON.stringify(results));
             // console.log('type _ >', typeof results.dcDetails);
              });
          });
        }
      });//end of api
     });
    },{noAck: true});
  });
});
