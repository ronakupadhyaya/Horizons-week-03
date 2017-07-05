"use strict";

var express = require('express');
var router = express.Router() // What does this do?

var Token = require('./models').Token;
var User = require('./models').User;
var Post = require('./models').Post;

router.post('/api/users/register', function(req, res) {
  console.log('in register route')
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var password = req.body.password;
  User.find({email: email}, function(err, user) {
    if (err) {
      res.json({error: err.message})
    }
    else if (!user.email) {
      new User({
        fname: fname,
        lname: lname,
        email: email,
        password: password
      }).save(function(err) {
        if (err) {
          console.log("Could not save new user", err)
          res.json({error: err.message})
        } else {
          console.log("User has been saved to DB")
          res.json({
            success: true
          })
        }
      })
    }
    else {
      res.json({
        error: "Email is already registered"
      })
    }
  })


})

router.post('/api/users/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log('input email: ' + email)
  User.findOne({
    email: email,
  }, function(err, user) {
    console.log('user: ' + user)
    console.log('truth: ' + !!user)
    if (err) {
      res.json({error: err.message})
    }
    else if (user) {
      if (user.password === password) {
        var currentDate = Date.now()
        var newToken = String(currentDate) + user._id
        new Token({
          userId: user._id,
          token: newToken,
          createdAt: Date(currentDate)
        }).save(function(err) {
          if (err) {
            res.json({error: err.message})
          } else {
            res.json({
              success: true,
              response: {
                userid: user._id,
                token: newToken
              }
            })
          }
        })
      }
      else {
        res.json({error: "Incorrect password"})
      }
    } else {
      res.json({error: "We could not find an account matching that email address"})
    }
  })
})

router.get('/api/users/logout/:token', function(req, res) {
  var userToken = req.params.token;
  Token.remove({token: userToken}, function(err, token) {
    if (err) {
      res.json({error: err.message});
    } else if (JSON.parse(token).n) {
      res.json({success: true})
      console.log('Successful logout')
    } else {
      res.json({error: "Unable to logout"})
    }
  })
})


router.get('/api/posts', function(req, res) {
  Post.find().limit(10).sort({createdAt: 1}).exec(function(err, posts) {
    if (err) {
      res.json({error: err.message})
    } else if (posts.length) {
      res.json({success: true, response: posts})
    } else {
      res.json({})
    }
  })
})

router.get('/api/posts/:page', function(req, res) {
  var page = parseInt(req.params.page);
  var pageMin = (page - 1) * 10;
  var pageMax = pageMin + 10;

  Post.find().sort({createdAt: 1}).exec(function(err, posts) {
    if (err) {
      res.json({error: err.message})
    } else if (posts.length) {
      var pagePosts = posts.slice(pageMin, pageMax)
      res.json({success: true, response: pagePosts})
    } else {
      res.json({})
    }
  })
})

router.post('/api/posts', function(req, res) {
  var token = req.body.token;
  var content = req.body.content;
  console.log("enter tokens: ")
  Token.findOne({token: token}, function(err, tokenUser) {
    if (err) {
      res.json({error: err.message})
    } else if (tokenUser) {
      console.log('tokenUser: ' + tokenUser)
      var userId = tokenUser.userId;
      console.log("enter user: ")
      User.findById(userId, function(err, user) {
        console.log("userId: " + userId);
        console.log('user: ' + user)
        if (err) {
          res.json({error: err.message})
        } else if (user) {
          console.log("found user: ")
          var name = [user.fname, user.lname].join(' ');
          new Post({
            poster: {
              id: userId,
              name: name
            },
            content: content,
            createdAt: new Date(),
            comments: [],
            likes: []
          }).save(function(err, post) {
            console.log(post)
            if (err) {
              res.json({error: err.message})
            } else {
              res.json({
                success: true,
                response: post
              })
            }
          })
        } else {
          res.json({error: "Token doesn't correspond to user"})
        }
      })
    } else {
      res.json({error: "Cannot decode token"})
    }
  })
})

router.get('/api/posts/comments/:post_id', function(req, res) {
  var postId = req.params.post_id;
  var token = req.body.token;
  Post.findById(postId, function(err, post) {
    if (err) {
      res.json({error: err.message})
    } else if (post) {
      res.json({
        success: true,
        response: post.comments
      })
    } else {
      res.json({error: "Invalid post ID"})
    }
  })
})

router.post('/api/posts/comments/:post_id', function(req, res) {
  var postId = req.params.post_id;
  var token = req.body.token;
  var content = req.body.content;
  Token.findOne({token: token}, function(err, tokenUser) {
    if (err) {
      console.log('weird ass error')
      res.json({error: err.message})
    } else if (tokenUser) {
      console.log('token is valid')
      var userId = tokenUser.userId;
      console.log(tokenUser)
      User.findById(userId, function(err, user) {
        if (err) {
          res.json({error: err.message})
        } else if (user) {
          console.log('user exits')
          var userName = [user.fname, user.lname].join(' ');
          Post.findById(postId, function(err, post) {
            if (err) {
              res.json({error: "Invalid Post ID"})
            } else if (post) {
              console.log('about to comment')
              var newComment = {
                createdAt: Date.now(),
                content: content,
                poster: {
                  name: userName,
                  id: userId
                }
              }
              var newCommentsArr = post.comments.concat([newComment])
              post.comments = newCommentsArr;
              post.save(function(err, post) {
                if (err) {
                  res.send({error: err.message});
                } else {
                  res.send({success: true,
                            response: post})
                  console.log("Comment was posted")
                }
              })
            } else {
              res.json({error: "No post to comment on"})
            }
          })
        }  else {
          console.log(user)
          res.json({error: "Failed to find user"})
        }
      })
    } else {
      console.log('tokenUser: ' + tokenUser)
      console.log('token: ' + token)
      res.json({error: "Cannot decode token."})
    }
  })
})

router.get('/api/posts/likes/:post_id', function(req, res) {
  var postId = req.params.post_id;
  var token = req.body.token;
  Post.findById(postId, function(err, post) {
    if (err) {
      res.json({error: err.message})
    } else if (post) {
      res.json({
        success: true,
        response: post
      })
    } else {

      res.json({error: "Invalid post ID"})
    }
  })
})


module.exports = router;
