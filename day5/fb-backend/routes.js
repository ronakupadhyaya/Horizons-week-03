var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var validator = require('express-validator');

var Token = require('./models').Token;
var User = require('./models').User;
var Post = require('./models').Post;

router.post('/api/users/register', function(req, res) {
  req.checkBody('fname', 'Error, no first name').notEmpty();
  req.checkBody('lname', 'Error, no last name').notEmpty();
  req.checkBody('email', 'Error, no email').notEmpty();
  req.checkBody('password', 'Error, no password').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    res.send('All working!')
  }
})

router.post('/api/users/login', function(req, res) {

})

router.get('/api/users/logout', function(req, res) {

})

module.exports = router;