var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var validator = require('express-validator');

var Token = require('./models').Token;
var User = require('./models').User;
var Post = require('./models').Post;

router.post('/api/users/register', function(req, res) {
  req.checkBody('fname', 'Incomplete register definition').notEmpty();
  req.checkBody('lname', 'Incomplete register definition').notEmpty();
  req.checkBody('email', 'Incomplete register definition').notEmpty();
  req.checkBody('password', 'Incomplete register definition').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    req.checkBody('email', 'Invalid Email').isEmail();
    if (req.validationErrors()) {
      res.status(400);
      res.send(req.validationErrors());
    } else {
      User.find({
        email: req.body.email
      }, function(err, arr) {
        if (err)
          res.send(err)
        else {
          if (arr.length === 0) {
            var user = new User({
              fname: req.body.fname,
              lname: req.body.lname,
              email: req.body.email,
              password: req.body.password
            })

            user.save(function(err) {
              if (err) {
                res.status(500);
                res.send('Failed to save data')
              } else {
                res.status(200);
                res.send({
                  success: true
                });
              }
            })
          } else {
            res.status(400);
            res.send('Email is already in use')
          }
        }
      })
    }
  }



})

router.post('/api/users/login', function(req, res) {
  req.checkBody('email', 'Login failed').notEmpty();
  req.checkBody('password', 'Login failed').notEmpty();

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
        res.send('Internal database error');
      } else if (arr.length === 0) {
        res.status(301);
        res.send('Login Failed')
      } else {
        res.status(200);
        var date = new Date()
        var tokenString = (req.body.email + date);

        var token = new Token({
          userId: arr[0]._id,
          token: tokenString,
          createdAt: date
        })
        token.save(function(err) {
          if (err) {
            res.status(500);
            res.send('Failed to save data')
          }
        })

        res.send({
          success: true,
          response: {
            id: arr[0]._id,
            token: tokenString
          }
        });
      }
    })
  }
})

router.get('/api/users/logout', function(req, res) {
  req.checkQuery('token', 'Failed to supply token').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.query.token,
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Token cannot be verified');
      } else {
        if (arr.length === 0) {
          res.status(400);
          res.send('Token is Invalid')
        } else {
          arr[0].remove();
          res.status(200);
          res.send({
            success: true
          })
        }
      }
    })
  }
})

router.get('/api/posts', function(req, res) {
  res.redirect('/api/posts/1?token=' + req.query.token);
})

router.get('/api/posts/:page', function(req, res) {
  var pageNum = req.params.page || 1;
  req.checkQuery('token', 'Failed to supply token').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.query.token,
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Token cannot be verified');
      } else {
        if (arr.length === 0) {
          res.status(400);
          res.send('Token is Invalid')
        } else {
          res.status(200);
          Post.find(function(err2, arr2) {
            if (err2) {
              res.status(500);
              res.send('Failed to query posts')
            } else {
              var postArr = arr2.slice();
              postArr = postArr.slice((10 * pageNum) - 10, (10 * pageNum));
              res.send({
                success: true,
                response: postArr
              })
            }
          })
        }
      }
    })
  }
})

router.post('/api/posts', function(req, res) {
  req.checkBody('token', 'Failed to supply a token').notEmpty();
  req.checkBody('content', 'No post content').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.body.token,
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Token cannot be verified');
      } else {
        if (arr.length === 0) {
          res.status(400);
          res.send('Token is Invalid')
        } else {
          User.find({
            _id: arr[0].userId
          }, function(err2, arr2) {
            if (err2) {
              res.status(500);
              res.send('Internal database error')
            } else if (arr2.length === 0) {
              res.status(500);
              res.send('Failed to find user');
            } else {
              var post = new Post({
                poster: {
                  name: arr2[0].fname + ' ' + arr2[0].lname,
                  id: arr[0].userId
                },
                content: req.body.content,
                likes: [],
                comments: [],
                createdAt: new Date()
              });
              post.save(function(err3) {
                if (err3) {
                  res.status(500);
                  res.send('Failed to save data')
                } else {
                  res.status(200);
                  res.send({
                    success: true,
                    response: post
                  });
                }
              })
            }
          })
        }
      }
    })
  }
})

