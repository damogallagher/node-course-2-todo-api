const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const testTodos = [
    {
        _id: new ObjectID(),
        text: 'text1'
    },
    {
        _id: new ObjectID(),
        text: "text2"
    },
    {
        _id: new ObjectID(),
        text: "text3"
    }
]

beforeEach((done) => {
    //Wipe all todos from database
    Todo.remove({}).then(() => {
        return Todo.insertMany(testTodos);
    }).then(() => done());

});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(testTodos.length);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(testTodos.length);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => { 
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${testTodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(testTodos[0].text);
            })
            .end(done);
    }); 

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if id not valid', (done) => {
        request(app)
        .get(`/todos/1234`)
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos:id', () => {
    it('should remove a todo', (done) => {
        var hexId = testTodos[0]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.findById(hexId).then((todo) => {
                expect(todo).toBeFalsy();
                done();
            }).catch((e) => done(e));
        });
    });
 
    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    
    it('should return 404 if object id is invalid', (done) => {
        request(app)
        .delete(`/todos/1234`)
        .expect(404)
        .end(done);
    });    
});