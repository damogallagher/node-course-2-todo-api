var router = require('express').Router();

//See this article for a description as to why the routes are split out
//http://catlau.co/how-to-modularize-routes-with-the-express-router/

router.use('/todos', require('./todos'));
router.use('/users', require('./users'));

module.exports = router; 