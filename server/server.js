// root of the application
var express = require('express');
// body parser take json and convert it into an object
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
// models
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

// app store our express application
var app = express();

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

app.listen(8080, () => {
    console.log("Started on port 8080")
});
