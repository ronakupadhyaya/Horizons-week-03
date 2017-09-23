"use strict";
// Express server
var express = require('express');
var app = express();

// Mongoose MongoDB interfacer
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// bodyParser setup
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Validation setup for express-validator
var expressValidator = require('express-validator');
app.use(expressValidator());

// Get models from model.js
// models.Token models.User models.Post
// To use, var newInstance = new models.Token( {requiredKey: value...}
var models = require('./model.js');

// In general, if a post request is invalid, we'll send back an object with key
// error with value an array of strings describing each error in the request


/*----------------------------------------------------------------------------
LOOKUP_ID: facebook_basicUtil

                 Listeners for register, login and logout


----------------------------------------------------------------------------*/
app.post('/api/users/register', function(req, res) {
  if(req.body.email) {
    models.User.find( { email: req.body.email }, function(err, users) {
      if(err) {
        console.log(err);
        process.exit();
      } else { // everything must be async after looking for this
        if(users.length !== 0){ // a user with that e-mail already exists
          res.json(JSON.stringify({error: ['A user with that e-mail exists already.']}));
        } else { // e-mail is not already in user
          // Validate all other user registration fields
          // Validate req.body.fname to be nonempty and consisting of only letters
          req.checkBody('fname', 'First name must consist of letters')
            .notEmpty()
            .isAlpha();

          // Validate req.body.lname to be nonempty and consisting of only letters
          req.checkBody('lname', 'Last name must consist of letters')
            .notEmpty()
            .isAlpha();

          // Validate email is an email
          req.checkBody('email', 'The given e-mail is in an invalid format')
            .isEmail();

          req.checkBody('password', 'Password field must be nonempty')
            .notEmpty();

          if(req.validationErrors().length > 0) { //something was invalid
            res.json(JSON.stringify({error: req.validationErrors()}));
          } else { //fields are all good
            var newUser = new models.User({
              fname: req.body.fname,
              lname: req.body.lname,
              email: req.body.email,
              password: req.body.password,
            });

            newUser.save(function(err) {
              if(err) {
                console.log(err);
              } else { //
                //TODO maybe redirect here
                res.json(JSON.stringify({success: true,}));
              }
            })
          }
        }
      }
    });
  } else { // no email provided
    res.json(JSON.stringify({error: ['No e-mail provided']}));
  }
});

app.post('/api/users/login', function(req, res) {
  models.User.findOne( {email: req.body.email}, function(err, foundUser) {
    if(err) {
      res.send(err);
    } else {
      if(! foundUser) { //findOne returns null (falsy) if query returns nothing
        res.json(JSON.stringify({error: "Login failed."}));
      } else { //we found the user
        if(foundUser.password === req.body.password) {
          // tokenize
          var newTokenToken = foundUser.id + Date.now();
          var newToken = new models.Token({
            userId: foundUser.id,
            token: newTokenToken,
            createdAt: Date.now(),
          });

          newToken.save(function(err) {
            if(err) {
              res.json(JSON.stringify({error: "Failed to generate login token, try again"}));
            } else { //successfully saved login token
              res.json(JSON.stringify({
                success: true,
                response: newToken,
              }));
            }
          });

        } else { // incorrect password for e-mail
          res.json(JSON.stringify({error: "Incorrect password"}));
        }
      }
    }
  })
});

app.get('/api/users/logout/:token', function(req, res) {
  if(!req.params.token) {
    res.json(JSON.stringify({error: 'Did not supply a token for logout'}));
  } else {
    models.Token.findOne({token: req.params.token}, function(err, foundToken) {
      if(err) {
        res.json(JSON.stringify({error: 'Database error in token lookup'}));
      } else {
        if(! foundToken) { // the specified token was not found in the database
          res.json(JSON.stringify({error: 'The provided token was not found in the database, you are already logged out'}));
        } else {
          models.Token.remove( {token: req.params.token}, function(err) {
            if(err) {
              res.json(JSON.stringify({error: 'Failed to remove token due to ' + err}));
            } else {
              res.json(JSON.stringify({success: true}));
            }
          })
        }
      }
    });
  }
});

