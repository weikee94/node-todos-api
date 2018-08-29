// root of the application
const _ = require('lodash');
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

app.delete('/todos/:id', (req, res) => {
    // get the id 
    var id = req.params.id;

    // validate the id 
        // not valid return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    // remove todo by id
        // success remove
            // if no doc, send 404
            // if doc send 200 
        // error
            // 400 with empty body
    Todo.findByIdAndRemove({
        _id: id
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }, (e) => {
        return res.status(400).send();
    })
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }, (e) => {
        res.status(400).send();
    })

})


app.listen(port, () => {
    console.log(`Started on port ${port}`)
});

module.exports = {
    app
}