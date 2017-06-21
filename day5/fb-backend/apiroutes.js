var express = require('express');
var router = express.Router();

var models = require('./models/models');
var User = models.User;
var Token = models.Token;
var Post = models.Post;

router.get('/', function(req, res) {
  res.send({message: 'hello'})
})




router.post('/users/register', function(req, res) {
  var newUser = new User ({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })

  newUser.save(function(err) {
    if(err) {
      res.json({failure: "database error"})
    } else {
      res.json({success: true})
    }
  })
})

router.post('/users/login', function (req, res) {
  console.log(req.body);
  User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
    console.log(user)
    if(err)
      console.log('Username and password combination are not found.')
    else {
      var newToken = new Token ({
        userId: user._id,
        token: user.email + new Date(),
        createdAt: new Date()
      })

      newToken.save(function(err) {
        res.json({
          "success": true,
          "response": {
            "id": newToken.userId,
            "token": newToken.token
          }
        })
      })
    }
  })
})

router.get('/users/logout', function (req, res) {
  console.log(req.query.token)
  Token.findOne({token: req.query.token}, function (err, token) {
    console.log(token)
    if (err) {
      console.log("Error");
    }else {
      token.remove(function(err) {
        if (err)
          console.log("Error")
        else {
          res.json({"success": true})
        }
      })
    }
  })
})

router.post('/posts', function (req, res) {
  console.log(req)
  Token.findOne({token: req.body.token}, function(err, token) {
    User.findById(token.userId, function(err, user) {
      if (err)
        console.log(err)
      else {
        var newPost = new Post ({
          poster: {
            name: user.fname + " " + user.lname,
            id: user._id
          },
          content: req.body.content,
          createdAt: new Date()
        })
        newPost.save(function(err) {
          if (err)
            console.log(err)
          else {
            res.json({
              "success": true,
              "response": newPost
            })
          }
        })
      }
    })
  })
})

router.get('/posts/:page', function(req, res) {
  Post.find({}, function (err, arr) {
    if (err)
      console.log("Error");
    else {
      var arr2 = arr.sort(function(a, b) {
        return a.createdAt - b.createdAt;
      })
      arr3 = arr2.slice(0, 10);
      res.json({
        "success": true,
        "response": arr3
      })
    }
  })
})


router.get('/posts/comments/:post_id', function(req, res) {
  Post.findById(req.params.post_id, function(err, post) {
    if (err)
      console.log("Error")
    else {
      res.json({
        "success": true,
        "response": post.comments
      })
    }
  })
})

router.post('posts/comments/:post_id', function(req, res) {
  var name;
  var id;
  Token.findOne({token: req.body.token}, function(err, token) {
    User.findById(token.userId, function(err, user) {
      if (err)
        console.log(err)
      else {
        name = user.fname + " " +user.lname;
        id = user._id;
      }
    })
  })
  Post.findById(req.params.post_id, function(err, post) {
    if (err)
      console.log("Error")
    else {
      post.comments.push({
        "createdAt": new Date (),
        "content": req.body.content,
        "poster": {
          "name": name,
          "id": id
        }
      })
      post.save(function(err) {
        if (err)
          console.log(err)
        else {
          res.json({
            "success": true,
            "response": post
          })
        }
      })
    }
  })
})

module.exports = router;
