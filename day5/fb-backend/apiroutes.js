var express = require('express')
var router = express.Router()
var models = require('./models/models')

router.get('/', function(req, res){
  res.send({message: 'hello'})
})

//all based on the api documentation
router.post('/users/register', function(req, res){
  var newUser = new user({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  newUser.save(function(req, res){
    if(err){
      res.json({failure: "database error"})
    } else {
      res.json({success: true})
    }
  })
})
