var express = require('express');
var router = express.Router();
var models = require('./models/models');
var User = models.User;
var Post = models.Post;
var Token = models.Token;

//Example route
router.get('/', function(req, res) {
  res.send({message: 'hello'});
});

router.post('/users/register', function(req, res) {
  var newUser = new User({  //Look at API for parameters
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(err, user) { //Saving new user to database
    if (err) {
      res.json({
        error: "Incomplete register definition."
      });
    }
    else {
      res.json({success: true});
    }
  });
});

router.post('/users/login', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      console.log('error');
    }
    else {
      var newToken = new Token({
        userId: user._id,
        token: user._id + new Date(),
        createdAt: new Date()
      });
      newToken.save(function(err, user) {
        if (err) {
          res.json({error: "Login failed."});
        }
        else {
          res.json({
            success: true,
            response: {
              id: user.userId,
              token: newToken.token
            }
          });
        }
      });
    }
  });
});

router.post('/users/logout', function(req, res) {
  Token.remove({token: req.body.token}, function(err, token) {
    if (err) {
      res.json({error: "Failed to save data."});
    }
    else {
      res.json({"success": true});
    }
  });
});

router.get('/posts', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      console.log('error');
    }
    else {
      var userId = token.userId;
      User.findOne({_id: userId}, function(err, usr) {
        if (err) {
          console.log('error');
        }
        else {
          if (usr === null) {
            res.json({error: "Failed to find user"});
          }
          else {
            Post.find({}).sort('-date').limit(10).exec(function(err, posts) {
              if (err) {
                console.log('err');
              }
              else {
                var ans = [];
                for (var i = 0; i < posts.length; i++) {
                  ans.push({
                    _id: posts[i]._id,
                    poster: posts[i].poster,
                    content: posts[i].content,
                    createdAt: posts[i].createdAt,
                    comments: posts[i].comments,
                    likes: posts[i].likes
                  });
              }
              res.json({
                success: true,
                response: ans
              });
              }
            });
          }
        }
      });
    }
  })
});


router.get('/posts/:page', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      console.log('error');
    }
    else {
      var userId = token.userId;
      User.findOne({_id: userId}, function(err, usr) {
        if (err) {
          console.log('error');
        }
        else {
          if (usr === null) {
            res.json({error: "Failed to find user"});
          }
          else {
            Post.find({}).sort('-date').exec(function(err, posts) {
              if (err) {
                console.log('err');
              }
              else {
                var ans = [];
                var start = (req.params.page - 1)*10;
                for (var i = start; i < posts.length && ans.length < 10; i++) {
                  ans.push({
                    _id: posts[i]._id,
                    poster: posts[i].poster,
                    content: posts[i].content,
                    createdAt: posts[i].createdAt,
                    comments: posts[i].comments,
                    likes: posts[i].likes
                  });
              }
              res.json({
                success: true,
                response: ans
              });
              }
            });
          }
        }
      });
    }
  })
});

router.post('/posts', function(req, res) {
  Token.findOne({token: req.body.token}, function(err, token) {
    if (err) {
      console.log('error');
      //console.log('token', req.body.token);
    }
    else {
      console.log('token', token);
      var userId = token.userId;
      console.log('userId', userId);
      User.findOne({_id: userId}, function(err, usr) {
        if (err) {
          console.log('error');
        }
        else {
          if (usr === null) {
            res.json({error: "Failed to find user"});
          }
          else {
            var newPost = new Post({
              poster: {
                name: usr.fname + usr.lname,
                id: usr._id
              },
              content: req.body.content,
              likes: [],
              comments: [],
              createdAt: new Date()
            });
            newPost.save(function(err, post) {
              if (err) {
                res.json({"error": "No post content."});
              }
              else {
              res.json({
                success: true,
                response: {
                  poster: post.poster,
                  content: post.content,
                  createdAt: post.createdAt,
                  _id: post._id,
                  comments: [],
                  likes: []
                }
              });
              }
            });
          }
        }
      });
    }
  })
});

router.get('/posts/comments/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    console.log('token', token)
    console.log(req.query.token);
    if (err) {
      console.log('error');
    }
    else {
      var userId = token.userId;
      User.findOne({_id: userId}, function(err, usr) {
        if (err) {
          console.log('error');
        }
        else {
          if (usr === null) {
            res.json({error: "Failed to find user"});
          }
          else {
            Post.findOne({_id: req.params.post_id}, function(err, post) {
              console.log(post);
              if (err) {
                console.log('err');
              }
              else {
                var comments = post.comments;
                var result = [];
                for (var i = 0; i < comments.length; i++) {
                  result.push ({
                    poster: comments[i].poster,
                    content: comments[i].content,
                    createdAt: comments[i].createdAt
                  });
                }
                res.json({
                  success: true,
                  response: result
                });
              }
            });
          }
        }
      });
    }
  })
});

