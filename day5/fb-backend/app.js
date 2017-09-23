"use strict";
//REQUIREMENTS
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var saltRounds = 10;
var models = require('./models');
var Token = models.Token;
var User = models.User;
var Post = models.Post;

var app = express();

//STATUS LOGS
if (!fs.existsSync('./env.sh')) {
  throw new Error('env.sh file is missing');
}
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});

//MONGOOSE CONNECT
mongoose.connect(process.env.MONGODB_URI);
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

//BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//VALIDATOR
app.use(validator());


app.post("/api/users/register", function(req, res) {
  var userExist = false;
  bcrypt.hash(req.body.password, saltRounds, function(bcryptERR, hash) {
    var newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hash
    });
    User.find({
      email: req.body.email
    }, function(err, array) {
      if (err) {
        console.log(findERR);
      } else {
        if (array.length > 0) {
          userExist = true
        }
      }
    })
    if (!userExist) {
      newUser.save(function(saveERR) {
        if (saveERR) {
          console.log(saveERR);
        } else {
          console.log("Saved User");
          res.send({
            success: true
          })
        }
      })
    } else {
      res.send({
        success: false
      })
    }
  })
})

app.post("/api/users/login", function(req, res) {
  var currUser = {
    email: req.body.email,
    password: req.body.password
  };
  User.findOne({
    email: currUser["email"]
  }, function(findERR, user) {
    if (findERR) {
      console.log(findERR);
      res.send({
        success: false
      });
    } else {
      var newToken = new Token({
        userid: user._id,
        token: user.email + Date.parse(new Date()),
        createdAt: new Date().toString()
      })
      bcrypt.compare(req.body.password, user.password, function(err, correct) {
        if (correct) {
          newToken.save();
          res.send({
            success: true,
            response: {
              id: user._id,
              token: newToken.token
            }
          })
        } else {
          res.send({
            success: false,
            msg: "Incorrect login"
          })
        }
      })
    }
  })
})

app.get('/api/users/logout', function(req, res) {
  var searchTokenFragment = {
    token: req.query.token
  };
  Token.findOne(searchTokenFragment, function(findERR, foundTokenObj) {
    if (findERR) {
      console.log(err);
      res.send({
        success: false
      })
    } else {
      Token.remove(foundTokenObj, function(removeERR) {
        if (removeERR) {
          console.log(removeERR);
        } else {
          res.send({
            success: true
          })
        }
      })
    }
  })
})

app.get('/api/posts/:page', function(req, res) {
  var searchTokenFragment = {
    token: req.query.token
  };
  Post.find().sort({
    createdAt: 1
  }).exec(function(findERR, postArr) {
    console.log(findERR);
    var page = parseInt(req.params.page);
    postArr = postArr.slice((page - 1) * 10, page * 10);
    res.send({
      success: true,
      response: postArr
    })
  })
})

app.post('/api/posts/', function(req, res) {
  Token.findOne({
    token: req.body.token
  }, function(findTokenERR, foundTokenObj) {
    if (findTokenERR) {
      console.log('token not found', findTokenERR);
      res.send({
        success: false
      })
    } else {
      console.log("token obj is", foundTokenObj);
      User.findOne({
        _id: foundTokenObj["userid"]
      }, function(findUserERR, foundUserObj) {
        if (findUserERR) {
          console.log('user not found', findUserERR);
          res.send({
            success: false
          });
        } else {
          var newPost = new Post({
            poster: foundUserObj,
            content: req.body.content,
            createdAt: new Date()
          })
          newPost.save(function(saveERR) {
            res.send({
              success: true,
              response: newPost
            })
          })
        }
      })
    }
  })
})

app.get('/api/posts/comments/:postid', function(req, res) {
  Post.findOne({
    _id: req.params.postid
  }, function(findPostERR, post) {
    if (findPostERR) {
      console.log(findPostERR);
      res.send({
        success: false
      })
    } else {
      res.send({
        success: true,
        response: post["comments"]
      })
    }
  })
})

