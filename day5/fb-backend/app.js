"use strict";

// Express setup
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var http = require('http');
var bcrypt = require('bcrypt');
const saltRounds = 10; //for hashing passwords

//Initialize Express
var app = express();

// mongoose configuration
var mongoose = require('mongoose');

if (! fs.existsSync('./env.sh')) {
  throw new Error('env.sh file is missing');
}
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);

app.use(logger('dev'));

// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//make some mongoose models
var Token = mongoose.model('Token', {
  userId: String,
  token: String,
  createdAt: Date
});

var User = mongoose.model('User', {
  fname: String,
  lname: String,
  email: String,
  password: String
});

var Post = mongoose.model('Post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
});

// Register user for account
app.post('/api/users/register', function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hash
    }).save(function(err) {
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({success: true});
      }
    });
  });
});

// Log the user in
app.post('/api/users/login', function(req, res) {
  User.findOne({//try to see if user exists in the database
    email: req.body.email
  }, function(err, user) {
    if (err || user === null) {
      res.status(400).json({success: false});
    } else {
      bcrypt.compare(req.body.password, user.password, function(err, response) {
        if (response) {
          var token = new Token({//save a token for the login session
            userId: user._id,
            token: req.body.email + (new Date()).getTime(),
            createdAt: new Date()
          });
          token.save(function(err) {
            if(err) {
              res.status(400).json(err);
            } else {
              res.status(200).json({
                success: true,
                response: {
                  id: token.userId,
                  token: token.token
                }
              });
            }
          });
        } else {
          res.status(400).json({success: false});
        }
      });
    }
  });
});

// Log out the current user
app.get('/api/users/logout', function(req, res) {
  console.log("Token: " + req.query.token);
  Token.findOne({
    token: req.query.token,
  }, function(err, token) {
    if (err) {
      res.status(400).json(err);
    } else {
      token.remove();
      res.status(200).json({success: true});
    }
  });
});

// Get the most recent 10 posts
app.get('/api/posts' , function(req, res) {
  var token = req.query.token;
  var tenPosts = [];
  Post.find(function(err, posts) {
    if (err) {
      res.status(400).json(err);
    } else {
      posts.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      for (var i = 0; i < 10; i++) {
        if (!posts[posts.length - 1 - i]) {
          break;
        }
        tenPosts.push(posts[posts.length - 1 - i]);
      }
      res.status(200).json({
        success: true,
        response: tenPosts
      });
    }
  });
});

// Get the most recent posts specified by query
// nothing --> 0, 1 --> 0, 2 --> 10
app.get('/api/posts/:page', function(req, res) {
  var token = req.query.token;
  var tenPosts = [];
  var num = req.params.page;
  Post.find(function(err, posts) {
    if (err) {
      res.status(400).json(err);
    } else {
      if (posts.length < (num - 1)* 10) {
        res.json([]);
      } else {
        posts.sort(function(a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        for (var i = (num - 1)*10; i < (num - 1)*10 + 10; i++) {
          if (!posts[posts.length - 1 - i]) {
            break;
          }
          tenPosts.push(posts[posts.length - 1 - i]);
        }
        res.status(200).json({
          success: true,
          response: tenPosts
        });
      }
    }
  });
});

// Make a post
app.post('/api/posts', function(req, res) {
  var token = req.query.token;
  var content = req.body.content;
  var userId = "";
  var user = null;
  Token.findOne({
    token: token
  }, function(err, token) {
    if (err) {
      res.status(400).json(err);
    } else {
      userId = token.userId;
      User.findOne({
        _id: userId
      }, function(err, user) {
        if (err) {
          res.status(400).json(err);
        } else {
          var newPost = new Post({
            poster: user,
            content: content,
            likes: [],
            comments: [],
            createdAt: new Date()
          });
          newPost.save(function(err) {
            if (err) {
              res.status(400).json(err);
            } else {
              res.status(200).json({
                success: true,
                response: newPost
              });
            }
          });
        }
      });
    }
  });
});

// Make a comment on a post
app.post('/api/posts/comments/:post_id', function(req, res) {
  var token = req.query.token;
  var content = req.body.content;
  var postId = req.params.post_id;
  var userId = "";
  Token.findOne({
    token: token
  }, function(err, token) {
    if (err) {
      res.status(400).json(err);
    } else {
      userId = token.userId;
      User.findOne({
        _id: userId
      }, function(err, user) {
        if (err) {
          res.status(400).json(err);
        } else {
          Post.findOne({
            _id: postId
          }, function(err, post) {
            var newComment = {
              createdAt: new Date(),
              content: content,
              poster: user,
            };
            post.comments.push(newComment);
            res.status(200).json({
              success: true,
              response: post.comments
            });
            post.save();
          });
        }
      });
    }
  });
});

// Retrieve comments from a post
app.get('/api/posts/comments/:post_id', function(req, res) {
  var postId = req.params.post_id;
  var token = req.body.token;
  Post.findOne({
    _id: postId
  }, function(err, post) {
    if (err) {
      res.status(400).json(err);
    } else {
      var comments = post.comments;
      res.status(200).json({
        success: true,
        response: comments
      });
    }
  });
});

// Toggle if user likes current post or not
app.get('/api/posts/likes/:post_id', function(req, res) {
  var token = req.query.token;
  var postId = req.params.post_id;
  Token.findOne({
    token: token
  }, function(err, token) {
    if (err) {
      res.status(400).json(err);
    } else {
      User.findOne({
        _id: token.userId
      }, function(err, user) {
        Post.findOne({
          _id: postId
        }, function(err, post){
          if (err) {
            res.status(400).json(err);
          } else {
            var found = false;
            var foundIndex = 0;
            for (var i = 0; i < post.likes.length; i++) {
              if (post.likes[i].name === (user.fname + " " + user.lname)) {
                found = true;
                foundIndex = i;
              }
            }
            if (found) {
              post.likes.splice(foundIndex, 1);
            } else {
              post.likes.push({
                name: user.fname + " " + user.lname,
                id: user._id,
              });
            }
            post.save();
            res.json({
              success: true,
              response: post
            });
          }
        });
      });
    }
  });
});

// Edit post (only those by the owner)
app.put('/api/posts/:post_id', function(req, res) {
  var token = req.query.token;
  var postId = req.params.post_id;
  var newContent = req.body.content;
  //check if the post is by the owner, otherwise send back an error
  Token.findOne({
    token: token
  }, function(err, token) {
    if (err) {
      res.status(400).json(err);
    } else {
      var userId = token.userId;
      Post.findOne({
        _id: postId
      }, function(err, post) {
        if (err) {
          res.status(400).json(err);
        } else if (post === null || (!post['poster']['_id'].equals(userId))) {
          res.status(400).json({success: false});
        } else {
          post.content = newContent;
          post.save();
          res.status(200).json({
            success: true,
            response: post
          });
        }
      });
    }
  });
});

// Delete a post by the user
app.delete('/api/posts/:post_id', function(req, res) {
  var token = req.query.token;
  var postId = req.params.post_id;
  //check if the post is by the owner, otherwise send back an error
  Token.findOne({
    token: token
  }, function(err, token) {
    if (err) {
      res.status(400).json(err);
    } else {
      var userId = token.userId;
      Post.findOne({
        _id: postId
      }, function(err, post) {
        if (err) {
          res.status(400).json(err);
        } else if (post === null || (!post['poster']['_id'].equals(userId))) {
          res.status(400).json({success: false});
        } else {
          post.remove();
          res.status(200).json({success: true});
        }
      });
    }
  });
});

app.listen(process.env.PORT || 3000);
