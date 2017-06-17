var express = require('express')
var router = express.Router()
var TokenGenerator = require('rand-token')
//can accept get requests and run callbacks
//but it cannot create a Server

var models = require('./models/models');
var User = models.User;
var Token = models.Token;
var Post = models.Post;

router.get('/',function(req,res){
  res.send({
    message: 'hello'
  })
})

router.post('/api/users/register',function(req,res){
  User.find({'email': req.body.email},function(err,user){
    if(user.length<=0){
      var userObj = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
      });
      userObj.save(function(err){
        if(err){
          res.json(err)
        }
        else{
          res.json({
            "success": true
          })
        }
      })
    }
    else {
      res.send("Email address already exists")
    }
  })
})



router.post('/api/users/login',function(req,res){
  User.findOne(
    {'email':req.body.email,
    'password':req.body.password},
    function(err,user){
      if(err){
        res.json({
        "error": "Login failed."})
      }
      else{
        var userId = user._id;
        var tokenObj = new Token({
          userId: userId,
          token: TokenGenerator.generate(16),
          createdAt: new Date()
        });
        tokenObj.save(function(err){
          if(err){
            res.json(err)
          }
          else{
            res.json({
                "Success": true,
                "response":{
                  "id": tokenObj.userId,
                  "token": tokenObj.token
                }
              })
          }
        })
      }
  })
})


router.get('/api/users/logout',function(req,res){
  Token.remove(
    {token: req.query.token},
    function(err){
      if(err){
        res.json(err)
      }
      else{
        res.json({
          "success": true
        })
      }
    })
})

router.get('/api/posts',function(req,res){
  Token.find(
    {token: req.query.token},
    function(err,t){
      if(err){
        res.json(err)
      }
      else{
        Post.find().sort('createdAt').exec(function(err,pArr){
          if(err){
            res.json(err)
          }
          else{
            var posts = pArr.slice(0,10);
            res.json({
              "success": true,
              "response": posts
            })
          }
        })
      }
    }
  )
})

router.get('/api/posts/:page',function(req,res){
  var numPage = parseInt(req.params.page) * 10
  Token.find(
    {token: req.query.token},
    function(err,t){
      if(err){
        res.json(err)
      }
      else{
        Post.find().sort('createdAt').exec(function(err,pArr){
          if(err){
            res.json(err)
          }
          else{
            var posts = pArr.slice(0,numPage);
            res.json({
              "success": true,
              "response": posts
            })
          }
        })
      }
    }
  )
})

router.post('/api/posts',function(req,res){
  Token.findOne(
    {token: req.body.token},
    function(err,t){
      if(err){res.json(err)}
      else{
        User.findById(
          t.userId,
          function(err,user){
            if(err){res.json(err)}
            else{
              var poster = {
                id: user._id,
                name: user.fname+' '+user.lname
              }
              var postObj = new Post({
                "poster": poster,
                "content": req.body.content,
                "createdAt": new Date(),
                "comments": [],
                "likes": []
              })
              postObj.save(function(err){
                if(err){res.json(err)}
                else{
                  res.json({
                    "success": true,
                    "response": {
                      "poster": poster,
                    "content": postObj.content,
                    "createdAt": postObj.createdAt,
                    "_id": postObj._id,
                    "comments": [],
                    "likes": []
                    }
                  })
                }
              })
            }
          }
        )
      }
    }
  )
})

router.get('/api/posts/comments/:post_id',function(req,res){
  Token.findOne(
    {token: req.query.token},
    function(err,t){
      if(err){res.json(err)}
      else{
        Post.findById(
          req.params.post_id,
          function(err,post){
            if(err){res.json(err)}
            else{
              res.json({
                "success": true,
                "response": post.comments
              })
            }
          }
        )
      }
    }
  )
})


router.post('/api/posts/comments/:post_id',function(req,res){
  Token.findOne(
    {token: req.body.token},
    function(err,t){
      if(err){res.json(err)}
      else{
        User.findById(
          t.userId,
          function(err,user){
            if(err){res.json(err)}
            else{
              var poster = {
                id: user._id,
                name: user.fname+' '+user.lname
              }
              Post.findById(
                req.params.post_id,
                function(err,post){
                  if(err){res.json(err)}
                  else{
                    var comment = {
                      "poster": poster,
                      "content": req.body.content,
                      "createdAt": new Date()
                    }
                    post.comments.push(comment);
                    post.save(function(err,p){
                      if(err){res.json(err)}
                      else{
                        res.json({
                          "success": true,
                          "response": p
                        })
                      }
                    })
                  }
                }
              )
            }
          })
        }
      })
})


router.get('/api/posts/likes/:post_id',function(req,res){
  Token.findOne(
    {token: req.query.token},
    function(err,t){
      if(err){res.json(err)}
      else{
        User.findById(
          t.userId,
          function(err,user){
            if(err){res.json(err)}
            else{
              Post.findById(
                req.params.post_id,
                function(err,post){
                  if(err){res.json(err)}
                  else{
                    var found = false;
                    var i;
                    var fullname = user.fname+' '+user.lname;
                    post.likes.forEach(function(item,index){
                      if (item.name===fullname) {
                        found=true;
                        i=index;
                      }
                    })
                    if(found){
                      post.likes.splice(i,1)
                    }
                    else{post.likes.push({
                      "name":fullname,
                      "id":user._id
                    })}
                    post.save(function(err,p){
                      if(err){res.json(err)}
                      else{
                        res.json({
                          "success": true,
                          "response": post
                        })
                      }
                    })                   
                  }
                })
              }
            })
          }
        })
})



module.exports = router;
