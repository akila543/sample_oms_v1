const mongodb = require('mongodb').MongoClient
    , url = 'mongodb://localhost:27017/trial';

mongodb.connect(url, (err, db)=>{
  if (err) {
    console.log('err inn reading data : ', err);
  } else {
    db.collection('dcs').find().limit(101).toArray((err, docs)=>{
      console.log('docs from collection - > ',docs);
    });
  }
  db.close();
});

//
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/trial');
// const db = mongoose.connection
//
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('database connected !');
//   var dcSchema = mongoose.Schema({
//     "dcId" : String,
//     "dcName" : String,
//     "dcLocation" : {}
//   });
//   var dcModel = mongoose.model('dc', dcSchema);
//   dcModel.find({}, (err, reply)=>{
//     if (err) {
//       console.log('error from mongo - > ', err);
//     } else {
//       console.log('reply from mongo _ > ', reply);
//     }
//   });
// });
