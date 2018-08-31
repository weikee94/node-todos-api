// root of the application


require('./config/config');

const _ = require('lodash');
var express = require('express');
const { ObjectID } = require('mongodb');
// body parser take json and convert it into an object
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
// models
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

// app store our express application
var app = express();
const port = process.env.PORT || 8080;

// app dot use accept middleware params
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {

    // create new instance
     var todo = new Todo({
         text: req.body.text,
         _creator: req.user._id,
     })

     // save to db
     todo.save().then((doc) => {
        res.send(doc);
     }, (e) => {
        res.status(400).send(e);
     })
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e);
    })
});

// GET /todos/12341234
app.get('/todos/:id', authenticate, (req, res) => {
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

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
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

app.delete('/todos/:id', authenticate, (req, res) => {
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
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id,
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }, (e) => {
        return res.status(400).send();
    })
});

app.patch('/todos/:id', authenticate, (req, res) => {
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

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id,
    }, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }, (e) => {
        res.status(400).send();
    })

})

// POST /users
app.post('/users', (req, res) => {
    // create new instance of USER 
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    // save to db
    user.save().then(() => {
        // call instance method
        // generating the token by calling method
        // and adding it as a header
        return user.generateAuthToken();
    }, (e) => { 
        res.status(400).send(e);
    }).then((token) => {
        // header take two arguments which are key value pairs
        // x-auth is for custom header cuz using jwt scheme
        res.header('x-auth', token).send(user)
    })

})

// this using middleware function authenticate
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})
 
// POST /users/login { email, password }
app.post('/users/login', (req, res) => {
    // get user email and password
        // if hash(password) match in the db hashedpassword
        // return email and password back

    var body = _.pick(req.body, ['email', 'password']);
   
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    }).catch((e) => {
        res.status(400).send();
    })

});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});


app.listen(port, () => {
    console.log(`Started on port ${port}`)
});

module.exports = {
    app
}


