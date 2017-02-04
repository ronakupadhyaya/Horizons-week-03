var fs = require('fs');
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var Token = require('./models/token')
var User = require('./models/user')
var Post = require('./models/post')

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

var config = require('./config');
if (! config.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in file config.js');
}

app.post('/api/users/register', function(req, res) {

  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });

  if (newUser.fname === '' || newUser.lname === '' || newUser.email === '' || newUser.password === '') {
    res.status(400).json("Missing information");
  } else {

    var emailExists = false

    User.find(function(err, users) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === newUser.email) {
            res.status(400).json("Email already in use")
            emailExists = true;
        };
      };
      if (emailExists === false) {
        newUser.save(function(err) {
          if (err) {
            res.status(400)
          } else {
            res.status(200).json({
              "success": true,
              "response": newUser
            })
          };
        });
      }
    });
  };
});

app.post('/api/users/login', function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.status(400).json(err)
    };
    if (req.body.email === '' || req.body.password === '') {
      res.status(301).json("Missing information");
    } else {

      var login = false;

      for (var i = 0; i < users.length; i++) {
        if (users[i].email === req.body.email && users[i].password === req.body.password) {
            login = true;
        };
      };

      if (login === false) {
        res.status(301).json("Email or password doesn't match")
      } else {
        var newUserToken = new Token({
            userId: req.body.email,
            token: req.body.email + new Date(),
            createdAt: new Date()
          });
        newUserToken.save(function(err){
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({
              "success": true,
              "response": {
                "id": newUserToken.userId,
                "token": newUserToken.token
              }
            });
          };
        });
      }
    }
  });
});

app.get('/api/users/login', function(req, res) {
  res.status(401).json({
    "error": "Login failed."
  });
});

app.get('/api/users/error', function(req, res) {
  res.status(401).json({
    "error": "Action not allowed. Please authenticate."
  });
});

app.get('/api/posts', function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      res.status(400).json(err)
    };
    posts.sort(function(a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt)
    });
    var postSlice = posts.slice(0, 9)
    res.status(200).json({
      "success": true,
      "response": postSlice
    })
  });
});

app.get('/api/posts/:numberOfPosts', function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      res.status(400).json(err)
    };
    posts.sort(function(a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt)
    });
    var postSlice;
    var postSlicer = function(n) {
      if (posts.length > (n*10 - 10)) {
        return postSlice = posts.slice(0, (n*10 - 1));
      } else  {
        return postSlice = [];
      }
    };
    postSlicer(req.params.numberOfPosts);
    res.status(200).json({
      "success": true,
      "response": postSlice
    })
  });
});

app.post('/api/posts', function(req, res) {
  Token.findOne({'token': req.body.token}, function(err, token){
    if (err) {
      res.status(400).json(err)
    };
    if (token === null) {
      res.status(400).json("Token not found")
    } else if (req.body.content === '') {
      res.status(400).json({'error': "No post content."});
    } else {
      User.findOne({'email': token.userId}, function(err, user){
        var newPost = new Post({
          poster: {
            name: user.fname + ' ' + user.lname,
            id: user.id
          },
          content: req.body.content,
          likes: [],
          comments: [],
          createdAt: new Date()
        });
        newPost.save(function(err) {
          if (err) {
            res.status(400).json('Failure on posting')
          } else {
            res.status(200).json({
              'success': true,
              'response': newPost
            })
          }
        })
      })
    }
  });
});

app.post('/api/posts/comments/:id', function (req, res) {
  Token.findOne({'token': req.body.token}, function(err, token) {
    if (err) {
      res.status(400).json(err)
    }
    if (token === null) {
      res.status(400).json("token not found")
    } else if (req.body.content === '') {
      res.status(400).json({"error": "Comment field empty"})
    } else {
      Post.findOne({'id': req.params.id}, function(err, post) {
        console.log(post)
        if (err) {
          res.status(400).json(err)
        }
        if (post === null) {
          res.status(400).json("post not found");
        } else {
          User.findOne({'email': token.userId}, function(err, user) {
            var newComment = {
              "createdAt": new Date(),
              "content": req.body.content,
              "poster": {
                "name": user.fname + ' ' + user.lname,
                "id": user.id
              }
            };
            var newCommentArray = post.comments
            newCommentArray.push(newComment)
            Post.findOneAndUpdate({'id': req.params.id}, {"comments": newCommentArray}, function(err, postUpdate) {
              if (err) {
                res.status(400).json("Couldn't post comment")
              } else {
                res.status(200).json({
                  "success": true,
                  "response": postUpdate
                })
              }
            });
          });
        }
      });
    }
  });
});


console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
