"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var User = require('./models/user').User;
var Token = require('./models/token').Token;
var Post = require('./models/post').Post;

router.post('/api/users/register',function(req,res){
  var user = new User ({
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    password : req.body.password
  })
  user.save(function(err){
    if(err){
      req.status(500).json(err)
    }else{
      res.json({user:user});
    }
  });
});

router.post('/api/users/login',function(req,res){
  console.log(req);
  console.log(req.body.password)
  User.findOne({email:req.body.email,password:req.body.password},function(err,user){
    if(err)  err;
    else{
      console.log(user);
      var token = new Token({
        userId: user.email,
        token: user.email + d.toString(),
        createdAt: new Date()
      })
      token.save(function(err){
        if(err) throw err;
        else{
          res.json({token:token})
        }
      })
    }
  })
});
router.post('/api/users/logout', function(req,res){
  console.log('logout');
  Token.findOne({token: req.body.token}, function(err,token){
    if(err) throw err;
    else{
      token.remove({token: token}, function(err){
        if(err) throw err
        else{
          res.json({token:token})
        }
      })
    }
  })
})

router.get('/api/posts', function(req,res){
  Post.find().sort({_id: -1}).limit(10).exec(function(err,posts){
    if(err) throw err;
    else{
      res.json(posts);
    }
  })
})

router.get('/api/posts/:numberOfPosts', function(req,res){
  Post.find().sort({_id: -1}).limit(req.query.numberOfPosts).exec(function(err,posts){
    if(err) throw err;
    else{
      res.json(posts);
    }
  })
})


router.post('/api/posts', function(req,res){

  var data = req.body;
  var d = new Date();
  if(data.content === '') res.json('no content provided');
  Token.findOne({token:data.token}, function(err,token){
    if(err) throw err;
    else{
    User.findOne({email:token.userId},function(err,user){
      if(err) throw err;
      else{
      var post = new Post({
        poster:{
          name: user.fname + " " + user.lname,
          id: user._id
        },
        content: data.content,
        createdAt: d.toString(),
        comments: [],
        likes: []
      });
      post.save(function(err){
        if(err) throw err
        else{
          res.json({post:post});
        }
      });
    }
  });
  }
});
});

router.get('/api/posts/comment/:id',function(req,res){
  console.log('post')
  Post.findOne({_id: req.query.id},function(err,post){
    if(err) throw err;
    else{
      if(post.comments.length === 0) res.json('no comments')
      else{for(var i=0;i<post.comments.length;i++){
        res.json(post.comments);

      }
      }
    }
  })
})

router.post('/api/posts/comment/:id', function(req,res){
  var comment = {
    "createdAt": new Date(),
    "content": req.body.content,
    "poster": {
      "name": String,
      "id": String
    }
  }
  Token.findOne({token:req.body.token},function(err,token){
    if(err) throw err
  User.findOne({email: token.userId}, function(err,user){
    if(err) throw err;
    else{
      console.log(user);
      comment.poster.name = user.fname + ' ' + user.lname;
      comment.poster.id = user._id;
      Post.findOne({_id: req.params.id}, function(err,post){
        post.comments.push(comment);
        post.save(function(err){
          if(err)throw err;
          res.json(post);
        })
      })
    }
  })
})
})



module.exports = router;
