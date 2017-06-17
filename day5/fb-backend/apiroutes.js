var express = require('express');
var router = express.Router();
var model = require('./models/models');

var Post = model.Post;
var Token = model.Token;
var User = model.User;

router.post('/users/register', function(req, res){
  var user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });

  user.save('User', function(err, user){
    if(err){
      console.log(err);
    }
    else {
      res.json({succes: true, created: user});
    }
  })
});

router.post('/users/login/', function(req, res){
  User.findOne({ email: req.body.email, password: req.body.password }, function(err, user){
    if(err){
      console.log(err);
    }
    else{
      var date = new Date();
      var toke = new Token({
        userId: user._id,
        token: user.email + date,
        createdAt: date
      });

      curToken = user.email + date;

      toke.save('Token', function(err){
        if(err){
          console.log(err);
        }
        else{
          res.json({
            success: true,
            created: toke
          });
        }
      });
    }
  });
});

router.post('/users/logout/', function(req, res){
  Token.findOneAndRemove({token: req.body.token}, function(err, user){
    if (err) {
      console.log(err);
    }
    else{
      res.json({
        success: true,
        removed: user
      });
    }
  });
});

router.get('/posts/:num', function(req, res){
  var num = req.params.num;
  var list = [];
  Token.findOne({token: req.query.token}, function(err, toke){
    if(err){
      console.log(err);
    }
    else{
      Post.find({},function(err, posts){
        if(err){
          console.log(err);
        }
        else{
          for(var i = 0; i < 10; i++){
            list.push(posts[(num-1)*10 + i])
          }
          res.json({success: true, newsfeed: list});
        }
      });
    }
  });
});

router.get('/posts/', function(req, res){
  var num = 1;
  var list = [];
  Token.findOne({token: req.query.token}, function(err, toke){
    if(err){
      console.log(err);
    }
    else{
      Post.find({},function(err, posts){
        if(err){
          console.log(err);
        }
        else{
          for(var i = 0; i < 10; i++){
            list.push(posts[(num-1)*10 + i])
          }
          res.json({success: true, newsfeed: list});
        }
      });
    }
  });
});

router.post('/posts/', function(req, res){
  Token.findOne({token: req.body.token}, function(err, toke){
    if(err){
      console.log(err);
    }
    else{
      User.findOne({_id: toke.userId}, function(err, user){
        if(err){
          console.log(err);
        }
        else{
          var curDate = new Date();
          var post = new Post({
            poster: user,
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: curDate
          });
        }

        post.save('Post', function(err){
          if(err){
            console.log(err);
          }
          else{
            res.json({success: true, posted: post});
          }
        });
      });
    }
  });
});

router.get('/posts/comments/:postid', function(req, res){
  Token.find({token: req.query.token}, function(err, toke){
    if(err){
      console.log(err);
    }
    else{
      Post.findOne({_id: req.params.postid}, function(err, post){
        if(err){
          console.log(err);
        }
        else{
          res.json({success: true, comments: post.comments});
        }
      });
    }
  });
});

router.post('/posts/comments/:postid', function(req, res){
  Token.findOne({token: req.body.token}, function(err, toke){
    if(err){
      console.log(err);
    }
    else{
      User.findOne({_id: toke.userId}, function(err, user){
        if(err){
          console.log(err);
        }
        else{
          Post.findOne({_id: req.params.postid}, function(err, post){
            if(err){
              console.log(err);
            }
            else{
              console.log(user);
              var date = new Date();
              var comment = {
                createdAt: date,
                content: req.body.content,
                poster: {
                  name: user.fname + " " + user.lname,
                  id: user._id
                },
              }
              post.comments.push(comment);
              post.save('Post', function(err){
                if(err){
                  console.log(err);
                }
                else{
                  res.json({success: true, comments: post.comments, added: comment})
                }
              });
            }
          });
        }
      });
    }
  });
});

router.get('/posts/likes/:postid', function(req, res){
  Token.findOne({token: req.query.token}, function(err, toke){
    if(err){
      console.log(err);
    }
    else{
      Post.findOne({_id: req.params.postid}, function(err, post){
        if(err){
          console.log(err);
        }
        else{
          res.json({success: true, likes: post.likes});
        }
      });
    }
  });
});


module.exports = router;