/*----------------------------------------------------------------------------
LOOKUP_ID: facebook_postUtil

             Listeners for posting, commenting, and liking


----------------------------------------------------------------------------*/
app.post('/api/posts/', function(req, res) {
  if(!req.body.token || !req.body.content) {
    res.json(JSON.stringify({error: 'Did not supply a token or content for posting'}));
  } else {
    models.Token.findOne({ token: req.body.token }, function(err, foundToken) {
      if(err) {
        res.json(JSON.stringify({error: 'Did not successfully lookup token, database error'}));
      } else {
        if(!foundToken) { //token doesn't exist
          res.status(401).json(JSON.stringify({error: 'Supplied invalid token, did you log out?'}));
        } else {
          models.User.findById(foundToken.userId, function(err, foundUser) {
            if(err) {
              res.status(500).json(JSON.stringify({error: 'Did not successfully search user database'}));
            } else {
              if(!foundUser) {
                res.json(JSON.stringify({error: 'That user has somehow been deleted, panic!'}));
              } else { //we found the user
                var postObject = {
                  poster: foundUser,
                  content: req.body.content,
                  likes: [],
                  comments: [],
                  createdAt: Date.now(),
                };
                var newPost = new models.Post(postObject);
                newPost.save(function(err) {
                  if(err) {
                    res.status(500).json(JSON.stringify({error: 'Could not save new post for some reason'}));
                  } else {
                    var successObject = {
                      success: true,
                      response: postObject,
                    };
                    res.json(JSON.stringify(successObject));
                  }
                });
              }
            }
          });
        }
      }
    });
  }
});

app.get('/api/posts/:page', function(req, res) {
  if(!req.query.token) {
    res.json(JSON.stringify({error: 'Did not supply a token for getting posts'}));
  } else {
    models.Token.findOne( {token: req.query.token}, function(err, foundToken) {
      if(err) {
        res.status(500).json(JSON.stringify({error: 'Could not lookup token, database error'}));
      } else {
        if(!foundToken) {
          res.status(401).json(JSON.stringify({error: 'Supplied an invalid token, are you logged out?'}));
        } else { //valid token
          if(isNaN(parseInt(req.params.page))) {
            res.json(JSON.stringify( {error: 'Supplied invalid parameter for page number'}));
          } else {
            var pageNumber = parseInt(req.params.page) - 1;
            models.Post.find(function(err, posts) {
              if(err) {
                res.status(500).json(JSON.stringify( {error: "Could not get posts due to server error"}));
              } else {
                res.json(JSON.stringify({
                  success: true,
                  response: posts,
                }));
              }
            }).skip(pageNumber*10).limit(10).sort({ createdAt: -1 });
          }
        }
      }
    });
  }
});

app.get('/api/posts/', function(req, res) {
  if(!req.query.token) {
    res.json(JSON.stringify({error: 'Did not supply a token for getting posts'}));
  } else {
    models.Token.findOne( {token: req.query.token}, function(err, foundToken) {
      if(err) {
        res.status(500).json(JSON.stringify({error: 'Could not lookup token, database error'}));
      } else {
        if(!foundToken) {
          res.status(401).json(JSON.stringify({error: 'Supplied an invalid token, are you logged out?'}));
        } else { //valid token
          models.Post.find(function(err, posts) {
            if(err) {
              res.status(500).json(JSON.stringify( {error: "Could not get posts due to server error"}));
            } else {
              res.json(JSON.stringify({
                success: true,
                response: posts,
              }));
            }
          }).sort({ createdAt: -1 });
        }
      }
    });
  }
});

