var router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
var { authenticate } = require('../../middleware/authenticate');
var { Todo } = require('../../models/todo');
router.post('', authenticate, async (req, res) => {
    var todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });
  
    try {
      var doc = await todo.save();
      res.send(doc);
    } catch (e) {
      res.status(400).send(e);
    }
  
  });
  
  router.get('', authenticate, async (req, res) => {
  
    try {
      const todos = await Todo.find({
        _creator: req.user._id
      });
      res.send({ todos });
    } catch (e) {
      res.status(400).send(e);
    }
  
  });
  
  router.get('/:id', authenticate, async (req, res) => {
    var id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    try {
      const todo = await Todo.findOne({
        _id: id,
        _creator: req.user._id
      });
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({ todo });
    } catch (e) {
      res.status(400).send();
    }
  
  });
  
  router.delete('/:id', authenticate, async (req, res) => {
    var id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    try {
      const todo = await Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
      });
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    } catch (e) {
      res.status(400).send();
    }
  });
  
  router.patch('/:id', authenticate, async (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    try {
      const todo = await Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
      }, { $set: body }, { new: true });
  
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({ todo });
    } catch (e) {
      res.status(400).send();
    }
  
  });


module.exports = router; 