var express = require('express');
var router = express.Router();

var Token = require('./models/token').Token;
var User = require('./models/user').User;
var Post = require('./models/post').Post;

router.post('/api/users/register', function(req, res){
  // console.log(req.body); //this is the body we get from the request (made from Postman)
  var newUser = new User(
    {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password
    }
  )
  newUser.save(function(err) {
    if (err) {
      res.status(500).json(err); //you can't throw because throw crashes the server
    } else {
      res.send({
        message:"succesful",
        user:newUser
      });
    }
  })

})

router.post('/api/users/login', function(req, res){
  console.log(req.body)

  User.findOne({email: req.body.email}, function(err,user){
    if(err){
      console.log("benit sucks")
    } else {
      var d = new Date();
      var newToken = new Token({
        userId: user._id,
        token: user._id + d.toString(),
        createdAt: new Date()
      });

      newToken.save(function(err) {
        if (err) {
          res.status(500).json(err); //you can't throw because throw crashes the server
        } else {
          res.send({
            message:"succesful",
            token: newToken
          });
        }
      })


    }

  })
})

router.post('/api/users/logout', function(req, res){
  console.log("lisa")

  console.log(req.body)
  Token.findOne({token: req.body.token}, function(err, user){
    if (err){
      console.log(err)
    } else {
      Token.remove({token: req.body.token}, function(err){
        if (err){
          console.log(err)
        } else {
          res.send({
            success:true
          })
        }
      })
    }
  })
  User.findOne({email: req.body.email}, function(err,user){
    if (err){
      console.log("error", err)
    } else {
      console.log("lisa")
      console.log(req.body)
    }
  })
});

router.get('/api/posts/', function(req, res){
  User.findOne({token: req.body.token}, function(err, user){
    if (err){
      console.log("error", err)
    } else {
      var currentPerson = {
        name: User.fname + User.lname
      }
    }
  })
}


module.exports = router;
