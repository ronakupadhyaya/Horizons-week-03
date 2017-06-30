var express = require('express');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var router = express.Router();
var Token = require('./models').Token;
var User = require('./models').User;
var Post = require('./models').Post;


router.post('/api/users/register', function(req, res) {
  req.checkBody('fname', 'Error: no first name').notEmpty();
  req.checkBody('lname', 'Error: no last name').notEmpty();
  req.checkBody('email', 'Error: no email').notEmpty();
  req.checkBody('password', 'Error: no password').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    req.checkBody('email', 'Error: invalid email.').isEmail();

    if (req.validationErrors()) {
      res.status(400);
      res.send(req.validationErrors());
    } else {
      User.find({
        email: req.body.email
      }, function(err, arr) {
        if (err) {
          res.send(err);
        } else {
          if (arr.length === 0) {
            var newUser = new User({
              fname: req.body.fname,
              lname: req.body.lname,
              email: req.body.email,
              password: req.body.password
            });
            newUser.save(function(err) {
              if (err) {
                res.status(500);
                res.send('Failed to save data.');
              } else {
                res.send('Saved user.');
              }
            })
          } else {
            res.status(400);
            res.send('Error: email is already in use.');
          }
        }
      });
    }
  }

});

router.post('/api/users/login', function(req, res) {
  req.checkBody('email', 'Error: Login failed.').notEmpty();
  req.checkBody('password', 'Error: Login failed.').notEmpty();

  if (req.validationErrors()) {
    res.status(301);
    res.send(req.validationErrors());
  } else {
    User.find({
      email: req.body.email,
      password: req.body.password
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Error: internal database error.');
      } else if (arr.length === 0) {
        res.status(301);
        res.send('Error: Login failed.');
      } else {
        res.status(200);
        var date = new Date();
        var tokenString = req.body.email + date;
        var token = new Token({
          userId: arr[0]._id,
          token: tokenString,
          createdAt: date
        });
        token.save(function(err) {
          if (err) {
            res.status(500);
            res.send('Error: internal database error.');
          }
        });
        res.send({
          success: true,
          response: {
            id: arr[0]._id,
            token: tokenString
          }
        });
      }
    });
  }

});

router.get('/api/users/logout', function(req, res) {
  req.checkQuery('token', 'Error: failed to supply token.').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.query.token
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Error: internal database error.');
      } else if (arr.length === 0) {
        res.status(400);
        res.send('Error: invalid token.');
      } else {
        arr[0].remove();
        res.status(200);
        res.send({
          success: true
        });
      }
    });
  }
});

router.get('/api/posts', function(req, res) {
  res.redirect('/api/posts/1?token=' + req.query.token);
});

router.get('/api/posts/:page', function(req, res) {
  var pageNum = req.params.page || 1;
  req.checkQuery('token', 'Error: missing token.').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.query.token
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Error: internal database error.');
      } else if (arr.length === 0) {
        res.status(400);
        res.send('Error: invalid token.');
      } else {
        res.status(200);
        Post.find(function(err2, arr2) {
          if (err) {
            res.status(500);
            res.send('Error: internal database error.');
          } else {
            var postArr = arr2.slice();
            postArr = postArr.slice((pageNum * 10) - 10, (pageNum * 10));
            res.send({
              success: true,
              response: postArr
            });
          }
        })
      }
    });
  }
});

router.post('/api/posts', function(req, res) {
  req.checkBody('token', 'Error: missing token.').notEmpty();
  req.checkBody('content', 'Error: missing content.').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.body.token
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Error: internal database error.');
      } else if (arr.length === 0) {
        res.status(400);
        res.send('Error: invalid token.');
      } else {
        User.find({
          _id: arr[0].userId
        }, function(err2, arr2) {
          if (err2) {
            res.status(500);
            res.send('Error: internal database error.');
          } else if (arr2.length === 0) {
            res.status(500);
            res.send('Error: failed to find user.');
          } else {
            var newPost = new Post({
              poster: {
                name: arr2[0].fname + ' ' + arr2[0].lname,
                id: arr[0].userId
              },
              content: req.body.content,
              likes: [],
              comments: [],
              createdAt: new Date()
            });
            newPost.save(function(err3) {
              if (err3) {
                res.status(500);
                res.send('Error: internal database error.');
              } else {
                res.status(200);
                res.send({
                  success: true,
                  response: newPost
                });
              }
            });
          }
        });
      }
    });
  }
});

