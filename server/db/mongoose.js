// load the mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// connect database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};
