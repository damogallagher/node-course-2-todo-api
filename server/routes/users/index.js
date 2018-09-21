var router = require('express').Router();
const _ = require('lodash');
var { authenticate } = require('../../middleware/authenticate');
var { User } = require('../../models/user');
// POST /users
router.post('', async (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
  
    try {
      await user.save();
      const token = await user.generateAuthToken();;
      res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
  router.get('/me', authenticate, async (req, res) => {
    res.send(req.user)
  });
  
  router.post('/login', async (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
  
    try {
      var user = await User.findByCredentials(body.email, body.password);
      var token = await user.generateAuthToken();
      res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(400).send();
    }
  });
  
  //logout
  router.delete('/me/token', authenticate, async (req, res) => {
    try {
      await req.user.removeToken(req.token);
      res.status(200).send();
    } catch (e) {
      res.status(400).send();
    }
  });


module.exports = router; 