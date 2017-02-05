"use strict";

// Routes, with inline controllers for each route.
var validate = require('express-validator');
var express = require('express');
var router = express.Router();
var Token = require('./models/token').Token;
var User = require('./models/user').User;
var Post = require('./models/post').Post;
var strftime = require('strftime');
// var bodyParser = require('body-parser');
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));



//GET '/'
router.get('/', function(req, res) {
  res.send('Welcome to Horizons-Facebook!! by Sungsu');
});

router.post('/api/users/register', function(req,res){
  // console.log(req.body);

  //TODO Check for existing email
  //TODO Validation for input fields
  var newUser = new User({fname: req.body.fname,
                      lname: req.body.lname,
                      email: req.body.email, //check existing
                      password: req.body.password,
                    });
  newUser.save(function(err, user){
    if(err){
      res.status(400).json("Incomplete register definition");
    }
    else{
      res.send({success: true, response: user});
    }
  })
});

//POST '/api/users/login'
router.post('/api/users/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({email:email}, function(err, foundUser){
    if(err){
      res.redirect('/api/users/login');
    }
    else{
      //if email found
      if(foundUser){
        //if password matches
        if(password === foundUser.password){
          var curDate = (new Date()).toString();
          var curUserId = foundUser._id;
          var curToken = foundUser.email +curDate;
          var newToken = new Token({userId: curUserId,
                                    token: curToken,
                                    createdAt: curDate
          });
          // console.log(foundUser._id);
          // console.log(foundUser.email+curDate);
          // console.log(curDate);
          newToken.save(function(err, token){
            if(err){
              res.redirect('/api/users/login');
            }
            else{
              res.send({success: true, response: {id: curUserId, token: curToken}});
            }
          })
        }
        else{
          res.redirect('/api/users/login');
        }
      }
      else {
        res.redirect('/api/users/login');
      }
    }
  })
});


//GET login
router.get('/api/users/login', function(req, res){
  res.status(401).json({error: "Login failed"});
})

router.get('/api/posts/error', function(req, res){
  res.status(401).json({error: "Action not allowed. Please authenticate."});
});

//GET posts
router.get('/api/posts', function(req, res){
  Token.find({token:req.params.token}, function(err, token){
    if(err){
      console.log("Authentication Error");
    }
    else{
      if(token){
        Post.find({}, function(err, postArr){
          res.send({success: true, response: postArr});
        })
      }
      else{
        res.redirect('/api/users/login');
      }
    }
  })
})

//POST posts
router.post('/api/posts', function(req, res){
  //gets token if found, else false

  Token.findOne({token:req.body.token}, function(err, token){
    if(err){
      res.redirect('/api/users/login');
    }
    else{
      if(token){
        User.findById(token.userId, function(err, user){
          var newPost = new Post({poster: {name: user.fname+" "+user.lname, id: token.userId},
                              content: req.body.content,
                              likes: [],
                              comments: [],
                              createdAt: new Date()
          })
          newPost.save(function(err){
            if(err)
              res.status(400).json({error: "No post content"});
            else
              res.send({success: true, response: newPost});
          })
        })
      }
      else{
        res.redirect('/api/users/login');
      }

    }
  })
})

// router.get('/api/posts/:numberOfPosts', function(req, res){
//
// })

//GET comments/:id
router.get('/api/posts/comments/:id', function(req, res){
  Token.findOne({token:req.body.token}, function(err, token){
    if(err){}
    else{
      Post.findOne({_id:req.params.id}, function(err, post){
        if(err){}
        else{
          res.send({success: true, response:post});
        }
      })
    }
  })
})

//POST comments/:id
router.post('/api/posts/comments/:id', function(req,res){
  Token.findOne({token: req.body.token}, function(err, token){
    if(err){}
    else{
      if(token){
        User.findById(token.userId, function(err, user){
          if(err){}
          else{

            Post.findById(req.params.id, function(err, post){
              if(err){}
              else{
                post.comments.push({
                                    createdAt: new Date(),
                                    content: req.body.content,
                                    poster: {name: user.fname+" "+user.lname, id: token.userId}
                                  });
                post.save(function(err){
                  if(err) {}
                  else{
                    console.log("Updated post with new comment");
                    res.send({success: true, response:post});
                  }
                })
              }
            });
          }
        })
      }
      else{
        res.redirect('/api/users/login');
      }
    }
  })
})

router.get('/api/posts/likes/:id',function(req, res){
  Token.findOne({token: req.query.token}, function(err, token){
    if(err){}
    else{
      if(token){
        User.findById(token.userId, function(err, user){
          if(err){}
          else{
            Post.findById(req.params.id, function(err, post){
              if(err){}
              else{
                if(post){
                  (post.likes).push({name: user.fname+ " " + user.lname,
                                    id: token.userId});
                  post.save(function(err){
                    if(err){}
                    else{
                      console.log("successfully liked the post");
                      res.send({success: true, response: post});
                    }
                  })
                }
                else{
                  //Bad post ID
                }
              }
            })
          }
        })
      }
      else{
        //Bad login request
        res.redirect('/api/users/login');
      }
    }
  })
});


router.post('/api/users/logout', function(req,res){
  Token.findOne({token: req.body.token}, function(err, token){
    
  })
})


module.exports = router;
