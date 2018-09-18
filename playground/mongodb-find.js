const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');
    
    // db.collection('Todos').find({
    //     _id:new ObjectID('5ba0fac5ba5591acd7bfe9f0')
    // }).toArray().then((docs) => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log("Unable to fetch todos", err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log("Unable to fetch todos count", err);
    // });

    db.collection('Users').find({name:'Peter Bloggs'}).toArray().then((docs) => {
        console.log("Users");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch users", err);
    });

    client.close();
});