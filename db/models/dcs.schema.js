const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

//dcs collection - document schema
var dcSchema = new Schema({
  'dcId' : String,
  'dcName' : String,
  'dcLocation' : {}
});

//modelling collection from the above schema
module.exports = mongoose.model('dc', dcSchema);
