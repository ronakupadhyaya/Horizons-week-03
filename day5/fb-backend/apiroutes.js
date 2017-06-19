var express = require('express');
var router = express.Router() // allows you to accept POST GET requests
var models = require('./models/models')

router.get('/', function(req, res) {
  res.send({
    message: 'hello'
  })
})

var User = models.User;
var Token = models.Token;
var Post = models.Post;

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
        failure: "database error"
      })
    } else {
      res.json({
        success: true
      })
    }
  })
})

// logins user and assign a token for accessing other parts of site
router.post('/users/login', function(req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, '_id email', function(error, foundUser) {
    if (error) {
      console.log('database did not find a user with that criteria');
    } else {
      var newToken = new Token({
        userId: foundUser._id,
        token: foundUser.email + new Date()
          .toUTCString(),
        createdAt: new Date()
      });
      newToken.save(function(err, newToken) {
        if (err) {
          res.json({
            error: "login failed"
          });
        } else {
          res.json({
            "success": true,
            "response": {
              "id": newToken.userId,
              "token": newToken.token
            }
          });
        }
      })
    }
  })
})

// logsout user and removes token to preven further use across site
router.get('/users/logout', function(req, res) {
  Token.findOneAndRemove({
    token: req.query.token
  }, function(error, removedToken) {
    if (error) {
      console.log("Error: token was not found.");
    } else if (removedToken) {
      console.log('Removed token', removedToken);
      res.json({
        success: true
      })
    } else {
      res.json({
        error: "User did not login"
      }) // found null
    }
  })
})

//Displaying the Posts, if specified, display a certain number
router.get('/posts/:page', function(req, res) {
  Token.findOne({
    token: req.query.token
  }, function(error, foundToken) {
    if (error) {
      console.log("Error getting posts");
    } else if (foundToken) {
      Post.find(function(error, postArr) {
        if (error) {
          console.log("Error finding posts");
        } else {
          var responseArr = [];
          var newPostArr = [];
          if (req.params.page) {
            var n = parseInt(req.params.page);
            newPostArr = postArr.slice(10 * (n - 1), 10 * n);
          } else {
            newPostArr = postArr.slice(0, 10);
          }
          newPostArr.forEach(function(post) {
            responseArr.push({
              "_id": post._id,
              "poster": post.poster, //poster is an object from post model
              "content": post.content,
              "createdAt": post.createdAt,
              "comments": post.comments,
              "likes": post.likes
            });
          });
          res.json({
            success: true,
            response: responseArr
          });
        }
      });
    } else {
      res.json({
        error: "Failed to query posts"
      });
    }
  })
});

router.post('/posts', function(req, res) {
  Token.findOne({
    token: req.query.token
  }, function(error, foundToken) {
    if (error) {
      console.log("Error posting post");
    } else if (foundToken) {
      //validated
      User.findOne({
        _id: foundToken.userId
      }, 'fname lname _id', function(error, foundUser) {
        if (error) {
          console.log("Error finding user");
        } else if (foundUser) {
          var newPost = new Post({
            "poster": {
              name: foundUser.fname + " " + foundUser.lname,
              id: foundUser._id
            }, //poster is an object from post model
            "content": req.body.content,
            "createdAt": new Date(),
            "comments": [],
            "likes": []
          });

          newPost.save(function(error, savedPost) {
            if (error) {
              console.log("error saving new post")
            } else {
              res.json({
                success: true,
                response: savedPost
              });
            }
          });
        } else {
          res.json({
            error: "Token cannot be verified"
          });
        }
      });
    } else {
      res.json({
        error: "No post content"
      });
    }
  })
})
module.exports = router; // allows the app.js file to access code above
module.exports = router; // allows the app.js file to access code above