app.post('/api/posts/comments/:postid', function(req, res) {
  var currentUser
  Token.findOne({
    token: req.body.token
  }, function(err, tokenObj) {
    console.log("token obj is ", tokenObj);
    User.findOne({
      _id: tokenObj["userid"]
    }, function(error, userObj) {
      currentUser = userObj;
      console.log("the user is ", currentUser);
      Post.findOne({
        _id: req.params.postid
      }, function(findPostERR, post) {
        if (findPostERR) {
          console.log(findPostERR);
          res.send({
            success: false
          })
        } else {
          var newComment = {
            createdAt: new Date(),
            content: req.body.content,
            poster: {
              name: currentUser["fname"] + " " + currentUser["lname"],
              id: currentUser["_id"]
            }
          }
          post.comments.push(newComment);
          post.save(function(saveERR) {
            res.send({
              success: true,
              response: post
            })
          })
        }
      })
    })
  })
})

app.get('/api/posts/likes/:postid', function(req, res) {
  var currentUser
  Token.findOne({
    token: req.query.token
  }, function(err, tokenObj) {
    console.log("token obj is ", tokenObj);
    User.findOne({
      _id: tokenObj["userid"]
    }, function(error, userObj) {
      currentUser = userObj;
      console.log("the user is ", currentUser);
      Post.findOne({
        _id: req.params.postid
      }, function(findPostERR, post) {
        if (findPostERR) {
          console.log(findPostERR);
          res.send({
            success: false
          })
        } else {
          var likedyet = false;
          for (var i = 0; i < post.likes.length; i++) {
            if (post.likes[i].id === currentUser._id) {
              post.like[i] = false
              likedyet = true
            }
          }
          if (likedyet) {
            post.likes.filter()
          } else {
            var newLike = {
              name: currentUser["fname"] + " " + currentUser["lname"],
              id: currentUser["_id"]
            }
            post.likes.push(newLike);
          }
          post.save(function(err) {
            res.send(post);
          })
        }
      })
    })
  })
})

app.put('/api/posts/:postid', function(req, res) {
  Post.findOne({
    _id: req.params.postid
  }, function(findERR, foundPostObj) {
    Token.findOne({
      token: req.body.token
    }, function(findTokenERR, foundTokenObj) {
      if (findTokenERR) {
        console.log('token not found', findTokenERR);
        res.send({
          success: false
        })
      } else {
        User.findOne({
          _id: foundTokenObj["userid"]
        }, function(findUserERR, foundUserObj) {
          console.log("USER", foundUserObj._id);
          console.log("POST", foundPostObj.poster._id);
          console.log(foundPostObj.poster._id.toString() === foundUserObj._id.toString());
          if (foundPostObj.poster._id.toString() === foundUserObj._id.toString()) {
            foundPostObj.content = req.body.content;
            foundPostObj.save(function(err) {
              res.send(foundPostObj)
            })
          } else {
            res.send({
              success: false,
              msg: "Not original poster"
            })
          }
        })
      }
    })
  })
})

app.delete('/api/posts/:postid', function(req, res) {
  Post.findOne({
    _id: req.params.postid
  }, function(findERR, foundPostObj) {
    Token.findOne({
      token: req.body.token
    }, function(findTokenERR, foundTokenObj) {
      if (findTokenERR) {
        console.log('token not found', findTokenERR);
        res.send({
          success: false
        })
      } else {
        console.log("TOKEN", foundTokenObj);
        User.findOne({
          _id: foundTokenObj["userid"]
        }, function(findUserERR, foundUserObj) {
          if (foundPostObj.poster._id.toString() === foundUserObj._id.toString()) {
            Post.remove({
              _id: foundPostObj._id
            }, function(deleteERR) {
              res.send({
                success: true
              })
            })
          } else {
            res.send({
              success: false,
              msg: "Not original poster"
            })
          }
        })
      }
    })
  })
})

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
