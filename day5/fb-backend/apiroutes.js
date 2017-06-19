var express = require('express');
var router = express.Router();
var models = require('./models/models');
var User = models.User;
var Token = models.Token;
var Post = models.Post;
var bcrypt = require('bcrypt');

router.get('/', function(req,res){
  res.json({message:'hello'})
})

router.post('/users/register',function(req,res){
  var newUser = new User({
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    password:req.body.password
  })
  newUser.save(function(err,user){
    if (err){
      res.json({failure:'database error'})
    }
    else{
      res.json({success:true})
    }
  })
})

router.post('/users/login',function(req,res){
  User.findOne({email:req.body.email,password:req.body.password},function(err,user){
    if (err){
      console.log('Err '+err);
    }
    else{
      var token = new Token({
        userId: user._id,
        token: new Date().toISOString() + user._id,
        createdAt: new Date().toISOString()
      })
      token.save(function(err){
        if(err){
          console.log(err);

        } else {
          res.json({
          success: true,
        response: {
          id:token.userId,
          token: token.token
        }});
        }
      })
    }
  })
})

router.get('/users/logout',function(req,res){
  Token.remove({token:req.body.token},function(err,token){
    if (err){
      console.log(err);
    }
    else{
      console.log('removed successfully');
      res.json({"success":true})
    }
  })
})

router.get('/posts',function(req,res){
  Post.find(function(err,post){
    if(err){
      console.log('Error'+err);
    }
    else{
      post=post.slice(0,10);
      res.json(post)
    }
})
})

router.get('/posts/:page',function(req,res){
  Post.find(function(err,post){
    if(err){
      console.log('Error'+err);
    }
    else{
      var page = req.params.page
      post = post.slice(page*10-10,page*10)
      res.json(post)
    }
})
})

router.post('/posts',function(req,res){
  Token.findOne({token:req.body.token},function(err,token){
    if (err){
      console.log(err);
    }
    else{
      User.findOne({_id:token.userId},function(err,user){
        if(err){
          console.log(err);
        }
        else{
                  var post = new Post({
                    poster: {
                      name:user.fname,
                      id:token.userId
                    },
                    content: req.body.content,
                    likes: [],
                    comments: [],
                    createdAt: new Date()
                  });
                  post.save(function(err,post){
                    if(err){
                      console.log(err);
                    }
                    else{
                      res.json({
                        "success": true,
                        "response": post
                      })
                    } //else
                  }) //save
        }
      })
    }
  })
})


router.get('/posts/comments/:post_id',function(req,res){
  Token.findOne({token:req.body.token},function(err,token){
    if (err){
      console.log(err);
    }
    else{
        Post.findOne({id:req.query.post_id},function(err,post){
            if(err){
              console.log(err);
            }
            else{
              res.json({
                "success":true,
                "reponse":post.comments});
            }
          })
        }
        })
    })

router.post('/posts/comments/:post_id',function(req,res){
  Token.findOne({token:req.body.token},function(err,token){
    if (err){
      console.log(err);
    }
    else{
      User.findOne({_id:token.userId},function(err,user){
        if(err){
          console.log(err);
        }
        else{
          Post.findOne({id:req.query.post_id},function(err,post){
            if(err){
              console.log(err);
            }
            else{
              var comment = {
              "createdAt": new Date(),
              "content": req.body.content,
              "poster": {
                "name": user.fname,
                "id": token.userId}
              };
              post.comments.push(comment);
              post.save(function(err){
                if(err){
                  console.log(err);
                }
                else{
                  res.json({
                    "success":true,
                    "response":post
                  })
                }
              })

            }//else
          })//find post
        }
      })//find user
    }  //else
  })
})

router.get('/posts/likes/:post_id',function(req,res){
  Token.findOne({token:req.body.token},function(err,token){
    if(err){
      console.log(err);
    }
    else{
      Post.findOne({id:req.query.post_id},function(err,post){
        if(err){
          console.log(err);
        }
        else{
            // post.likes= [{name:amy,id:10},{name:da,id:20}]
            post.likes.map(function(obj){
              if (token.userId===obj.id){
                //remove
                post.likes.splice(i,1)
              }
              else{
                post.likes.push(i)
              }
            })

            res.send({
              "success":true,
              "response":post
            })
        }
      })
    }
})
})


module.exports = router
