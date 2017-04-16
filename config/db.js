var mongoose = require('mongoose');
    
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/lwjw7e');

module.exports = mongoose;