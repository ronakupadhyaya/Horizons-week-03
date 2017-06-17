var express = require('express')
var router = express.Router()
var models = require('./models/models')
var User = models.User
var Token = models.Token
var Post = models.Post

router.get('/', function(req, res) {
  res.send({message: 'hello'})
})

router.post('/users/register', function(req, res) {
  var newUser = new User({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(err, usr) {
    if (err) {
      res.json({failure: "database error"})
    }
    else {
      res.json({success: true})
    }
  })
})

router.post('/users/login', function(req, res) {
  User.find({email: req.body.email}, function(err, users) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(req.body.email);
      users.forEach(function(usr) {
        if (req.body.password === usr.password) {
          var date = Date.now().toString();
          var token = req.body.email + date;
          var newToken = new Token({
            token: token,
            userId: usr._id,
            createdAt: date
          })
          newToken.save(function(err, usr) {
            if (err) {
              res.json({failure: "database error"})
            }
            else {
              res.json({success: true})
            }
          })
        }
      })
    }
  })
})

router.get('/users/logout', function(req, res) {
  Token.remove({token: req.query.token}, function(err) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('removing token')
      res.json({success: true})
    }
  })
})

router.get('/posts', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      res.status(500).json("Token cannot be verified");
    }
    else {
      User.findOne({_id: token.userId}, function(err, usr) {
        if (err) {
          res.status(500).json("Invalid user")
        }
        else {
          Post.find({}).sort({createdAt: -1}).exec(function (err, arr) {
            if (err) {
              console.log(err)
            }
            else {
              var response = arr.slice(0, 10)
              res.json({
                success: true,
                response: response
              })
            }
          })
        }
      })
    }
  })
})

router.get('/posts/:page', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      res.status(500).json("Token cannot be verified");
    }
    else {
      User.findOne({_id: token.userId}, function(err, usr) {
        if (err) {
          res.status(500).json("Invalid user")
        }
        else {
          Post.find({}).sort({createdAt: -1}).exec(function (err, arr) {
            if (err) {
              console.log(err)
            }
            else {
              if (!page) {
                page = 1
              }
              var response = arr.slice((page - 1) * 10, page * 10)
              res.json({
                success: true,
                response: response
              })
            }
          })
        }
      })
    }
  })
})

router.post('/posts', function(req, res) {
  Token.findOne({token: req.body.token}, function(err, token) {
    if (err) {
      res.status(500).json("Token cannot be verified");
    }
    else {
      User.findOne({_id: token.userId}, function(err, usr) {
        if (err) {
          res.status(500).json("Invalid user")
        }
        else {
          var date = new Date().toJSON();
          var newPost = new Post({
            poster: {
              name: usr.fName + ' ' + usr.lName,
              id: usr._id,
            },
            content: req.body.content,
            createdAt: date,
            comments: [],
            likes: []
          })
          newPost.save(function(err, post) {
            if (err) {
              res.status(500).json("Failed to post data")
            }
            else {
              res.json({success: true, response: newPost})
            }
          })
        }
      })
    }
  })
})

router.get('/posts/comments/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      res.status(500).json("Token cannot be verified");
    }
    else {
      User.findOne({_id: token.userId}, function(err, usr) {
        if (err) {
          res.status(500).json("Invalid user")
        }
        else {
          Post.findById(req.params.post_id, function(err, post) {
            if (err) {
              res.status(500).json('Failed to get comments on post')
            }
            else {
              res.json({success: true, response: post.comments})
            }
          })
        }
      })
    }
  })
})

router.post('/posts/comments/:post_id', function(req, res) {
  Token.findOne({token: req.body.token}, function(err, token) {
    if (err) {
      res.status(500).json("Token cannot be verified");
    }
    else {
      User.findOne({_id: token.userId}, function(err, usr) {
        if (err) {
          res.status(500).json("Invalid user")
        }
        else {
          var date = Date.now();
          var newComment = {
            poster: {
              id: usr._id,
              name: usr.fName + ' ' + usr.lName
            },
            content: req.body.content,
            createdAt: date,
          }
          Post.findById(req.params.post_id, function(err, post) {
            if (err) {
              res.status(500).json('Failed to find post')
            }
            else {
              post.comments.push(newComment);
              console.log(post.comments)
              post.update({comments: post.comments}, function(err) {
                if (err) {
                  res.status(500).json('Failed to comment on post')
                }
                else {
                  res.json({success: true, response: post})
                }
              })
            }
          })
        }
      })
    }
  })
})

router.get('/posts/likes/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      res.status(500).json("Token cannot be verified");
    }
    else {
      User.findById(token.userId, function(err, usr) {
        if (err) {
          res.status(500).json("Invalid user")
        }
        else {
          Post.findById(req.params.post_id, function(err, post) {
            if (err) {
              res.status(500).json('Failed to find post')
            }
            else {
              var newLikes = post.likes;
              var found = false;
              for (var i = 0; i < newLikes.length; i++) {
                if (newLikes[i].id === usr._id) {
                  found = true;
                  newLikes.splice(i, 1);
                  break;
                }
              }
              if (!found) {
                newLikes.push({name: usr.fName + ' ' + usr.lName, id: usr._id});
              }

              post.update({likes: newLikes}, function(err) {
                if (err) {
                  res.status(500).json('Failed to like')
                }
                else {
                  res.json({success: true, response: post})
                }
              })
            }
          })
        }
      })
    }
  })
})

router.put('/posts/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      res.status(500).json("Token cannot be verified");
    }
    else {
      User.findById(token.userId, function(err, usr) {
        if (err) {
          res.status(500).json("Invalid user")
        }
        else {
          
        }
      })
    }
  })
})

module.exports = router
