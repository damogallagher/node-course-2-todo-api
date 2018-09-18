const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');
    
    // db.collection("Todos").deleteMany({text: "Eat Lunch"}).then((result) => {
    //     console.log(result);
    // });

    // db.collection("Todos").deleteOne({text: "Eat Lunch"}).then((result) => {
    //         console.log(result);
    // });

    db.collection("Todos").findOneAndDelete({_id: new ObjectID("5ba10206ba5591acd7bfecb3")}).then((result) => {
        console.log(result);
    });
    client.close();
});