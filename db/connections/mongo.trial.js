const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds117759.mlab.com:17759/trial');
module.exports = mongoose.connection;
