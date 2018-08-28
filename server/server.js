// root of the application

// load the mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// connect database
mongoose.connect('mongodb://localhost:27017/TodoApp');

// this is todo model (mongoose model)
var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
})

// create new instance 
var newTodo = new Todo({
    text: 'Cook dinner'
})

// save to database and save return promise so we can use then
newTodo.save().then((doc) => {
    console.log("Save todo", doc);
}, (e) => {
    console.log("Unable to save todo");
})

// challenge create another todo and save to database
// var otherTodo = new Todo({
//     text: 'Jogging'
// })

// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log("Unable to save todo");
// })