router.get('/api/posts/comments/:post_id', function(req, res) {
  req.checkQuery('token', 'Failed to supply token').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.query.token,
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Token cannot be verified');
      } else {
        if (arr.length === 0) {
          res.status(400);
          res.send('Token is Invalid')
        } else {
          Post.find({
            _id: req.params.post_id
          }, function(err2, arr2) {
            if (err2) {
              res.status(500)
              res.send('Internal database error')
            } else if (arr2.length === 0) {
              res.status(400);
              res.send('Invalid post id')
            } else {
              res.status(200);
              res.send({
                success: true,
                response: arr2.slice()
              })
            }
          })
        }
      }
    })
  }
})

router.post('/api/posts/comments/:post_id', function(req, res) {
  req.checkBody('token', 'Failed to supply token').notEmpty();
  req.checkBody('content', 'Failed to supply content').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.body.token,
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Token cannot be verified');
      } else {
        if (arr.length === 0) {
          res.status(400);
          res.send('Token is Invalid')
        } else {
          Post.find({
            _id: req.params.post_id
          }, function(err2, arr2) {
            if (err2) {
              res.status(500)
              res.send('Internal database error')
            } else if (arr2.length === 0) {
              res.status(400);
              res.send('Invalid post id')
            } else {
              User.find({
                _id: arr[0].userId
              }, function(err3, arr3) {
                if (err3) {
                  res.status(500);
                  res.send('Internal database error')
                } else if (arr3.length === 0) {
                  res.status(400);
                  res.send('Cannot find user')
                } else {
                  arr2[0].comments.push({
                    createdAt: new Date(),
                    content: req.body.content,
                    poster: {
                      name: arr3[0].fname + ' ' + arr3[0].lname,
                      id: arr[0].userId
                    }
                  })

                  arr2[0].save(function(err4) {
                    if (err4) {
                      res.status(500);
                      res.send('Internal database error')
                    } else {
                      res.status(200);
                      res.send({
                        success: true,
                        response: arr2.slice()
                      })
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  }
})

router.get('/api/posts/likes/:post_id', function(req, res) {
  req.checkQuery('token', 'Failed to supply token').notEmpty();

  if (req.validationErrors()) {
    res.status(400);
    res.send(req.validationErrors());
  } else {
    Token.find({
      token: req.query.token,
    }, function(err, arr) {
      if (err) {
        res.status(500);
        res.send('Token cannot be verified');
      } else {
        if (arr.length === 0) {
          res.status(400);
          res.send('Token is Invalid')
        } else {
          Post.find({
            _id: req.params.post_id
          }, function(err2, arr2) {
            if (err2) {
              res.status(500)
              res.send('Internal database error')
            } else if (arr2.length === 0) {
              res.status(400);
              res.send('Invalid post id')
            } else {
              User.find({
                _id: arr[0].userId
              }, function(err3, arr3) {
                if (err3) {
                  res.status(500);
                  res.send('Internal database error')
                } else if (arr3.length === 0) {
                  res.status(400);
                  res.send('Cannot find user')
                } else {
                  var obj = {
                    name: arr3[0].fname + ' ' + arr3[0].lname,
                    id: arr[0].userId
                  }

                  var index = arr2[0].likes.findIndex(function(temp) {
                    return temp.id === obj.id;
                  })

                  if (index !== -1) {
                    arr2[0].likes.splice(index, 1);
                  } else {
                    arr2[0].likes.push(obj)
                  }


                  arr2[0].save(function(err4) {
                    if (err4) {
                      res.status(500);
                      res.send('Internal database error')
                    } else {
                      res.status(200);
                      res.send({
                        success: true,
                        response: arr2.slice()
                      })
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  }
})

module.exports = router;