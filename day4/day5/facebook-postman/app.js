"use strict";

// Express setup
var fs = require('fs');
var express = require('express');
// var exphbs  = require('express-handlebars');
// var path = require('path');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var validator = require('express-validator');
// Initialize Express
var app = express();
app.use(validator());

// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Validation rules
function validateRegistration(req) {
  req.checkBody({
    'fname': {
      notEmpty: true,
      errorMessage: "Please enter your first name"
    },
    'lname': {
      notEmpty: true,
      errorMessage: "Please enter your last name"
    },
    'email': {
      notEmpty: true,
      errorMessage: "Please enter your email address"
    },
    'password': {
      notEmpty: true,
      errorMessage: "Please enter a password"
    }
  })
}

//Mongoose models
var User = require('./models').User;
var Token = require('./models').Token;
var Post = require('./models').Post;



// mongoose configuration
var mongoose = require('mongoose');

if (! fs.existsSync('./config.js')) {
  throw new Error('config.js file is missing');
}
var config = require('./config');
if (! config.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in file config.js');
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in config.js');
  process.exit(1);
});
mongoose.connect(config.MONGODB_URI);

//Endpoints

//REGISTER POST ROUTE
app.post('/api/users/register', function(req, res) {

  validateRegistration(req);
  var newUser = new User(req.body);
  newUser.save(function(err) {
    if (err) {
      console.log(err.message);
      res.status(400).send({
        error: "Incomplete register definition"
      })
    } else {
      console.log('New user created');
      res.send(newUser);
    }
  })
})

app.post('/api/users/login', function(req, res) {

  var uniqueToken = req.body.email + new Date();
  var newToken = new Token({
    userId: req.body.email,
    token: uniqueToken,
    createdAt: new Date()
  });
  newToken.save(function(err) {
    if (err) {
      console.log("Error creating token");
      console.log(err);
      return;
    } else {
      console.log("Token saved for: ", req.body.email);
    }
  });
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      console.log("No such user");
      res.status(300).send({
        error: "Login failed."
      })
    } else {
      if(user.password === req.body.password) {
        console.log("Login successful");
        res.status(200).send({
          success: true,
          response: {
            id: user._id,
            token: uniqueToken
          }
        })
      }
    }
  })
});

//LOGIN GET ROUTE
app.get('/api/users/login', function(req, res) {
  res.status(401).send({
    error: "Action not allowed. Please authenticate"
  })
});

//LOGOUT POST ROUTE
app.post('/api/users/logout', function(req, res) {
  Token.remove({token: req.body.token}, function(err) {
    if (err) {
      console.log('Error', err);
      res.status(400).send();
    }
  })
})

app.get('/', function(req, res) {
  console.log("Sup");
  res.send("Sup");
})



//GET POSTS ROUTE
app.get('/api/posts/', function(req, res) {
  Post.find({})
      .limit(10)
      .sort({'createdAt': -1})
      .exec(function(err, posts) {
        if (err) {
          console.log('error getting posts');
        } else {
          res.status(200).send({
            success: true,
            response: posts
          })
        }
      })
});

//GET SPECIFIC POST ROUTE
app.get('/api/posts/:numberOfPosts', function(req, res) {
  Post.find({})
      .sort({'createdAt': -1})
      .limit(parseInt(req.params.numberOfPosts))
      .exec(function(err, posts) {
        if (err) {
          console.log(err);
          console.log('error getting posts');
          res.status(400).send()
        } else {
          res.status(200).send({
            success: true,
            response: posts
          })
        }
      })
});

//POST POST ROUTE
app.post('/api/posts/', function(req, res) {
  Token.findOne({token: req.body.token}, function(err, token) {
    if (err) {
      console.log('Error with user');
    } else {
      User.findOne({email: token.userId}, function(err, user) {
        if (err) {
          console.log("Could not find");
        } else {
          var newPost = new Post({
            poster: {
              id: user._id,
              name: user.fname
            },
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: new Date()
          });
          newPost.save(function(err) {
            if (err) {
              console.log(err);
              res.status(400).send({
                error: "No post content."
              });
            } else {
              res.status(200).send({
                success: true,
                response: newPost
              })
            }
          })
        }
      })

    }
  })
  console.log(req.body);

});

//GET COMMENTS ON POST ROUTE
app.get('/api/posts/comments/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      console.log('Error', err);
      res.status(400).send();
    } else {
      res.status(200).send({
        success: true,
        response: post
      })
    }
  })
});

//POST COMMENT ON POST ROUTE
app.post('/api/posts/comments/:id', function(req, res) {

  Post.findById(req.params.id, function(err, post) {
    console.log(post);
    if (err) {
      console.log(err);
    } else {
      Token.findOne({token: req.body.token}, function(err, token) {
        if (err) {
          console.log('Error with user');
          console.log(err);
        } else {
          console.log(token);
          //*****TOKEN IS NULL WHY WHY WHY*******
          User.findOne({email: token.userId}, function(err, user) {
            if (err) {
              console.log("Could not find");
            } else {
              var d = new Date();
              var newComment = {
                createdAt: d.getTime(),
                content: req.body.content,
                poster: {
                  name: user.fname,
                  id: user._id
                }
              }
              post.comments.push(newComment)
              post.save(function(err) {
                if (err) {
                  res.status(400).send({
                    error: "No post comment content"
                  })
                } else {

                  res.status(200).send({
                    success: true,
                    response: post
                  })
                }
              })
            }
          })
        }
      })
    }
  })
});

//GET LIKES ON POST ROUTE
app.get('/api/posts/likes/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      console.log('Error', err);
      res.status(400).send();
    } else {
      res.status(200).send({
        success: true,
        response: post
      })
    }
  });
});

app.listen(3000);