router.get('/api/posts/comments/:post_id', function(req, res) {
  req.checkQuery('token', 'Error: failed to supply token.').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.query.token
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Error: internal database error.');
      } else if (arr.length === 0) {
        res.status(400);
        res.send('Error: invalid token.');
      } else {
        Post.find({
          _id: req.params.post_id
        }, function(err2, arr2) {
          if (err2) {
            res.status(500);
            res.send('Error: internal database error.');
          } else if (arr2.length === 0) {
            res.status(400);
            res.send('Error: failed to find post.');
          } else {
            res.status(200);
            res.send({
              success: true,
              response: arr2.slice()
            });
          }
        });
      }
    });
  }
});

router.post('/api/posts/comments/:post_id', function(req, res) {
  req.checkBody('token', 'Error: failed to supply token.').notEmpty();
  req.checkBody('content', 'Error: failed to supply content.').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.body.token
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Error: internal database error.');
      } else if (arr.length === 0) {
        res.status(400);
        res.send('Error: invalid token.');
      } else {
        Post.find({
          _id: req.params.post_id
        }, function(err2, arr2) {
          if (err2) {
            res.status(500);
            res.send('Error: internal database error.');
          } else if (arr2.length === 0) {
            res.status(400);
            res.send('Error: failed to find post.');
          } else {
            User.find({
              _id: arr[0].userId
            }, function(err3, arr3) {
              if (err3) {
                res.status(500);
                res.send('Error: internal database error.');
              } else if (arr3.length === 0) {
                res.status(400);
                res.send('Error: cannot find user.');
              } else {
                arr2[0].comments.push({
                  createdAt: new Date(),
                  content: req.body.content,
                  poster: {
                    name: arr3[0].fname + ' ' + arr3[0].lname,
                    id: arr[0].userId
                  }
                });
                arr2[0].save(function(err4) {
                  if (err4) {
                    res.status(500);
                    res.send('Error: internal database error.');
                  } else {
                    res.status(200);
                    res.send({
                      success: true,
                      response: arr2.slice()
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

router.get('/api/posts/likes/:post_id', function(req, res) {
  req.checkQuery('token', 'Error: failed to supply token.').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.query.token
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Error: internal database error.');
      } else if (arr.length === 0) {
        res.status(400);
        res.send('Error: invalid token.');
      } else {
        Post.find({
          _id: req.params.post_id
        }, function(err2, arr2) {
          if (err2) {
            res.status(500);
            res.send('Error: internal database error.');
          } else if (arr2.length === 0) {
            res.status(400);
            res.send('Error: failed to find post.');
          } else {
            User.find({
              _id: arr[0].userId
            }, function(err3, arr3) {
              if (err3) {
                res.status(500);
                res.send('Error: internal database error.');
              } else if (arr3.length === 0) {
                res.status(400);
                res.send('Error: cannot find user.');
              } else {
                var obj = {
                  name: arr3[0].fname + ' ' + arr3[0].lname,
                  id: arr[0].userId
                }

                var index = arr2[0].likes.findIndex(function(temp) {
                  return temp.id === obj.id;
                });

                if (index !== -1) {
                  arr2[0].likes.splice(index, 1);
                } else {
                  arr2[0].likes.push(obj);
                }
                arr2[0].save(function(err4) {
                  if (err4) {
                    res.status(500);
                    res.send('Error: internal database error.');
                  } else {
                    res.status(200);
                    res.send({
                      success: true,
                      response: arr2.slice()
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

module.exports = router;
