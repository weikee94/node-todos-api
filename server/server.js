// root of the application
var express = require('express');
const { ObjectID } = require('mongodb');
// body parser take json and convert it into an object
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
// models
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

// app store our express application
var app = express();
const port = process.env.PORT || 8080;

// app dot use accept middleware params
app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    // create new instance
     var todo = new Todo({
         text: req.body.text
     })

     // save to db
     todo.save().then((doc) => {
        res.send(doc);
     }, (e) => {
        res.status(400).send(e);
     })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e);
    })
});

// GET /todos/12341234
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    // validate id using isValid
        // 404 - send back empty body
    // findById
        // success
            // if todo - send back
        // error
            //  400 - send back empty
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        })
    }, (e) => {
        res.status(400).send(e);
    })
})

app.listen(port, () => {
    console.log(`Started on port ${port}`)
});

module.exports = {
    app
}