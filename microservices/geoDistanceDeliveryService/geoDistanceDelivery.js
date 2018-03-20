var async = require('async');
var GoogleMapsAPI = require('googlemaps');
var amqp = require('amqplib/callback_api');
var publicConfig = {
  key: 'AIzaSyBAGUdKKRCpOfxLJUwLwJrxuPt2LXR7L7A',
  stagger_time: 1000,
  encode_polylines: false,
  secure: true
};
var gmAPI = new GoogleMapsAPI(publicConfig);
var temp = [];
amqp.connect('amqp://vnjjgaat:p4GSk4IMbZLpFQBRRsRuB7B3FoDkfpt0@skunk.rmq.cloudamqp.com/vnjjgaat', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'orderSatisfiedQueue1';
    ch.assertQueue(q, {durable: false});
    ch.consume(q, function(msg) {
      // console.log(msg.content.toString());
      var order_details = JSON.parse(msg.content.toString());
      // console.log(order_details[0].customerInfo);
      // console.log(order_details[0].customerInfo.customerCoordinates);
      var nearest_dcs = [];
      var customer_location = order_details[0].customerInfo.customerCoordinates[1] + ',' + order_details[0].customerInfo.customerCoordinates[0];
      async.each(order_details[0].products, function(product) {
        //console.log(product);
        var product_Id = product.productId;
        var dc_location = '';
        var dc_Ids = [];
        // console.log(product.dcList);
        for (var j = 0; j < product.dcList.length; j++) {
          //  console.log(product.dcList[j].dcLoc);
          if (j != product.dcList.length - 1) {
            dc_location = dc_location + product.dcList[j].dcLoc.coordinates[1] + ',' + product.dcList[j].dcLoc.coordinates[0] + '|';
          } else {
            dc_location = dc_location + product.dcList[j].dcLoc.coordinates[1] + ',' + product.dcList[j].dcLoc.coordinates[0];
          }
          dc_Ids.push(product.dcList[j].dcId);
        }
        var params = {
          origins: customer_location,
          destinations: dc_location
        }
        gmAPI.distance(params, function(err, response) {
          // console.log(response);
          //console.log(params.destinations);
          var distance_data = response.rows[0].elements;
          var index;
          var nearest = 100000;
          for (var k = 0; k < distance_data.length; k++) {
            console.log("distance data" + distance_data[k].distance.value);
            var distance = distance_data[k].distance.value / 1000;
            if (distance < nearest) {
              nearest = distance;
              index = k;
            }
          }
          nearest_dcs.push({orderId: order_details[0].orderId, productId: product_Id, dcId: dc_Ids[index], distance: nearest});
           console.log(JSON.stringify(nearest_dcs)+"/////////////////////");
          if (order_details[0].products.length == nearest_dcs.length) {

            var sum = 0;
            var cost = 0;
            var id = order_details[0].orderId;
            amqp.connect('amqp://vnjjgaat:p4GSk4IMbZLpFQBRRsRuB7B3FoDkfpt0@skunk.rmq.cloudamqp.com/vnjjgaat', function(err, conn) {
              conn.createChannel(function(err, ch) {
                var q1 = 'finalresults';

                var dc_array = [];
                //delivery service
                for (var i = 0; i < nearest_dcs.length; i++) {
                  if (dc_array.indexOf(nearest_dcs[i].dcId) == -1) {
                    dc_array.push(nearest_dcs[i].dcId);
                    var distance = nearest_dcs[i].distance;
                    // console.log(distance+"distance");
                    if (distance >= 0 && distance <= 500) {
                      cost = 20;
                    } else if (distance > 500 && distance <= 1000) {
                      cost = 40;
                    } else {
                      cost = 50
                    }
                    sum = sum + cost;
                    cost = 0;
                  }
                }
                //final result to results queue
                var results = [];
                results.push({"deliverycost": sum, "orderid": id})
                sum = 0;
                //console.log(JSON.stringify(results));
                ch.assertQueue(q1, {durable: true});
                ch.sendToQueue(q1, new Buffer(JSON.stringify(results)));
              });
            });
          }
        });
      });
    }, {noAck: true});
  });
});
