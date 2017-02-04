"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var strftime = require('strftime');
var validate = require('express-validator');
var user = require('/models/user.js').user;
var token = require('/models/token.js').token;
var post = require('/models/post.js').post;

router.post('/api/users/login', function(req, res) {
  user.findOne({email: req.body.email}, function(err, obj) {
    if (err) {
      console.log(err);
    } else {
      var tok = new token({
        userId: obj._id,
        token: obj.email + new Date(),
        createdAt: new Date()
      });
      tok.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          obj.token = tok;
          obj.save();
          res.sendStatus(200);
        }
      })
    }
  })
})

router.post('/api/users/logout', function(req, res) {
   token.find({token: req.body.token.token}, function(err, tok) {
     if (err) {
       console.log(err);
     } else {
       user.findOne({token: req.body.token}, function(err, obj) {
         if (err) {
           console.log(err);
         } else {
           obj.token = null;
           obj.save();
         }
       }
       tok.remove(function(err) {
         if (err) {
           console.log(err);
         } else {
           res.sendStatus(200);
           res.render('/');
         }
       });
     }
   })
})

GET /api/users/login
POST /api/users/login
POST /api/users/logout
POST /api/users/register

router.get('/api/users/login', function(req, res) {
  res.sendStatus(401);
})

router.post('/api/users/register', function(req, res) {
  validate(req);
  user.findOne({email: req.body.email}, function(err, something) {
    if (err) {
      var newUser = new user({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        token: null
      })
      newUser.save(function(err, obj) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: true,
            response: newUser
          })
        }
      })
    } else {
      res.sendStatus(400);
    }
  })
})

function validate(req) {
  req.checkBody('fname', 'title gone').notEmpty();
  req.checkBody('lname', 'goal gone').notEmpty();
  req.checkBody('email', 'start gone').notEmpty();
  req.checkBody('password', 'end gone').notEmpty();
}

// var token = mongoose.model('token', {
//     userId: String,
//     token: String,
//     createdAt: Date
// });
//
// var token = mongoose.model('token', {
//     fname: String,
//     lname: String,
//     email: String,
//     password: String,
//     token: Object
// });

router.get('/api/posts/', function (req, res) {

  //need to check the user
  post.find().limit(10, function(err, obj) {
    if (err) {
      res.sendStatus(400);
    } else {
      res.json({success: true, response: obj});
      })
    }
  })
})

// {
//   "success": true,
//   "response": [
//     {
//       "_id": "588afdbd7f87100011bce3f6",
//       "poster": {
//         "id": "588ab0967f87100011bce3f1",
//         "name": "prath desai"
//       },
//       "content": "testing123",
//       "createdAt": "2017-01-27T07:58:53.757Z",
//       "__v": 0,
//       "comments": [],
//       "likes": []
//     }
//   ]
// }

router.get('/api/posts/:x', function(req, res) {
  //you SHOULD check if there are < 20 for :2 just as you would in /posts/
  post.find().skip((parseInt(req.params) - 1) * 10)).limit(10, function(err, obj) {
    if (err) {
      res.sendStatus(400);
    } else {
      res.json({success: true, response: obj});
      })
    }
  })
})

router.post('/api/posts/', function(req, res) {
  validate2(req);
  token.findOne({token: req.body.token.token}, function(err, obj) {
    if (err) {
      res.sendStatus(401);
    } else {
      user.findOne({_.id : req.body.token.userId}, function(err, obj) {
        if (err) {
          res.sendStatus(401);
        } else {
          var post = new post({
            poster: {
              name: obj.fname + obj.lname,
              id: obj._id
            },
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: new Date()
          });
          post.save(function(err) {
            if (err) {
              res.sendStatus(401);
            }
          });
        }
      })
    }
  })
  {
    "token": String, // AUTH_TOKEN
    "content": String // The text content of the new post.
  }
})

function validate2(req) {
  req.checkBody('token', 'token gone').notEmpty();
  req.checkBody('content', 'goals gone').notEmpty();
}


GET /api/posts/
GET /api/posts/:x
POST /api/posts/
GET /api/posts/comments/:id
POST /api/posts/comments/:id
GET /api/posts/likes/:id


module.exports = router;
