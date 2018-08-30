const { SHA256 } = require('crypto-js');

// hash msg (demonstrate crypto)
// var msg = 'Hello World';
// var hash = SHA256(msg).toString();
// console.log(hash);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString(),
// };

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash == token.hash) {
//     console.log("Result same");
// } else {
//     console.log("Data was changed.");
// }

const jwt = require('jsonwebtoken');

// There are two methods 
// jwt.sign (creates the hash and return token value)
// jwt.verify (opposite way of jwt.sign)

var data = {
    id: 100,
};

// second arguments is the secret 
// send back to user either signup or login
var token = jwt.sign(data, 'helloworld'); 

var decoded = jwt.verify(token, 'helloworld');

console.log(decoded);