router.post('/posts/comments/:post_id', function(req, res) {
  Token.findOne({token: req.body.token}, function(err, token) {
    if (err) {
      console.log('error');
    }
    else {
      var userId = token.userId;
      User.findOne({_id: userId}, function(err, usr) {
        if (err) {
          console.log('error');
        }
        else {
          if (usr === null) {
            res.json({error: "Failed to find user"});
          }
          else {
            Post.findOne({_id: req.params.post_id}, function(err, post) {
              if (err) {
                console.log('err');
              }
              else {
                var comments = post.comments;
                var newComment = new Post({
                  poster: {
                    name: usr.fname + usr.lname,
                    id: usr._id
                  },
                  content: req.body.content,
                  likes: [],
                  comments: [],
                  createdAt: new Date()
                });
                comments.push(newComment);
                post.save(function(err, post) {
                  if (err) {
                    res.json({"error": "Invalid Post ID."});
                  }
                  else {
                  res.json({
                    success: true,
                    response: {
                      _id: post._id,
                      poster: post.poster,
                      content: post.content,
                      createdAt: post.createdAt,
                      comments: [
                        {
                          createdAt: new Date(),
                          content: newComment.content,
                          poster: newComment.poster
                        }
                      ],
                      likes: post.likes
                    }
                  });
                  }
                });
              }
            });
          }
        }
      });
    }
  })
});

router.get('/posts/likes/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      console.log('error');
    }
    else {
      var userId = token.userId;
      User.findOne({_id: userId}, function(err, usr) {
        if (err) {
          console.log('error');
        }
        else {
          if (usr === null) {
            res.json({error: "Failed to find user"});
          }
          else {
            Post.findOne({_id: req.params.post_id}, function(err, post) {
              if (err) {
                console.log('err');
              }
              else {
                res.json({
                  success: true,
                  response: post
                });
              }
            });
          }
        }
      });
    }
  })
});

router.post('/posts/likes/:post_id', function(req, res) {
  Token.findOne({token: req.body.token}, function(err, token) {
    if (err) {
      console.log('error');
    }
    else {
      var userId = token.userId;
      User.findOne({_id: userId}, function(err, usr) {
        if (err) {
          console.log('error');
        }
        else {
          if (usr === null) {
            res.json({error: "Failed to find user"});
          }
          else {
            Post.findOne({_id: req.params.post_id}, function(err, post) {
              if (err) {
                console.log('err');
              }
              else {
                var likes = post.likes;
                likes.push({
                  poster: {
                    name: usr.fname + usr.lname,
                    id: usr._id
                  }
                });
                post.save(function(err, post) {
                  if (err) {
                    res.json({"error": "Invalid Post ID."});
                  }
                  else {
                  res.json({
                    success: true,
                    response: {
                      _id: post._id,
                      poster: post.poster,
                      content: post.content,
                      createdAt: post.createdAt,
                      comments: post.comments,
                      likes: likes
                    }
                  });
                  }
                });
              }
            });
          }
        }
      });
    }
  })
});

router.put('/posts/:post_id', function(req, res) {
  Token.findOne({token: req.body.token}, function(err, token) {
    if (err) {
      console.log('error');
    }
    else {
      var userId = token.userId;
      User.findOne({_id: userId}, function(err, usr) {
        if (err) {
          console.log('error');
        }
        else {
          if (usr === null) {
            res.json({error: "Failed to find user"});
          }
          else {
            Post.findOne({_id: req.params.post_id}, function(err, post) {
              if (err) {
                console.log('err');
              }
              else {
                var content = req.body.content;
                post.content = content || post.content;
                post.save({_id: req.params.post_id}, function(error, post) {
                    if (error) {
                      console.log("Can't find post", error);
                    }
                    else {
                      res.json({
                        success: true,
                        response: {
                          poster: post.poster,
                          content: post.content,
                          createdAt: post.createdAt,
                          _id: post._id,
                          comments: [],
                          likes: []
                        }
                      });
                    }
                  });
              }
            });
          }
        }
      });
    }
  });
});

router.delete('/posts/:post_id', function(req, res) {
  Token.findOne({token: req.body.token}, function(err, token) {
    if (err) {
      console.log('error');
    }
    else {
      var userId = token.userId;
      User.findOne({_id: userId}, function(err, usr) {
        if (err) {
          console.log('error');
        }
        else {
          if (usr === null) {
            res.json({error: "Failed to find user"});
          }
          else {
            Post.remove({_id: req.params.post_id}, function(error, post) {
                if (error) {
                  console.log("Can't find post", error);
                }
                else {
                  res.json({success: true});
                }
              })
          }
        }
      });
    }
  });
});

module.exports = router;
