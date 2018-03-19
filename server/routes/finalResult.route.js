const finalResults = require('express').Router()
    , amqp = require('amqplib/callback_api');


finalResults.get('/finalResult', (req, res) => {

  console.log("inside finalresults");

  amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q1 = 'finalresults';
      ch.assertQueue(q1, {durable: true});
      ch.consume(q1, function(msg) {
       console.log("inside consume");
       console.log(msg.content.toString());
       var details=msg.content.toString()
          , detailsarray=JSON.parse(details);
          // console.log('///////////////');
          // console.log(detailsarray);
          // console.log('///////////////');

      var detail = {
        orderId: detailsarray[0].orderid,
        deliverycost : detailsarray[0].deliverycost,
        dcDetails:detailsarray[0].dcDetails
      };
      console.log("-------->"+JSON.stringify(detailsarray));
      // console.log('<- deliverycost sent to ui ->');
      res.send(JSON.stringify(detail));
      console.log("----------------request sent------------");
      conn.close();
  }, {noAck: true});
  });
  });

})

module.exports = finalResults;
