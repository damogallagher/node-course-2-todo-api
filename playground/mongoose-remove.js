const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}     = require('./../server/models/user');

var id = "5ba296413b7de90b716143bd";

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({_id: id}).then((todo) => {
//     console.log(todo);
// });

Todo.findByIdAndRemove(id).then((todo) => {
    console.log(todo);
});