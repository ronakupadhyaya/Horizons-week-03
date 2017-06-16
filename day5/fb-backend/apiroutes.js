var express = require('express');
var expressValidator = require('express-validator');
var util = require('util');
var bodyParser = require('body-parser');
var underscore = require('underscore')

var router = express.Router();
var User = require('./models/models').User;
var Token = require('./models/models').Token;
var Post = require('./models/models').Post;
var strftime = require('strftime');

var app = express();
app.use(bodyParser.json());
app.use(expressValidator());

router.get('/', function(req, res) {
  res.json({
    message: "hello"
  })
})

router.post('/users/register', function(req, res) {
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  newUser.save(function(err, usr) {
    if (err) {
      res.json({
        failures: "database error"
      })
    } else {
      res.json({
        success: true
      })
    }
  })
})

router.post('/users/login', function(req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(err, foundUser) {
    if (err) {
      res.status(500).json(err);
      return;
    } else {
      var today = new Date();
      var newToken = new Token({
        userId: foundUser._id,
        token: req.body.email + today,
        createdAt: today
      });
      newToken.save(function(err, savedToken){
        if(err){
          res.json( {
            failures: "database error"
          })
        } else {
          res.json({
              success: true,
              response: {
                id: savedToken.userId,
                token: savedToken.token
              }
          });
        }
      });
    }
  });
});

router.get('/users/logout', function(req, res) {
  Token.find({
    token:req.query.token
  },function(err,foundToken) {
    if (err) {res.status(500).json(err);return;}
    Token.remove(foundToken, function (err) {
      if (err) {
        res.json({
          failures: "database error"
        })
        return;
      }
      res.json({
        success: true
      });
    });
  })
})

router.post('/posts',authentication,function(req,res) {
  User.findById(req.user_id,function(err,user) {
    var newPost = new Post({
        poster:  {
          name: user.fname+" "+ user.lname,
          id: user._id
        },
        content: req.body.content,
        likes: [],
        comments: [],
        createdAt: new Date()
    });
    newPost.save(function(err,savedPost) {
      if (err) {
        res.json({
          failures: "database error"
        })
        return;
      } else {
        res.json({
          success: true,
          response:
           {
             _id: savedPost._id,
             poster: {
               id: user._id,
               name: user.fname+" "+ user.lname,
             },
             content: req.body.content,
             likes: [],
             comments: [],
             createdAt: new Date()
           }
        });
      }
    });
  });
});

// router.get('/posts',authentication,function(req,res) {
//
// })
router.get('/posts/:page',authentication,function(req,res) {
  var pageNum = req.params.page || 1;
  Post.find({}).skip((pageNum-1)*10).limit(10).exec(function(err,posts) {
    if (err) {
      res.json({ error: err });
      return;
    } else {
      res.json({
        success: true,
        response: posts,
      });
    }
  });
});

router.get('/posts/comments/:post_id',authentication, function(req,res) {
  var postId = req.params.post_id;
  Post.findById(postId,function(err,foundPosts) {
    if (err) {
      res.json({error:err});
      return;
    } else{
      res.json({
        success: true,
        response: [
          {
            poster: foundPosts.poster,
            content: foundPosts.content,
            createdAt: foundPosts.createdAt
          }
        ]
      })
    }
  })
})

router.post('/posts/comments/:post_id',authentication,function(req,res) {
  var postId = req.params.post_id;
  Post.findById(postId,function(err,foundPosts) {
    var commentArr = foundPosts.comments;
    var userName = "";
    User.findById(req.user_id,function(err,foundUser) {
      if (err) {
        res.json({error:err});
        return;
      } else {
        var userName = foundUser.fname + " " +foundUser.lname;
        var newComment = {
            createdAt: new Date(),
            content: req.body.content,
            poster: {
              name: userName,
              id: req.user_id
            }
        }
        commentArr.push(newComment);
        Post.findByIdAndUpdate(foundPosts._id,{comments:commentArr},function(err,updated) {
          if (err) {
            res.json({error:err});
            return;
          } else{
            res.json({
              success: true,
              response: {
                _id: foundPosts._id,
                poster: {
                    id: req.user_id,
                    name: userName
                },
              content: req.body.content,
              createdAt: new Date(),
              comments: updated.comments,
              likes: updated.likes
              }
            });
          }
        })
      }
    })
  });
});

router.get('/posts/likes/:post_id',authentication,function(req,res) {
  var postId = req.params.post_id;
  Post.findById(postId,function(err,foundPosts) {
    var likeArr = foundPosts.likes;
    var userName = "";
    User.findById(req.user_id,function(err,foundUser) {
      if (err) {
        res.json({error:err});
        return;
      } else {
        var liked = false;
        likeArr.forEach(function(likes) {
          if (likes.id === req.user_id) {
            liked = true;
          }
        })
        if (!liked) {
          var userName = foundUser.fname + " " +foundUser.lname;
          var newLike = {
            name: userName,
            id: req.user_id
          }
          likeArr.push(newLike);
        }
        Post.findByIdAndUpdate(foundPosts._id,{likes:likeArr},function(err,updated) {
          if (err) {
            res.json({error:err});
            return;
          } else{
            res.json({
              success: true,
              response: {
                _id: foundPosts._id,
                poster: {
                    id: req.user_id,
                    name: userName
                },
              content: req.body.content,
              createdAt: new Date(),
              comments: updated.comments,
              likes: updated.likes
              }
            });
          }
        });
      }
    });
  });
});


function authentication(req, res, next) {
  var token = req.body.token || req.query.token;
  if (!token) {
    res.json({ error: "please supply a token" });
    return;
  }
  Token.findOne({token:token},function(err,foundToken) {
    if (err) {
      res.json({error: "database error"})
    } else if (!foundToken) {
      res.json({error: "fail to find user"})
    } else {
      req.user_id = foundToken.userId;
      next()
    }
  })
}


module.exports = router;
