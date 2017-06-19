var express = require('express');
var router = express.Router();
var models = require('./models/models')

var Token = models.Token;
var User = models.User;
var Post = models.Post;

router.get('/', function(){
  res.send({
    message: 'hello'
  })
})

router.post('/users/register', function(req, res){
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  newUser.save(function(err, user){
    if (err){
      res.json({failure: "Database error."});
    } else {
      res.json({success: true});
    }
  })
})

router.post('/users/login', function(req, res){
  User.findOne({'email': req.body.email, 'password': req.body.password}, function(err, user){
    if (err){
      res.json({error: "Database failed."});
    } else if(!user){
      res.json({error: "Could not find user."});
    } else {
      var newToken = new Token({
        userId: user._id,
        token: req.body.email + new Date(),
        createdAt: new Date()
      })
      newToken.save(function(err, user){
        if (err){
          res.json({error: "Incomplete register definition."});
        } else {
          res.json({
            success: true,
            response: {
              id: newToken.id,
              token: newToken.token
            }
          })
        }
      })
    }
  })
})

router.post('/users/logout', function(req, res){
  Token.findOne({'token': req.body.token}).remove(function(err, token){
    if (err){
      res.json({error: "Failed to save data."});
    } else{
      res.json({success: true});
    }
  })
})

router.post('/posts', function(req, res){
  Token.findOne({'token': req.body.token}, function(err, token){
    if (err){
      res.json({error: "Database error."});
    } else{
      User.findById(token.userId, function(err, user) {
        var newPost = new Post({
          poster: {
            name: user.fname + " " + user.lname,
            id: user._id
          },
          content: req.body.content,
          likes: [],
          comments: [],
          createdAt: new Date()
        })
        newPost.save(function(err, token){
          if (err){
            res.json({error: "No post content."});
          }
          else {
            res.json({
              success: true,
              response: newPost
            })
          }
        })
      })
    }
  })
})

router.get('/posts/:page', function(req, res){
  var page = req.params.page;
  console.log('page');
  var start = (page-1)*10;
  var end = page*10;
  Token.findOne({'token': req.query.token}, function(err, token){
    if (err){
      res.json({error: "Database error."});
    } else{
      Post.find(function(err, post){
        if (err){
          res.json({error: "Not actually sure what this error does."})
        } else{
          res.json({
            success: true,
            response: post.slice(start, end)
          })
        }
      })
    }
  });
})

router.post('/posts/comments/:post_id', function(req, res){
  Token.findOne({'token': req.body.token}, function(err, token){
    console.log(req.params.post_id);
    if (err){
      res.json({error: "Database error."});
    } else{
      Post.findOne({'_id': req.params.post_id}, function(err, post){
        if (err){
          console.log(err);
        } else{
          post.comments.push({
            createdAt: new Date(),
            content: req.body.content
          })
          post.save(function(err, user){
            if (err){
              res.json({error: "Incomplete register definition."});
            } else {
              res.json({
                success: true,
                response: {
                  post: post,
                  token: 
                }
              })
            }
          });
        }
      })
    }
  });
})

module.exports = router;
