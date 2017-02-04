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
      res.status(301).json({"Error": "Missing information"});
    } else {

      var login = false;

      for (var i = 0; i < users.length; i++) {
        if (users[i].email === req.body.email && users[i].password === req.body.password) {
            login = true;
        };
      };

      if (login === false) {
        res.status(301).json({"Error": "Email or password doesn't match"})
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
    "Error": "Login failed."
  });
});

app.get('/api/users/error', function(req, res) {
  res.status(401).json({
    "Error": "Action not allowed. Please authenticate."
  });
});

app.get('/api/posts/:token', function(req, res) {
  Token.findOne({'token': req.params.token}, function(err, token){
    if (err) {
      res.status(400).json(err);
    };
    if (token === null) {
      res.status(400).json({"Error": "Token not found."});
    } else {
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
    }
  });
});

app.get('/api/posts/:numberOfPosts/:token', function(req, res) {
  Token.findOne({'token': req.params.token}, function(err, token){
    if (err) {
      res.status(400).json(err);
    };
    if (token === null) {
      res.status(400).json({"Error": "Token not found."});
    } else {
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
    }
  });
});

app.post('/api/posts', function(req, res) {
  Token.findOne({'token': req.body.token}, function(err, token){
    if (err) {
      res.status(400).json(err)
    };
    if (token === null) {
      res.status(400).json({"Error": "Token not found."})
    } else if (req.body.content === '') {
      res.status(400).json({'Error': "No post content."});
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
      res.status(400).json({"Error": "Token not found"})
    } else if (req.body.content === '') {
      res.status(400).json({"Error": "Comment field empty"})
    } else {
      Post.findOne({'_id': req.params.id}, function(err, post) {
        if (err) {
          res.status(400).json(err)
        }
        if (post === null) {
          res.status(400).json({"Error": "Post not found"});
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
            Post.findOneAndUpdate({'_id': req.params.id}, {"comments": newCommentArray}, function(err, postUpdate) {
              if (err) {
                res.status(400).json({"Error": "Couldn't post comment"})
              } else {
                Post.findOne({'_id': req.params.id}, function(err, postUpdateShow) {
                  if (err) {
                    res.status(400).json({"Error": "Couldn't find updated post"})
                  } else {
                    console.log(postUpdateShow)
                    res.status(200).json({
                      "success": true,
                      "response": postUpdateShow
                    });
                  }
                });
              }
            });
          });
        }
      });
    }
  });
});

app.get('/api/posts/likes/:id/:token', function(req, res) {
  Token.findOne({'token': req.params.token}, function(err, token) {
    if (err) {
      res.status(400).json(err);
    };
    if (token === null) {
      res.status(400).json({"Error": "Token not found."});
    } else {
      Post.findOne({'_id': req.params.id}, function(err, post) {
        if (err) {
          res.status(400).json(err);
        };
        if (post === null) {
          res.status(400).json({"Error": "Post not found."});
        } else {
          User.findOne({'email': token.userId}, function(err, user) {
            if (err) {
              res.status(400).json(err);
            };
            var likeUser = {
              "name": user.fname + ' ' + user.lname,
              "id": user.id
            }
            var newLikeArray = post.likes
            if (newLikeArray.filter(function(a){return a.id === user.id}).length === 0) {
              newLikeArray.push(likeUser)
            } else {
              var removeIndex = newLikeArray.map(function(item) { return item.id; }).indexOf(user.id);
              newLikeArray.splice(removeIndex, 1);
            }
            Post.findOneAndUpdate({'_id': req.params.id}, {'likes': newLikeArray}, function(err, postUpdate){
              if (err) {
                res.status(400).json(err);
              } else {
                Post.findOne({'_id': req.params.id}, function(err, postUpdateShow) {
                  if (err) {
                    res.status(400).json({"Error": "Couldn't find updated post"})
                  } else {
                    console.log(postUpdateShow)
                    res.status(200).json({
                      "success": true,
                      "response": postUpdateShow
                    });
                  }
                });
              }
            })
          })
        }
      });
    }
  });
});

app.post('/api/users/logout', function(req, res) {
  Token.findOne({'token': req.body.token}, function(err, token) {
    if (err) {
      res.status(400).json(err);
    };
    if (token === null) {
      res.status(400).json({"Error": "Token not found."});
    } else {
      token.remove(function(err) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json({
            "Success": true
          });
        }
      })
    }
  })
});

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
