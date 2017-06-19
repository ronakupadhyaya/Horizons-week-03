//FILE WITH ROUTES - TO ACCESS DIFF PROPERITES TO EXPRESS

//have express, from express: a router obj that can use in app.js: able to accept
// get requests and call callbacks
var express = require('express');
var router = express.Router();
var models = require('./models/models');
var User = models.User;
var Token = models.Token;
var Post = models.Post;

router.get('/', function(req, res) {
  res.send({message: "hello"});

});

router.post('/users/register', function(req, res) {
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  newUser.save(function(err, user) {
    if (err) {
      res.json({failure: "database error"})
    } else {
      res.json({success: true})
    }
  });
});

//find user by email and password, get id of user, create token for this user
router.post('/users/login', function(req, res) {
  var email = req.body.email;
  var pass = req.body.password;
  User.findOne({email: email, password: pass}, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      var id = user.id;
      var date = new Date();
      var tok = user.email+Date.now();

      var newToken = new Token({
        userId: id,
        token: tok,
        createdAt: date
      })

      newToken.save(function(err, token) {
        if (err) {
          res.json({failure: "error saving token"});
        } else {
          res.json({
            success: true,
            response: {
              id: id,
              token: token.token
            }
          })
        }
      })
    } //close else
  }) //close findOne
}); //close login

