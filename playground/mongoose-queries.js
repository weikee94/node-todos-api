const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

var id = '5b84c5dc5c4b8513ff1bc927';

if (!ObjectID.isValid(id)) {
    return console.log("ID is not valid!")
}

// first method using find
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos)
})

// second method using findOne
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo)
})

// third method using findById
Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found!');
    }
    console.log('Todo', todo);
}).catch((e) => console.log(e));