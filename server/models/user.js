var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
    var token = jwt.sign(data, process.env.JWT_SECRET).toString();
    
    user.tokens = user.tokens.concat([{
        access,
        token
    }]);

    return user.save().then(() => {
        return token;
    })
}

UserSchema.methods.removeToken = function (token) {
    var user = this;

    // mongod db operator pull
    // $pull let you remove items from an array that 
    // match certain criteria
    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    })

}

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
       decoded = jwt.verify(token, process.env.JWT_SECRET);
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

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
           // bcrypt compare to compare password and user password
           bcrypt.compare(password, user.password, (err, res) => {
               if (res) {
                   resolve(user);
               } else {
                   reject()
               }
           })
        })


    })
};

UserSchema.pre('save', function (next) {
    var user = this;
    
    if (user.isModified('password')) {
        var password = user.password;
        // take two arguments
        // second is a callback
        // first one is the number of round that u want use gen
        bcrypt.genSalt(10, (err, salt) => {
            // here got three arguments
            // third argument hash is the one saved in database
            bcrypt.hash(password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

var User = mongoose.model('User', UserSchema);


module.exports = { User }


