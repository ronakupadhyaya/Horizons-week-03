var express = require('express');
var router = express.Router();
var models = require('./models/models');

var User = models.User;
var Post = models.Post;
var Token = models.Token;

router.get('/', function(req, res) {
  res.send({
    message: 'hello'
  });
});

router.post('/users/register', function(req, res) {
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(err, usr) {
    if (err) {
      res.json({
        failure: 'database-error'
      });
    } else {
      res.json({
        success: true
      });
    };
  });
});

router.post('/users/login', function(req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(err, resp) {
    if (err) {
      res.json({
        failure: "Login failed"
      })
    } else {
      var newToken = new Token({
        userId: resp._id,
        token: resp.email + new Date(),
        createdAt: new Date()
      });
      newToken.save(function(err, token) {
        if (err) {
          res.json({
            error: "Failed to save data."
          });
        } else {
          res.json({
            success: true,
            response: {
              id: token.userId,
              token: token.token
            }
          });
        };
      });
    };
  });
})

router.get('/users/logout', function(req, res) {
  Token.findOne({
    token: req.query.token
  }, function(err, resp) {
    if (err) {
      res.json({
        failure: "Token not found"
      });
      return;
    } else {
      var newToken = resp;
      newToken.remove(function(err, token) {
        if (err) {
          res.json({
            error: "Failed to remove token."
          })
        } else {
          res.json({
            success: true,
          });
        };
      });
    };
  });
})

router.post('/posts', function(req, res) {
  //console.log(req.body);
  Token.findOne({
    token: req.body.token
  }, function(err, resp) {
    //console.log(resp);
    if (err) {
      res.json({
        failure: "Token not found"
      });
    } else {
      if (resp) {
        var userId = resp.userId;
        User.findById(userId, function(err, resp2) {
          //console.log(resp2);
          if (err) {
            res.json({
              failure: "User not found"
            })
          } else {
            var newPost = new Post({
              poster: {
                name: resp2.fname + " " + resp2.lname,
                id: userId
              },
              content: req.body.content,
              likes: [],
              comments: [],
              createdAt: new Date()
            });
            newPost.save(function(err, post) {
              if (err) {
                res.json({
                  error: "Failed to post."
                })
              } else {
                res.json({
                  success: true,
                  response: {
                    poster: {
                      name: post.poster.name,
                      id: post.poster.id
                    },
                    content: post.content,
                    createdAt: post.createdAt,
                    _id: post.poster.id,
                    comments: post.comments,
                    likes: post.likes
                  }
                });
              }
            })

          }
        })

      }
    }
  })
})

router.get('/posts', function(req, res) {
  //console.log(req.query);
  Token.findOne({
    token: req.query.token
  }, function(err, resp) {
    //console.log(resp);
    if (err) {
      res.json({
        failure: "Token not found"
      });
    } else {
      var userId = resp.userId;
      Post.find(userId, function(err, resp2) {
        if (err) {
          res.json({
            failure: "User not found"
          })
        } else {
          res.json({
            success: true,
            response: resp2
          })
        }
      })
    }
  })
})

router.post('/posts/comments/:post_id', function(req, res) {
  Token.findOne({
    token: req.body.token
  }, function(err, resp) {
    //console.log(resp);
    if (err) {
      res.json({
        failure: "Token not found"
      });
    } else {
      var postId = req.params.post_id;
      var userId = resp.userId;
      User.findById(userId, function(err, resp2) {
        if (err) {
          res.json({
            failure: "User not found"
          })
        } else {
          Post.findById(postId, function(err, resp3) {
            if (err) {
              res.json({
                failure: "Post not found"
              })
            } else {
              resp3.comments.push({
                createdAt: new Date(),
                content: req.body.content,
                poster: {
                  name: resp2.fname + " " + resp2.lname,
                  id: userId
                }
              })
              resp3.save(function(err, resp4) {
                if (err) {
                  error: "Error saving post with comments"
                }
                else {
                  res.json({
                    success: true,
                    response: resp4
                  })
                }
              })

            };
          })
        }

      })

    }
  })
})

router.get('/posts/comments/:post_id', function(req, res) {
  Token.findOne({
    token: req.query.token
  }, function(err, resp) {
    if (err) {
      res.json({
        failure: "Token not found"
      });
    } else {
      var postId = req.params.post_id;
      Post.findById(postId, function(err, resp2) {
        if (err) {
          res.json({
            failure: "Post not found"
          })
        } else {
          res.json({
            success: true,
            response: resp2.comments
          })
        }
      })

    }

  })
})




module.exports = router;
