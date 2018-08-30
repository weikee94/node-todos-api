var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// Example User Model
// {
//     email: 'email@gmail.com',
//     password: '',
//     tokens: [{
//         access: 'auth',
//         token: 'aduhdssdas',
//     }]
// }

// Store a schema for user (same as what we do mongoose.model)
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true
        }
    }]
})

// this method modify the sent back data
UserSchema.methods.toJSON = function () {
    var user = this;
    // taking mongoose variable to regular object
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
};

// By using schema allow us to add instance methods
// instance methods do have access to individual document
// which is great because we need that information to create JWT
UserSchema.methods.generateAuthToken = function () {
    var user = this;

    // need access and token values to create new token into document
    var access = 'auth';

    var data = {
        _id: user._id.toHexString(), 
        access 
    }
    // second params is secret words
    var token = jwt.sign(data, 'helloworld').toString();
    
    user.tokens = user.tokens.concat([{
        access,
        token
    }]);

    return user.save().then(() => {
        return token;
    })
}

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
       decoded = jwt.verify(token, 'helloworld');
    } catch (error) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // })
        // bottom this one is short cut same as above
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

var User = mongoose.model('User', UserSchema);


module.exports = { User }


