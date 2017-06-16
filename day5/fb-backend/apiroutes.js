//here we define routes.

var express = require('express');
var _ = require('underscore');
var router = express.Router(); //this is able to handle get, etc requests.
// var models = require('./models/models');
var User = require('./models/models').User; //so we can use our mongoose models
var Token = require('./models/models').Token;
var Post = require('./models/models').Post;

router.get('/', function(req, res){
  res.send({message: 'hello'});
});

router.post('/users/register', function(req, res){ //the api doc specifies what params will be sent to us
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(err, user){
    if(err){
      res.json({failure: 'database error'});
    }else{
      res.json({success: true});
    };
  });

});

router.post('/users/login', function(req, res){ //will receive a token, this will be used later for anything requiring authentication
  // var authuser =
  User.findOne({email: req.body.email, password: req.body.password},function(err, user){

    //rec.body wont work as a parameter because then user could assign random stuff
    if(err){
      console.log(err);
      res.json({error: "Database error"})
    }
    else if(!user){
      res.json({error: "Wrong username or password"})
    }
    else{
        var date = new Date();
        var newToken = new Token({
          userId: user._id,
          token: user.email + date,
          createdAt: date
        });
        newToken.save(function(err){
          if(err){
            console.log(err);
            res.json({failure: 'Save failed.'})
          }else{
            res.json({
              success: true,
              response:{
                id: newToken.userId,
                token: newToken.token
              }
            })
          }
        })
        }
    });
});

router.get('/users/logout', function(req, res){
  var token = req.query.token
  Token.remove({token: token},function(err, user){
    if(err){
      console.log(err);
      res.json({error: "Database error"})
    }
    else{
      res.json({success:true});
    }
  });
});

router.get('/posts/', function(req, res){
  Token.findOne({token: req.query.token}, function(err, token){
    if(err){
      console.log(err);
      res.json({error: "Database error"})
    }
    else if(!token){
      res.json({error: "Fuck you"})
    }
    else{
      Post.find(function(err, posts){
        if(err){
          console.log(err);
          res.json({error: "Database error"})
        }else{
          res.json({
            success: true,
            response: posts
          })
        }
      });
        }
    });
});

router.post('/posts/', function(req, res){
  var newPost = new Post({
    token: req.body.token,
    content: req.body.content
  });
  newPost.save(function(err, post){
    if(err){
      res.json({failure: 'database error'});
    }else{
      res.json({success: true});
    };
  });
});

router.post('/posts/comments/:post_id', function(req, res){
  var id = req.params.post_id;
  console.log("THIS IS THE ID ", id);
  // Token.findOne()
  Token.findOne({token: req.query.token}, function(err, token){
    if(err){
      console.log(err);
      res.json({error: "Database error"})
    }
    else if(!token){
      res.json({error: "Fuck you"})
    }
    else{


      Post.findOne({_id: id}, function(err, post){
        if(err){
          console.log(err);
          res.json({error: "Database error"})
        }
        else if(!post){
          res.json({error: "Fuck you again"})
        }
        else{
          var edit = post;
          edit.comments.push(req.body.content);
          edit.save(function(err){
            if(err){
              console.log(err);
              res.json({error: "Database error"});
            }else{
              res.json({success: true})
            };
          });
        };
      });
    }
  });
});

  router.get('/posts/comments/:post_id', function(req, res){
    Token.findOne({token: req.query.token}, function(err, token){
      if(err){
        console.log(err);
        res.json({error: "Database error"})
      }
      else if(!token){
        res.json({error: "Fuck you"})
      }
      else{
        Post.findOne({_id: req.params.post_id},function(err, post){
          if(err){
            console.log(err);
            res.json({error: "Database error"})
          }else{
            res.json({
              success: true,
              response: post
            })
          }
        });
          }
      });
  });

  router.get('/posts/likes/:post_id', function(req, res){
    Token.findOne({token: req.query.token}, function(err, token){
      if(err){
        console.log(err);
        res.json({error: "Database error"})
      }
      else if(!token){
        res.json({error: "Fuck you"})
      }
      else{
        Post.findOne({_id: req.params.post_id},function(err, post){
          if(err){
            console.log(err);
            res.json({error: "Database error"})
          }else{
            User.findOne({_id: token._id},function(err, user){
              if(err){
                console.log(err);
                res.json({error: "Database error"})
              }else{
                var edit = post;
                var liker user;
                edit.likes.push(liker);
                edit.save(function(err){
                  if(err){
                    console.log(err);
                    res.json({error: "Database error"});
                  }else{
                    res.json({success: true})
                  };
                });
          }
          }
        });
          }
      });
  });





module.exports = router;








//
