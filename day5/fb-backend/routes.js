var express = require('express');
var router = express.Router();
var User = require('./models').User;
var Token = require('./models').Token;
var Post = require('./models').Post;
var bcrypt = require('bcrypt');

const saltRounds = 10;

router.post('/api/users/register', function(req, res) {
  req.check('fname').notEmpty();
  req.check('lname').notEmpty();
  req.check('email').notEmpty();
  req.check('password').notEmpty();

  if (req.validationErrors()) { res.status(400).send("400 Error") };

  User.findOne({email: req.body.email}, function(err1, foundUser) {
    if (foundUser) {
      res.status(400).json(foundUser);
    } else if (err1) {
      res.send("err:", err1);
    } else {
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            var user = new User(
              {fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: hash
              });
            user.save(function(err2) {
              if (err2) {
                res.send(err2);
              } else {
                res.json({"success":true, user:user});
                console.log(user);
              }
            });
          });
        });
    }
  });
});

router.post('/api/users/login', function(req, res) {
  req.check('email').notEmpty();
  req.check('password').notEmpty();
  if (req.validationErrors()) { res.status(400).send("400 Error") };

  User.findOne({email: req.body.email}, function(err, foundUser) {
    if (err) {res.send(err);}
    else {
      bcrypt.compare(req.body.password, foundUser.password, function(bcryptErr, bcryptRes) {
        console.log(foundUser.password, req.body.password, bcryptRes)
        if (!bcryptRes) { res.status(401).send("401: Login failed."); return; }
        else {
          var token = foundUser.email + new Date();
          var tokenModel = new Token({
            userId: foundUser._id,
            token: token,
            createdAt: new Date()
          });
          tokenModel.save(function(err2) {
            if (err2) {res.send(err2);}
            else {
              res.json(
                {
                  "success": true,
                  "response":
                  {
                    "id": foundUser._id,
                    "token": tokenModel.token
                  }
                }
              );
            }
          });
        }
      });
    }
  });
});

router.get('/api/users/logout', function(req, res) {
  Token.remove({token: req.query.token}, function(err) {
    if (err) {res.send(err);}
    else {
      res.json({"success": true});
    }
  });
});

router.get('/api/posts/', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, foundToken) {
    if (err) {res.send(err); }
    else {
      Post.find().sort({createdAt:-1}).limit(10).exec(function(err1, resp) {
        if (err1) {res.send(err1);}
        else {res.json({"success": true,"response": resp});}
      });
    }
  });
});

router.get('/api/posts/:page', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, foundToken) {
    if (err) {res.send(err); }
    else {
      Post.find().sort({createdAt:-1}).limit(10).exec(function(err1, resp) {
        if (err1) {res.send(err1);}
        else {
          if (!req.params.page) {console.log("no page parameter specified");}
          else {req.check('page').isInt({min: 1});}
          if (req.validationErrors()) {res.status(400).send("Error 400");}
          else {resp = resp.slice(10*parseInt(req.params.page)-10, 10*parseInt(req.params.page));}
          res.json({"success": true,"response": resp});
        }
      });
    }
  });
});

router.post('/api/posts', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, foundToken) {
    if (err) {res.send(err); }
    else {
      if (req.validationErrors()) {
        req.check('content').notEmpty();
        res.send(err);
      }
      else {
        User.findById(foundToken.userId, function(err1, foundUser) {
          if (err1) {res.send(err1);}
          else {
            var post = new Post({
              poster: foundUser,
              content: req.body.content,
              likes: [],
              comments: [],
              createdAt: new Date()
            });
            post.save(function(err2) {
              if (err2) {res.send(err2);}
              else {res.redirect('/');}
            });
          }
        });
      }
    }
  });
});

