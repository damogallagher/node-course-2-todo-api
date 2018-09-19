const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');

//var id = "5ba2873c73f1760f42e03bd6";
// var id = "5ba2873c73f1760f42e03bd66";

// if (!ObjectID.isValid(id)) {
//     console.log(`Id '${id}' is not valid`);
// }

// Todo.find({_id: id}).then((todos) => {
//     console.log('Todos:',todos);
// });

// Todo.findOne({_id: id}).then((todo) => {
//     console.log('Todo:',todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found')
//     }

//     console.log('Todo By Id:',todo);
// }).catch((e) => console.log(e));

var userId = "5ba28a5a3b7de90b716143ba";
User.find({_id: userId}).then((users) => {
    console.log('Users:',users);
});

User.findOne({_id: userId}).then((user) => {
    console.log('User:',user);
});

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Id not found')
    }

    console.log('User By Id:',user);
}).catch((e) => console.log(e));