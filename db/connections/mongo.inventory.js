const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/inventory');
module.exports = mongoose.connection;