router.post('/api/posts/comments/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, foundToken) {
    if (err) {
      res.send(err);
    }
    else {
      req.check('post_id').notEmpty();
      req.check('content').notEmpty();
      if (req.validationErrors()) {
        res.send(err);
      }
      else {
        Post.findById(req.params.post_id, function(errFindPost, foundPost) {
          if (errFindPost) {res.send(errFindPost);}
          else {
            User.findById(foundToken._id, function(errFindUser, foundUser) {
              if (errFindUser) {res.send(errFindUser);}
              else {
                var comment =
                {
                  createdAt: new Date(),
                  content: req.body.content,
                  poster: foundUser
                }
                foundPost.comments.push(comment);
                foundPost.save(function(errSaveComment) {
                  if (errSaveComment) {res.send(errSaveComment);}
                  else {res.redirect('/')}
                });
              }
            });
          }
        });
      }
    }
  });
});

router.get('/api/posts/comments/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, foundToken) {
    if (err) {
      res.send(err);
    }
    else {
      req.check('post_id').notEmpty();
      if (req.validationErrors()) {
        res.send(err);
      }
      else {
        Post.findById(req.params.post_id, function(errFindPost, foundPost) {
          if (errFindPost) {res.send(errFindPost);}
          else {
            res.json({success: true, response: foundPost.comments})
          }
        });
      }
    }
  });
});

router.get('/api/posts/likes/:post_id', function(req, res) {
  var postId = req.params.post_id;

  req.check('post_id').notEmpty();

  if (req.validationErrors()) {
    console.log("\n\nValidation Errors: ", req.validationErrors());
    res.status(400).send("Error 400: Bad Request");
    return
  }
  Token.findOne({token: req.query.token}, function(error, foundToken) {
    if (error) {
      console.log("\n\nEncountered an error finding token: \n", error);
      res.send(error);
    }
    else {
      Post.findById(postId, function(errorId, foundPost) {
        if (errorId) {
          console.log("\n\nEncountered an error finding post: \n", errorId);
          res.send(errorId);
        }
        else {
          User.findById(foundToken.userId, function(errorUser, foundUser) {
            if (errorUser) {
              console.log("\n\nEncountered an error finding user: \n", errorUser);
              res.send(errorUser);
            }
            else {
              // var newLikes = foundPost.likes.filter(function(item, index) {
              //   return item.id !== foundToken.userId
              // })
              var newLikes = [];
              foundPost.likes.forEach(function(item, index) {
                if (item.id !== foundToken.userId) newLikes.push(item)
              })
              if (newLikes.length === foundPost.likes.length) newLikes.push({
                id: foundToken.userId,
                name: foundUser.fname + ' ' + foundUser.lname,
              })
              foundPost.likes = newLikes;
              foundPost.save(function(errorSave) {
                if (errorSave) {
                  console.log("\n\nEncountered an error finding user: \n", errorSave);
                  res.send(errorSave);
                }
                else {
                  console.log('success');
                  res.json({
                    success: true,
                    response: foundPost,
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})

router.put('/api/posts/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, foundToken) {
    if (err) {
      res.send(err);
    }
    else {
      req.check('post_id').notEmpty();
      req.check('content').notEmpty();
      if (req.validationErrors()) {
        res.send(err);
      }
      else {
        Post.findById(req.params.post_id, function(errFindPost, foundPost) {
          if (errFindPost) {res.send(errFindPost);}
          else {
            User.findById(foundToken._id, function(errFindUser, foundUser) {
              if (errFindUser) {res.send(errFindUser);}
              else {
                foundPost.content = req.body.content;
                foundPost.save(function(errSaveComment) {
                  if (errSaveComment) {res.send(errSaveComment);}
                  else {res.json({success: true, response: foundPost});}
                });
              }
            });
          }
        });
      }
    }
  });
});

router.delete('/api/posts/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, foundToken) {
    if (err) {
      res.send(err);
    }
    else {
      req.check('post_id').notEmpty();
      if (req.validationErrors()) {
        res.send(err);
      }
      else {
        Post.remove({_id: req.params.post_id}, function(errDeletePost, deletePost) {
          if (errDeletePost) {res.send(errDeletePost);}
          else {
            res.json({success: true});
          }
        });
      }
    }
  });
});


module.exports = router;
