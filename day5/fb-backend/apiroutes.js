var express = require('express');
var router = express.Router();
var models = require('./models/models.js');
var User = models.User;
var Post = models.Post;
var Token = models.Token;
router.post('/users/register', function(req, res) {
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  // console.log(newUser);
  newUser.save(function(err, usr) {
    if (err) {
      res.json({
        faliure: 'database error'
      })
    } else {
      res.json({
        success: true
      })
    }
  })
})

router.post('/users/login', function(req, res) {
  var input = {
    email: req.body.email,
    password: req.body.password
  }

  User.find(input, function(error, target) {
    if (error) {
      console.log(error);
    } else {
      var newToken = new Token({
        userId: target[0].id,
        token: target[0].email + new Date(),
        createdAt: new Date()
      })
      newToken.save(function(err, token) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: true
          })
        }
      })
      res.json({
        "success": true,
        "response": {
          "id": target[0].id,
          "token": target[0].email + new Date()
        }
      })
    }
  })
})
router.get('/users/logout', function(req, res) {
  var tokenTarget = {
    token: req.query.token
  }
  // console.log(req.query.token);
  Token.findOneAndRemove(tokenTarget, function(err, target) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        success: true
      })
    }
  })
})

router.post('/posts', function(req, res) {
  var tokenTarget = {
    token: req.body.token
  }

  Token.findOne(tokenTarget, function(err, target) {
    if (err) {
      console.log(err);
    } else {
      console.log(target);
      var userId = target.userId;
      var token = req.query.token;
      User.findById(userId, function(err, item) {
        if (err) {
          console.log(err);
        } else {
          var PostName = item.fname + ' ' + item.lname;
          var poster = {
            name: PostName,
            id: userId
          }
          var newPost = new Post({
            poster: poster,
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: new Date()
          })
          newPost.save(function(err, usr) {
            if (err) {
              res.json({
                faliure: 'database error'
              })
            } else {
              res.json({
                success: true,
                response: {
                  poster: poster,
                  content: req.body.content,
                  comments: [],
                  likes: []
                }
              })
            }
          })

        }
      })
    }
  })
})
router.get('/posts', function(req, res) {
  var tokenTarget = {
    token: req.query.token
  }
  Token.findOne(tokenTarget, function(err, item) {
    if (err || !item) {
      console.log(err);
    } else {
      var userId = item.userId;
      console.log(userId);
      Post.findOne({
        'poster.id': userId
      }, function(err, target) {
        console.log(target);
        if (err) console.log(err);
        else {
          res.json({
            success: true,
            response: {
              poster: target.poster,
              content: target.content,
              comments: target.comments,
              likes: target.likes
            }
          })

        }
      })
    }
  })
})

router.post('/posts/comments/:post_id', function(req, res) {
  var postid = req.params.post_id;
  var tokenTarget = {
    token: req.body.token
  }
  var comments = req.body.content;
  Token.findOne(tokenTarget, function(err, targetInToken) {
    if (err) {
      console.log(err);
    } else {
      // console.log(target);
      Post.findById(postid, function(err, targetInPost) {
        if (err) console.log(err);
        else {
          var comment = {
            createdAt: new Date(),
            content: comments,
            poster: {
              name: targetInPost.poster.name,
              id: targetInPost.poster.id
            }
          }
          targetInPost.comments.push(comment);
          targetInPost.save(function(err, updates) {
            if (err) console.log(err);
            else {
              res.json({
                success: true,
                response: {
                  poster: targetInPost.poster,
                  content: targetInPost.content,
                  comments: targetInPost.comments,
                  likes: targetInPost.likes
                }
              })

            }
          });

        }
      })

    }
  })
})
router.get('/posts/comments/:post_id', function(req, res) {
  var postid = req.params.post_id;
  var tokenTarget = {
    token: req.query.token
  }
  Token.findOne(tokenTarget, function(err, target) {
    if (err || !target) console.log(err);
    else {
      Post.findById(postid, function(err, post) {
        if (err) console.log(err);
        else {
          var comment = post.comments;
          res.json({
            success: true,
            response: comment
          });
        }
      })
    }
  })
})
router.get('/posts/likes/:post_id', function(req, res) {
  var postid = req.params.post_id;
  var tokenTarget = {
    token: req.query.token
  }
  Token.findOne(tokenTarget, function(err, target) {
    if (err || !target) console.log(err);
    else {
      var likerId = target.userId;
      User.findById(likerId, function(err, targetUser) {
        if (err) console.log(err);
        else {
          var userName = targetUser.fname + " " + targetUser.lname;
          var poster = {
            name: userName,
            id: likerId
          }
          Post.findById(postid, function(err, post) {
            if (err) console.log(err);
            else {
              var likes = post.likes;
              // if (likes.length === 0) {
              //   likes.push(poster);
              // } else {
              var turn = false;
              likes.forEach(function(item, index) {
                var id = item.id;
                if (id === likerId) {
                  turn = true;
                  likes.splice(index, 1);
                }
              })
              if (turn !== true) {
                likes.push(poster);
              }
              // }
              post.save(function(err) {
                if (err) console.log(err);
                else {
                  res.json({
                    success: true,
                    response: post
                  });
                }
              })

            }
          })



        }
      })



    }
  })

})
module.exports = router;
