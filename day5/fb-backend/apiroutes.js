var express = require('express');
var router = express.Router();
var models = require('./models/models')
var User = models.User;
var Token = models.Token;
var Post = models.Post;

router.get('/', function(req, res){
  res.json({message: 'hello'});
})

router.post('/users/register', function(req, res){
  var newUser = new User ({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  newUser.save(function(err,user) {
    if (err) {
      res.json({failure: "database error"});
    } else {
      res.json({success: true}); // asynchronous so context must be in same area as of error
    }
  })
})

router.post('/users/login', function(req, res){
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      console.log('Error: This user registration doesn\'t exist.')
    } else if (user.email !== req.body.email || user.password !== req.body.password) {
      console.log('Error: Email and/or password are not correct!')
    } else {
      var newToken = new Token ({
        userId: user._id,
        token: req.body.email + new Date(),
        createdAt: new Date()
      })
      newToken.save(function(err, token) {
        if (err) {
          res.json({failure: "token creation error!"})
        } else {
          res.json({
            success: true,
            response: {
              id: newToken.userId,
              token: newToken.token
            }
          })
        }
      })
    }
  })
})

router.post('/users/logout', function(req, res){
  if (req.body.token) {
    Token.remove({token: req.body.token}, function(err, response){
      if (err) {
        if (req.body.token === null) {
          console.log("Error 400: Failed to supply token")
        }
        console.log('This token does not exist!')
      } else {
        console.log('Successful logout!')
        // console.log(response)
        res.json({
          success: true
        })
      }
    })
  } else {
    console.log('This token does not exist')
  }
})

// router.get('/posts/:page', function(req, res){
//   if (req.params.page) {
//     Post.
//   }
// })

router.post('/posts', function(req, res){
  Token.findOne({token: req.body.token}, function(err, token) {
    if (!req.body.token) {
      console.log('Error 400: Failed to supply token')
    } else {
      User.findOne({user: req.body.user}, function(err, user){
        var newPost = new Post ({
          poster: user.fname + " " + user.lname,
          content: req.body.content,
          createdAt: new Date()
        })
        newPost.save(function(err, post) {
          if (err) {
            if (!post) {
              res.json({failure: "No post content"})
            }
          } else {
            res.json({
              success: true,
              response: {
                poster: {
                  name: newPost.poster,
                  id: user._id
                },
                content: newPost.content,
                createdAt: newPost.createdAt,
                _id: newPost._id,
                comments: [],
                likes: []
              }
            })
          }
        })
      })
    }
  })
})

router.get('/posts', function(req, res) {
  var page = req.params.page || 1
  if (req.query.token) {
    Token.findOne({token: req.query.token}, function(err, token) {
      Post.find(function(err, posts) {
        if (err) {
          res.json({failure: "Failed to query posts"})
        } else {
        posts.forEach(function(x){
          res.json({
            success: true,
            response: [
              {
                _id: x.id,
                poster: {
                  id: x.name,
                  name: x.name
                },
                content: x.content,
                createdAt: x.createdAt,
                comments: x.comments,
                likes: x.likes
              }
            ]
            })
          })
        }
      })
    })
  } else if (!req.query.token) {
    res.json({failure: "Failed to supply token"})
  } else if (req.query.token !== req.body.token) {
    res.json({failure: "Token cannot be verified"})
  }
})

// router.post('/posts/comment/:post_id', function(req, res){
//   Token.findOne({token: req.body.token}, function(err, token) {})
//     Post.findOne({post: req.params.post_id}, function(err, post) {
//       post.comments.push(req.body.content)
//     })
//   // User.findOne({user: req.body.user}, function(err, user) {
//   //   if (err) {
//   //     if (user.token !== req.body.token) {
//   //       res.json({failure: ""})
//   //     }
//   //     res.json({failure: "Token is not supplied"})
//   //   }
//   // })
//   //
//   // Post.findOne({post: req.body.post.comment})
// })
module.exports = router;
