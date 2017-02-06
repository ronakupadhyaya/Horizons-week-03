"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Post = require('./Models/Post').Post1;
var Token = require('./Models/Token').Token1;
var User = require('./Models/User');

// Example endpoint
router.post('/api/users/register', function(req, res) {
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({
        message: "Success: created a Project object in MongoDb",
        user: newUser
      });

    }
  });
});

router.post('/api/users/login', function(req, res) {
  console.log(req.body.email);
  User.find(req.body.email, function (err, found) {
    if(err) {
      res.status(301).json({error: "Login failed"})
      res.redirect('/login');
    }
    else {
      var newToken = new Token({
        userId: req.body._id,
        token: req.body.email + new Date(),
        createdAt: new Date()
      })
      newToken.save(function(err) {
        if (err) {
          res.status(500).json(err);
        }
        else {
          res.json({
            message: "Success: created a Project object in MongoDb",
            token: newToken
          })
          res.json({
            sucess: true,
            token: newToken
          })
        }
      })
    }
  })
});

router.get('/api/user/login', function(req, res) {
  res.status(401).json(error: "Login Failed")
})


router.get('/api/posts', function(req, res) {
  Post.find().sort("-createdAt").splice(0,9).save(function(err) {
    //Just do the classic saving. 
  })
})


router.post('/api/posts', function(req, res) {

  Token.findOne({token: req.body.token}, function(err, tokenObject) {
    if(err) {
      res.json({error: "Couldn't find token"});
    } else {
      User.findOne({_id: tokenObject.userId}, function(err, userObject) {
        if(err) {
          res.json({error: "Couldn't find user"});
        } else {
          var newPost = new Post({
            poster: {
              name: userObject.fname + " " + userObject.lname,
              id: tokenObject.userId
            },
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: new Date()

          })
          newPost.save(function(err) {
            if (err) {
              res.status(500).json(err);
            } else {
              res.json({
                success: true,
                response: newPost
              });
            }
          });
        }
      })
    }
  })





})



router.get('/api/user/error', function(req, res) {
  res.status(401).json(error: "Action not allowed please authenticate")
})

module.exports = router;
