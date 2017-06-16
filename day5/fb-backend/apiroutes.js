var express = require('express');
var router = express.Router()
var models = require('./models/models')

router.get('/', function(req,res) {
  res.json({message: 'hello'})
})
// Look in the API documentation to see how to define the newUser
router.post('/users/register', function(req, res) {
  var newUser = new User({
    // every res and req, has a head and a body
    // in the body, will be all the different fields specified
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  newUser.save(function(err, usr){
    if(err) {
      res.json({failure: "database error"})
    } else {
      res.json({success: true})
    }
  })
})

module.exports = router
