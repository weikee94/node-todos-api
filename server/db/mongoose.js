// load the mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// connect database
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};
