var express = require('express');

var router = express.Router();
var models = require('./models/models')
var User = models.User;
var Token = models.Token;
var Post = models.Post;
var bcrypt = require('bcryptjs');
const saltRounds = 10;

router.get('/', function(req, res){
  var originalPass = "password";
  

  bcrypt.hash(originalPass, saltRounds, function(err, hash) {
  
  });
});

router.post('/users/register', function(req, res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    var newUser = new User({
     fname: req.body.fname,
     lname: req.body.lname,
     email: req.body.email,
     password: hash
   });

  newUser.save(function(err, usr){
     if(err){
       res.json({failure: "database error"})
     }
     else{
       res.json({success: true})
     }
   });
  });


   

})


router.post('/users/login', function(req, res){
   User.find({email: req.body.email}, function(err, users) {
    bcrypt.compare(req.body.password, users[0].password, function(err, authenticated) {
      if (authenticated) {
        if (!err && users.length != 0) {
          var tokenString = users[0]._id + new Date().toISOString();
          var tokenInfo = {
            "userId": users[0]._id,
            "token":tokenString,
            "createdAt": new Date().toISOString()
          };
          var token = new Token(tokenInfo);

          token.save(function(err, tkn) {
            if (!err) {
              var response = {
                "success": true,
                "response": {
                  "id": users[0]._id,
                  "token": tokenString
                }
              };

              res.json(response);
            }
            else {
              res.status(500).json({"error":"Failed to save Token"});
            }
          })
        } 
      } else {
        res.status(301).json({"error":"Login Info incorrect"});
      }
    });

    

   })
})

router.post("/users/logout", function(req, res) {
  if (!req.body.token) {
    res.status(400).json({"error":"Failed to supply token"});
  } else {
    Token.remove({token:req.body.token}, function(err, tkn) {
      if (!err && !tkn) {
        res.json({"success":true});
      } else {
        res.status(401).json({"error":"User not logged in"})
      }

    });
  }
})

router.get("/posts/:page", function(req, res) {
  if(!req.query.token) {
    res.json({"error":"Failed to provide Token"});
  } else {
    Token.find({token:req.query.token}, function(err, token) {
      if (!err && token.length != 0) {
        Post.find(function(err, posts) {
          var first = 0 + (10*(req.params.page - 1));
          var second = 10 + (10*(req.params.page - 1));
          var postToSend = posts.slice(first,second);
          res.json({"success":"true",
            "response":postToSend});
        })
      } else {
        res.json({"error":"CannotDecodeToken"});
      }
      
    })
  }
  
});

router.get("/posts", function(req, res) {
  if(!req.query.token) {
    res.json({"error":"Failed to provide Token"});
  } else {
    Token.find({token:req.query.token}, function(err, token) {
      if (!err && token.length != 0) {
        Post.find(function(err, posts) {
          var postToSend = posts.slice(0,10);
          res.json({"success":"true",
            "response":postToSend});
        })
      } else {
        res.json({"error":"CannotDecodeToken"});
      }
      
    })
  }
});

router.post("/posts", function(req, res) {
  if (!req.body.content) {
    res.json({"error":"No Post Content"});
  } else if(!req.body.token) {
    res.json({"error":"Failed to provide Token"});
  } else {
    Token.find({token:req.body.token}, function(err, token) {
      if (!err && token.length != 0) {
        User.find(function(err, users) {
        })
        User.findById(token[0].userId, function(err, user) {
          if (!err) {
            var newPost = new Post({
              poster: {
                name: user.fname + " " + user.lname,
                id: user._id},
              content: req.body.content,
              likes: [],
              comments: [],
              createdAt: new Date().toISOString()
            })
            newPost.save();

            res.json({
              success:"true",
              response: newPost
            });
          }
        })
      } else {
        res.json({"error":"CannotDecodeToken"});
      }
      
    })
  }

  
  
})


router.post("/posts/comments/:post_id", function(req, res) {
  if (!req.body.content) {
    res.json({"error":"No Comment Content"});
  } else if(!req.body.token) {
    res.json({"error":"Failed to provide Token"});
  } else {
    Token.find({token:req.body.token}, function(err, token) {
      if (!err && token.length != 0) {
        User.find(function(err, users) {
        })
        User.findById(token[0].userId, function(err, user) {
          if (!err) {
            var newcomment ={
              poster: {
                name: user.fname + " " + user.lname,
                id: user._id},
              content: req.body.content,
              createdAt: new Date().toISOString()
            };
            
            Post.findById(req.params.post_id, function(err, post) {
              post.comments.push(newcomment);
              post.save();

              res.json({
                success:"true",
                response: post
              });
            })
          }
        })
      } else {
        res.json({"error":"CannotDecodeToken"});
      }
      
    })
  }  
})


router.get("/posts/comments/:post_id", function(req, res) {
  if(!req.query.token) {
    res.json({"error":"Failed to provide Token"});
  } else {
    Token.find({token:req.query.token}, function(err, token) {
      if (!err && token.length != 0) {
        Post.findById(req.params.post_id, function(err, posts) {
          if (!err && posts.length != 0) {
            
              res.json({
                success:"true",
                response: posts.comments
              });
          }
        })
      } else {
        res.json({"error":"CannotDecodeToken"});
      }
      
    })
  }  
})

router.get("/posts/likes/:post_id", function(req, res) {
  if(!req.query.token) {
    res.json({"error":"Failed to provide Token"});
  } else {
    Token.find({token:req.query.token}, function(err, token) {
      if (!err && token.length != 0) {
        Post.findById(req.params.post_id, function(err, posts) {
          if (!err && posts.length != 0) {
            
              res.json({
                success:"true",
                response: posts.likes
              });
          }
        })
      } else {
        res.json({"error":"CannotDecodeToken"});
      }
      
    })
  }  
})
















module.exports = router;