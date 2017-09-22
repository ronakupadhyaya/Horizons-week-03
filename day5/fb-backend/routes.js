var express = require('express');
var router = express.Router();
var Post = require('./models/post').Post;
var User = require('./models/user').User;
var Token = require('./models/token').Token;
var bcrypt = require('bcrypt');
var saltRounds =10;

router.post('/api/users/register', function(req, res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    req.body.password = hash;
    var newUser = new User(req.body);
    newUser.save(function(err, user){
      if(err){
        res.send(err)
      } else{
        res.json(user);
      }
    })
  })

})

router.post('/api/users/login', function(req, res){
  User.findOne({email: req.body.email}, function(err, user){

    if(err || !user){
      if(!user){
        res.send("Email not found correct");
      } else{
        res.send(err);
      }

    } else{
      bcrypt.compare(req.body.password, user.password, function(err, resp){
        if(!resp){
          res.send("password incorrect");
        } else{
          var token = {};
          token.token = user.email + new Date();
          token.userId = user._id;
          token.createdAt = new Date();
          var newToken = new Token(token);
          newToken.save(function(err, token){
            if(err){
              res.send(err);
            } else{
              res.json(token);
            }

          })
        }
      })

    }
  })
});

router.get('/api/users/logout', function(req, res){
  console.log("REQ BODY", req.query);
  Token.findOneAndRemove({token: req.query.token}, function(success, err){
    if(success){
      res.send(success);
    } else{
      res.send(err);
    }
  })
});

router.get('/api/posts', function(req, res){
  Token.findOne({token: req.query.token}, function(err, token){
    if(err){
      res.send(err);
    } else{
      Post.find(function(err, posts){
        if(err){
          res.send(err);
        } else{
          res.json(posts.slice(0,10));
        }

      })
    }
  })
});
router.get('/api/posts/:page', function(req, res){
  var page = parseInt(req.params.page);
  var firstPost = (page-1) * 10;
  var lastPost = firstPost+10;
  Token.findOne({token: req.query.token}, function(err, token){
    if(err){
      res.send(err);
    } else{
      Post.find(function(err, posts){
        if(err){
          res.send(err);
        } else{
          res.json(posts.slice(firstPost, lastPost));
        }

      })
    }
  })
});
//postid = 59c5840f512893418dfc8a75
//token = fakeEmail@gmail.comFri Sep 22 2017 14:42:12 GMT-0700 (PDT)

router.put('/api/posts/:post_id', function(req, res){
  var postId = req.params.post_id;
  Token.findOne({token: req.body.token}, function(err, token){
    if(err){
      res.send(err);
    } else{
      console.log(req.body.content);
      Post.findByIdAndUpdate(postId, {content: req.body.content}, function(success){
        res.json(success);
      })
    }
  })
});

router.delete('/api/posts/:post_id', function(req, res){
  var postId = req.params.post_id;
  Token.findOne({token: req.body.token}, function(err, token){
    if(err){
      res.send(err);
    } else{
      Post.findById(postId, function(err, post){
        if(err){
          res.send(err);
        } else{
          if(post.poster._id.equals(token.userId)){

            post.remove(function(err, success){
              if(err){
                res.send(err);
              } else{
                res.send("Post deleted successfully");
              }
            })

          } else{
            res.send("You don't have permission to remove this post");
          }

        }
      })
    }
  })
});

router.get('/api/posts/reactions/:reaction_type/:post_id/', function(req, res){
  var postId = req.params.post_id;
  var reactionType = req.params.reaction_type;
  Token.findOne({token: req.query.token}, function(err, token){
    if(err || !token){
      if(!token){
        res.send("You're not loggedin!")
      } else{
        res.send(err);
      }
    } else{
      User.findById(token.userId, function(err, user){
        if(err){
          res.send(err);
        } else{
          Post.findById(postId, function(err, post){
            if(err){
              res.send(err);
            } else{
              var found = false;
              for(var i =0; i < post.reactions.length; i++){
                if(post.reactions[i].id.equals(user._id)){

                  if(post.reactions[i].type === reactionType){
                    found = true;
                  }
                  post.reactions.splice(i, 1);
                }
              }
              if(!found){
                post.reactions.push({
                  type: reactionType,
                  name: user.fname +  ' ' + user.lname,
                  id: user._id
                })
              }
              post.save(function(err, post){
                if(err){
                  res.send(err);
                } else{
                  res.json(post.reactions);
                }
              })

            }
          })
        }
      })
    }
  })
})

router.get('/api/posts/comments/:post_id', function(req, res){
  var postId = req.params.post_id;
  Token.findOne({token: req.query.token}, function(err, token){
    if(err){
      res.send(err);
    } else{
      Post.findById(postId, function(err, post){
        if(err){
          res.send(err);
        } else{
          res.json(post.comments);
        }
      })
    }
  })
})

router.post('/api/posts/comments/:post_id', function(req, res){
  var postId = req.params.post_id;
  Token.findOne({token: req.body.token}, function(err, token){
    if(err){
      res.send(err);
    } else{
      Post.findById(postId, function(err, post){
        if(err){
          res.send(err);
        } else{
          User.findById(token.userId, function(err, user){
            if(err){
              res.send(err);
            } else{
              var newCommentObj = {
                content: req.body.content,
                poster: {
                  id: user._id,
                  fname: user.fname,
                  lname: user.lname
                }
              }
              post.comments.push(newCommentObj);
              post.save(function(err, post){
                if(err){
                  res.send(err);
                } else{
                  res.json(post);
                }
              })
            }
          })
        }
      })
    }
  })

})
// Token.findOne({token: req.query.token}, function(err, token){
//   if(err){
//     res.send(err);
//   } else{
//
//   }
// })
router.post('/api/posts', function(req, res){
  Token.findOne({token: req.body.token}, function(err, token){
    if(err || !token){
      if(!token){
        res.send("You're not loggedin!")
      } else{
        res.send(err);
      }

    } else{
      User.findById(token.userId, function(err, user){
        var post = {};
        post.content = req.body.content;
        post.createdAt = new Date();
        post.poster = user;
        var newPost = new Post(post);
        newPost.save(function(err, post){
          if(err){
            res.send(err);
          } else{
            res.json(post);
          }
        })
      })

    }
  })
});


module.exports = router;
