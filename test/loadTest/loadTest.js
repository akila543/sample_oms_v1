const http = require('http'),
  express = require('express')(),
  server = http.createServer(express),
  request = require('superagent'),
  order10 = require('./order10.js');
order1 = require('./order1.js'),
order2 = require('./order2.js'),
order4 = require('./order4.js'),
order5 = require('./order5.js');

var startTime = new Date();
var counter = 0,
  limit = 50;
var endcounter = 0,
  sentOrders = 0;

sendRequest();
function sendRequest() {
  var orderDetails = {
    'products': [order5],
    'customerInfo': {
      'customerId': '',
      'firstName': '',
      'lastName': '',
      'mobile': '',
      'eMail': '',
      'address': {
        'street': '',
        'landMark': '',
        'city': '',
        'state': '',
        'pincode': '560100'
      }
    }
  }
  request.post('http://localhost:1100/orders').query({lat: '12.8498', lng: '77.6545', orderDetails: JSON.stringify(orderDetails)}).end((err, res) => {
    if (err)
      console.log(err);
    else {
      if (res.text == 'All fine') {
        sentOrders += 1;
        console.log('sent request' + sentOrders);
        if (sentOrders == limit)
          receiveRequest();
        else{
          sendRequest();
          receiveRequest();
        }
        }
      }
  })
}

function receiveRequest() {
  console.log("waiting to receive");
  request.get('http://localhost:1100/finalResult').end((err, res) => {
    console.log('inside finalResult');
    if (err || !res.ok)
      console.log(err);
    else {
      console.log('received ' + res.text)
      endcounter += 1;
      if (endcounter == limit) {
        var endTime = new Date();
        console.log(endTime.getTime() - startTime.getTime());
      } else
        receiveRequest();
      }
    })
}

module.exports = server.listen(1111, err => {
  if (err) {
    throw err
  }
  console.log('ORS Server running on 1100')
})
