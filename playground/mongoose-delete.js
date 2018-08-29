const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

var id = '5b86566f7b5a17341f048ec3';

// remove all item
Todo.remove({}).then((result) => {
    console.log(result);
})

Todo.findOneAndRemove({
    _id: id,
}).then((todo) => {
    console.log(todo);
})

Todo.findByIdAndRemove({ id }).then((todo) => {
    console.log(todo);
})