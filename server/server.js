// root of the application

// load the mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// connect database
mongoose.connect('mongodb://localhost:27017/TodoApp');

// this is todo model (mongoose model)
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
})

// create new instance 
// var newTodo = new Todo({
//     text: 'Cook dinner'
// })

// save to database and save return promise so we can use then
// newTodo.save().then((doc) => {
//     console.log("Save todo", doc);
// }, (e) => {
//     console.log("Unable to save todo");
// })

// challenge create another todo and save to database
// var otherTodo = new Todo({
//     text: '  Edit Video        '
// })

// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log("Unable to save todo");
// })

// User 
// email - require it - trim it - set type - set min length of 1
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    }
});

var user = new User({
    email: 'weikee@gmail.com'
})

user.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log("Unable to save user");
})