app.get('/api/posts/comments/:post_id', function(req, res) {
  if(!req.query.token) {
    res.json(JSON.stringify({error: 'Did not supply a token for requesting a post\'s comments'}));
  } else {
    models.Token.findOne( {token: req.query.token}, function(err, foundToken) {
      if(err) {
        res.status(500).json(JSON.stringify({error: 'Could not lookup auth token, database error'}));
      } else {
        if(!foundToken) {
          res.status(401).json(JSON.stringify({error: 'Supplied invalid auth token, are you logged out?'}));
        } else {
          models.Post.findById(req.params.post_id, function(err, foundPost) {
            if(err) {
              res.status(500).json(JSON.stringify({error: 'Could not lookup that post due to database error'}));
            } else {
              console.log(foundPost);
              if(!foundPost) {
                res.status(400).json(JSON.stringify({error: 'No post exists with that id, was it deleted?'}));
              } else {
                var respObject = {
                  success: true,
                  response: foundPost.comments,
                };
                res.json(JSON.stringify(respObject));
              }
            }
          });
        }
      }
    });
  }
});

app.post('/api/posts/comments/:post_id', function(req, res) {
  if(!req.body.token || !req.body.content) {
    res.json(JSON.stringify({error: 'Either the auth token or content were not included in the POST to make a comment'}));
  } else {
    models.Token.findOne( {token: req.body.token}, function(err, foundToken) {
      if(err) {
        res.status(500).json(JSON.stringify({error: 'Could not lookup auth token due to database error'}));
      } else {
        if(!foundToken) {
          res.status(401).json(JSON.stringify({error: 'Invalid auth token was provided, did you log out?'}));
        } else {
          models.Post.findById(req.params.post_id, function(err, foundPost) {
            if(err) {
              res.status(500).json(JSON.stringify({error: 'Could not lookup that post due to server error'}));
            } else {
              if(!foundPost) {
                res.status(400).json(JSON.stringify({error: 'Could not find a post with that id'}));
              } else {
                models.User.findById(foundToken.userId, function(err, foundUser) {
                  if(err) {
                    res.status(500).json(JSON.stringify({error: 'Could not lookup user due to database error'}));
                  } else {
                    var newComment = {
                      createdAt: Date.now(),
                      content: req.body.content,
                      poster: foundUser,
                    }
                    foundPost.comments.push(newComment); //adding the comment
                    console.log(foundPost);
                    models.Post.findByIdAndUpdate(req.params.post_id, foundPost, function(err) {
                      if(err) {
                        console.log(err);
                        res.status(500).json(JSON.stringify({error: 'Could not lookup post to update due to database error'}));
                      } else {
                        res.json(JSON.stringify({
                          success: true,
                          response: foundPost,
                        }));
                      }
                    });
                  }
                });
              }
            }
          });
        }
      }
    });
  }
});

app.get('/api/posts/likes/:post_id', function(req, res) {
  models.Token.findOne({token: req.query.token}, function(err, foundToken) {
    if(err) {
      res.status(500).json(JSON.stringify({error: 'Could not lookup auth token due to database error'}));
    } else {
      if(!foundToken) {
        res.status(401).json(JSON.stringify({error: 'Invalid auth token provided, are you logged out?'}));
      } else {
        models.User.findById(foundToken.userId, function(err, foundUser) {
          if(err) {
            res.status(500).json(JSON.stringify({error: 'Failed to lookup user associated with your auth token due to database error'}));
          } else {
            models.Post.findById(req.params.post_id, function(err, foundPost) {
              if(err) {
                res.status(500).json(JSON.stringify({error: 'Post lookup failed due to database error'}));
              } else {
                var alreadyLiked = false;
                var postIndex;
                foundPost.likes.forEach(function(user, index) {
                  if(foundUser.id === user.id) {
                    alreadyLiked = true;
                    postIndex = index;
                  }
                });
                if(alreadyLiked) {
                  foundPost.likes.splice(postIndex, 1);
                } else {
                  foundPost.likes.push({id: foundUser.id, name: foundUser.fname + ' ' + foundUser.lname});
                }
                models.Post.findByIdAndUpdate(req.params.post_id, foundPost, function(err) {
                  if(err) {
                    res.json(JSON.stringify({error: 'Could not lookup post by id due to database error'}));
                  } else {
                    var respObject = {
                      success: true,
                      response: foundPost,
                    };
                    res.json(JSON.stringify(respObject));
                  }
                })
              }
            });
          }
        })
      }
    }
  });
});

app.listen(3000, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Facebook server was started on port 3000.");
  }
})
