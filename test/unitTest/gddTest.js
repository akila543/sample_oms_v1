const should = require('chai').should();
const supertest = require('supertest');
const ObjId = require('mongodb').ObjectID;
const app = require('../../bin/www');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const dcurl = supertest('http://localhost:1101/');
describe('Testing GeodistanceDeliveryService', function(err){
  it('checking  customer and dc location coordinates', function(done){
  var orderId =  "OR10000019";                              // value of orderId from ORS,
    var attempt = 7;                         // attempt to identify the nth iteration
    var lng = 77.6544856;                                      // longitude value from ORS
    var lat = 12.8498481;
    dcurl
    .get('sortDc/ORS')
    .send({orderId,attempt,lng,lat})
    .expect(200)
    .end(function(er, res){
      if (err) {
        throw done(err);
      }
      else{
        done();
      }
    });
  });
});
