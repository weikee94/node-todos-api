// Mongo client let you connect mongo server and issues command to manipulate database

const MongoClient = require('mongodb').MongoClient;


// take two arguments
// first is the live database url, second callback function will trigger after whether 
// our connection succeed or fail and handles based on response
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log("Unable to connect to mongo db server")
    } 
    console.log("Connected to MongoDB server");
    const db = client.db('TodoApp');

    // take only one arguments (string name of collections)
    // 
    // db.collection('Todos').insertOne({
    //     text: 'Something To Do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("Unable to insert todo", err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    // Insert new doc into Users (name, age, location)
    db.collection('Users').insertOne({
        name: 'Wei Kee',
        age: 24,
        location: 'Singapore'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert users', err);
        }

        // prettier the output (last two arguments)
        console.log(JSON.stringify(result.ops, undefined, 2));
    })


    client.close();
});