//log user out: requires valid token
router.get('/users/logout', function(req, res) {
  var tok = req.query.token;

  Token.remove({token: tok}, function(err) {
    if (err) {
      res.json({failure: "error in removing token"});
    } else {
      res.json({
        success: true
      })
    }
  })
})
//get set of 10 posts; page determined by params; token in query
router.get('/posts/:page', function(req, res) {
  var tok = req.query.token;
  var pg = req.params.page || 1;
  Token.findOne({token: tok}, function(err, foundToken) {
    if (err) {
      res.json({failure: "invalid token to get posts"});
    } else {
      Post.find(function(err, posts) {
        if (err) {
          res.json({failure: "error in getting posts"})
        } else {
          var sendPosts = [];
          var i = (pg-1)*10;
          while (i < posts.length || i < (pg*10)) {
            sendPosts.push(posts[i]);
          }

          res.json( {
            succes: true,
            response: sendPosts
          })
        }
      })
    }
  });
});
//get 10 most recent posts
router.get('/posts/', function(req, res) {
  var tok = req.query.token;
  Token.findOne({token: tok}, function(err, foundToken) {
    if (err) {
      res.json({failure: "invalid token to get posts"});
    } else {
      Post.find(function(err, posts) {
        if (err) {
          res.json({failure: "error in getting posts"})
        } else {
          var sendPosts = [];
          var i = 0;
          while (i < posts.length || i < 10) {
            sendPosts.push(posts[i]);
          }

          res.json( {
            success: true,
            response: sendPosts
          })
        }
      })
    }
  });
});
//make a post: find token, find user from token, make post obj, send json res
router.post('/posts/', function(req, res) {
  var tok = req.query.token;
  var content = req.body.content;
  Token.findOne({token: tok}, function(err, foundToken) {
    if (err) {
      res.json({failure: "invalid token to make a post"})
    } else {

      User.findOne({_id: foundToken.userId}, function(err, foundUser) {
        if (err) {
          res.json({failure: "invalid user from found token"})
        } else {
          var poster = {
            id: foundUser.id,
            name: foundUser.fname+" "+foundUser.lname
          };
          var date = new Date();
          var comments = [];
          var likes = [];
          var newPost = new Post({
            poster: poster,
            createdAt: date,
            content: content,
            comments: comments,
            likes: likes
          })

          newPost.save(function(err) {
            if (err) {
              res.json({failure: "error in saving new post"})
            } else {
              res.json({success: true, response: newPost})
            }
          })
        }
      }) //close find user
    } //close else
  }) //close found token
}) //close post post
//edit an already existent post: only owner of post can do this
//token -> user -> find post -> check if owner of post -> update
router.put('/posts/:post_id', function(req, res) {
  var tok = req.query.token;
  var edit = req.body.content;
  var postId = req.params.post_id;
  Token.findOne({token: tok}, function(err, foundToken) {
    if (err) {
      res.json({failure: "error in finding token for edit post"});
    } else {
      User.findOne({_id: foundToken.userId}, function(err, foundUser) {
        if (err) {
          res.json({failure: "error in finding user from token, edit post"});
        } else {
          var userName = foundUser.fname + " " + foundUser.lname;
          var userId = foundUser.id;

          Post.findOne({_id: postId}, function(err, foundPost) {
            if (err) {
              res.json({failure: "error in finding post for edit"});
            } else {
              if (foundPost.poster.id !== userId) {
                res.json({failure: "error: editor not same as owner of post"});
              } else {
                Post.findByIdAndUpdate(postId, {content: edit}, function(err, foundPost) {
                  if (err) {
                    res.json({failure: "error in updating post with edit"});
                  } else {
                    res.json({success: true})
                  }
                }); //close found post find by id & update
              }
            }
          }); //close found post
        }
      }); //close found user
    }
  }); //close found token
}); //close put edit post
//get comments of a specific post
router.get('/posts/comments/:post_id', function(req, res) {
  var tok = req.query.token;
  var postId = req.params.post_id;
  Token.findOne({token: tok}, function(err, foundToken) {
    if (err) {
      res.json({failure: "invalid token to get comments"});
    } else {
      Post.findOne({_id: postId}, function(err, foundPost) {
        if (err) {
          res.json({failure: "invalid post id to get comments"});
        } else {
          var comments = foundPost.comments;
          res.json({
            success: true,
            response: comments
          });
        }
      }) //close find post
    } //close else of find token
  }); //close find token
}); //close get post comments
//post a  comment to a post: find token, find user w/ that token,
//find post by post id, push comment to post, return success and post
router.post('/posts/comments/:post_id', function(req, res) {
  var tok = req.query.token;
  var postId = req.params.post_id;
  var commentContent = req.body.content;
  Token.findOne({token: tok}, function(err, foundToken) {
    if (err) {
      res.json({failure: "invalid token to post a comment"});
    } else {
      User.findOne({_id: foundToken.userId}, function(err, foundUser) {
        var posterName = foundUser.fname + " " + foundUser.lname;
        var userId = foundUser.id;

        if (err) {
          res.json({failure: "invalid user to post a comment"});
        } else {
          Post.findOne({_id: postId}, function(err, foundPost) {
            if (err) {
              res.json({failure: "invalid post to post a comment"});
            } else {
              var date = new Date();
              var comment = {
                createdAt: date,
                content: commentContent,
                poster: {
                  name: posterName,
                  id: userId
                }
              };
              foundPost.comments.push(comment);
              foundPost.save(function(err) {
                if (err) {
                  res.json("error in saving post w/ comment");
                } else {
                  res.json({success: true, response: foundPost})
                }
              })
            }
          }); //close found post
        }
      }); //close found user
    }
  }); //close found token
}); //close post a comment
//get likes to a post: get valid token, find post, return likes array
router.get('/posts/likes/:post_id', function(req, res) {
  var tok = req.query.token;
  var postId = req.params.post_id;
  Token.findOne({token: tok}, function(err, foundToken) {
    if (err) {
      res.json({failure: "invalid token to get likes"});
    } else {
      User.findOne({_id: foundToken.userId}, function(err, foundUser) {
        if (err) {
          res.json({failure: "error in finding user w/ token for likes"});
        } else {
          var userId = foundUser.id;
          var userName = foundUser.fname + " " + foundUser.lname;
          Post.findOne({_id: postId}, function(err, foundPost) {
            if (err) {
              res.json({failure: "error in finding post to get likes"});
            } else {
              //found post - iterate through likes to see if already liked
              var likes = foundPost.likes;
              var alreadyLiked = false;
              likes.forEach(function(like, index) {
                if (like.id === userId) {
                  alreadyLiked = index+1;
                }
              });
              //if user already liked, remove like; else add like
              if (!alreadyLiked) {
                likes.push({
                  name: userName,
                  id: userId
                });
              } else {
                likes.splice(alreadyLiked-1, 1);
              }

              foundPost.save(function(err) {
                if (err) {
                  res.json({failure: "error in saving like of post"});
                } else {
                  res.json({
                    success: true,
                    response: foundPost
                  })
                }
              })
            }
          }); //close found post
        }
      }); //close found user
    }
  }); //close found token
}); //close get likes
//

module.exports = router
