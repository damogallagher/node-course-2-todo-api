const { ObjectID } = require('mongodb');
const  jwt         = require('jsonwebtoken');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const user1Id = new ObjectID();
const user2Id = new ObjectID();

const users = [{
    _id: user1Id,
    email: 'test1@test.com',
    password: 'user1Pass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id:user1Id, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: user2Id,
    email: 'test2@test.com',
    password: 'user2Pass'
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = { todos, populateTodos };