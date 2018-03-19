// var NodeGeocoder = require('node-geocoder');
//
// var options = {
//   provider: 'google',
//
//   // Optional depending on the providers
//   httpAdapter: 'http', // Default
//   apiKey: 'AIzaSyCtP850ZXwm0vrHeaQzqd6wq6uuxw1qV8s', // for Mapquest, OpenCage, Google Premier
//   formatter: 'json'        // 'gpx', 'string', ...
// };
//
// var geocoder = NodeGeocoder(options);
//
// // Using callback
// geocoder.geocode('1600 Amphitheatre Parkway, Mountain+View,CA', function(err, res) {
//   console.log(err,res);
// });

// var request = require('request');
// request('http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCtP850ZXwm0vrHeaQzqd6wq6uuxw1qV8s',
// function (error, response, body) {
//   if(error)
//     console.log(error);
//   else
//       console.log(response);
// })


// var https = require('http');
//
// var options = {
//   host: 'maps.googleapis.com',
//   port: 80,
//   path: '/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCtP850ZXwm0vrHeaQzqd6wq6uuxw1qV8s'
// };
//
// https.get(options, function(resp){
//   resp.on('data', function(chunk){
//     console.log(chunk);
//   });
// }).on("error", function(e){
//   console.log("Got error: " + e.message);
// });


var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAulm0HaEvtDqjxbTr17V28_X59YLIVVC4'
});

googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
  else {
    console.log(err);
  }
});

// const https = require('https');
//
// https.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAulm0HaEvtDqjxbTr17V28_X59YLIVVC4', (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);
//   console.log('res',res);
//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
//
// }).on('error', (e) => {
//   console.error(e);
// });


// const express = require('express')
// const app = express()
//
// app.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAulm0HaEvtDqjxbTr17V28_X59YLIVVC4', function (req, res) {
//   res.send()
// })
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })
