const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds117719.mlab.com:17719/inventory');
module.exports = mongoose.connection;
