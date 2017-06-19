var express = require('express');
var router = express.Router();
var models = require('./models/models');
var User = models.User;
var Token = models.Token;
var Post = models.Post;


router.get('/', function(req, res){
  res.json({message: 'hello'});
});

router.post('/users/register', function(req, res){
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(err, user){
    if(err){
      res.json({failure: "database error"});
    } else {
      res.json({success: true});
    }
  });
});

router.post('/users/login', function(req, res){
  User.findOne({email: req.body.email}, function(err, found){
    if(err){
      res.json({error: "Login failed"});
      console.log(found);
    } else {
      var now = new Date();
      if(found.password === req.body.password){
        var token = found.fname+ Date.parse(now.toString()) ;
        var newToken = new Token({
          userId: found.id,
          token: token,
          createdAt: now
        });
        newToken.save(function(err, user){
          if(err){
            res.json({failure: "database error"});
          } else {
            res.json({success: true});
          }
        });
        res.json({
          success: true,
          response: {
            id: found.id,
            token: token
          }
        });
      } else {
        res.json({error: "Invalid password"});
        console.log(found);
      }
    }
  });
});

router.get('/users/logout', function(req, res){
  var token = req.query.token;
  Token.find({token: token}, function(error, found){
    if(error){
      res.json({error:"Error"});
    } else {
      res.json({success:true});
    }
  }).remove();
});

router.get('/posts', function(req, res){
  var token = req.body.token;
  Post.find({}).sort({createdAt: 1}).exec(function(err, array){
    if(err){
      res.json({error: "database error"});
    } else {
      array.forEach(function(item, index){
          res.json({
            success: true,
            response{
              _id: item.id,
              name: item.poster.fname + " " + item.poster.lname
            },
            content: item.content,
            createdAt: item.createdAt,
            comments: { item.comments.forEach(function(comment, ind){
              createdAt: comment.createdAt,
              content: comment.content,
              poster: {
                name: comment.poster.fname + " " + comment.poster.lname,
                id: comment.poster.id
              });
              },
              likes: {

              }
            }
          });

      });
    }
  })
});

router.get('/posts/:page', function(req, res){

});

router.post('/posts', function(req, res){
  var token = req.query.token;
  var content = req.body.content;

  if(!token){
    res.json({error:"No token supplied"});
  } else {
    Token.findOne({token: token}, function(err, found){
      var user = found.userId;
      if(err){
        res.json({error:"Token cannot be verified"});
      } else {
        User.findById(user, function(err2, found2){
          if(err2){
            res.json({error:"user not found"})
          } else {
            var now = new Date();
            var newPost = new Post({
              poster: found2,
              content: content,
              likes: [],
              comments: [],
              createdAt: now
            });
            newPost.save(function(err, success){
              if(err){
                res.json({error:"database error"});
              } else {
                console.log(newPost);
                res.json({
                  success: true,
                  response: {
                    _id: newPost.id,
                    poster:{
                      id: user,
                      name: newPost.poster.fname + " " + newPost.poster.lname
                    },
                    content: content,
                    createdAt: now,
                    comments: [{
                      createdAt: undefined,
                      content: undefined,
                      poster: {
                        name: undefined,
                        id: undefined
                      },
                      likes:[{
                        id: undefined,
                        name: undefined
                      }]
                    }]
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

router.get('/posts/comments/:post_id', function(req, res){

});

router.post('/posts/comments/:post_id', function(req, res){

});

router.get('/posts/likes/:post_id', function(req, res){

});

module.exports = router;
