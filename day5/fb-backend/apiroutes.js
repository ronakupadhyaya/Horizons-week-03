var express = require('express')
var router = express.Router()
var models = require('./models/models')
var User = models.User
var Token = models.Token
var Post = models.Post
//router

router.get('/',function(req,res){
  res.json({message:'hello'})
})

router.post('/api/users/register',function(req,res){
  var newUser= new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  }) //create an instance of the user model
  newUser.save(function(err,usr){
    if(err){
      res.json({failure:"database err"})
    } else {
      res.json({success:true}) //must write inside because of async
      //don't ever send 2 res to 1 req: error cannot set headers after they're set
    }
  })
})

router.post('/api/users/login',function(req,res){
  User.find({email:req.body.email},function(err,user){
    console.log(user[0])
    if(user[0].password === req.body.password){
      var newToken = new Token({
        userId: user[0].id,
        token: user[0].email+new Date().toString(),
        createdAt: new Date()
      })
      newToken.save(function(err,token){
        if(err){
          res.json({failure:"token not saved"})
        } else {
          res.json({success:"token saved"})
        }
      })
    }else{
      res.json({failure: "invalide email and password"})
    }
  })
})

router.post('/api/users/logout',function(req,res){
  var token = req.body.token;
  // console.log("the passin token is ", req.body.token);
  Token.find({token:token},function(err,token){
    if(tokens.length===0){res.json({failure: "token not found"})}
    else{
      // console.log('token is',token)
      token[0].remove(function(err){
      if(err){res.json({failure:"err at removing token"})}
      else{res.json({success:"token removed"})}
      })
    }
  })
})

router.get('/api/posts/:page',function(req,res){
  var token = req.query.token;
  console.log(token);
  Token.find({token:token},function(err,tokens){
    if(tokens.length === 0){res.json({failure: "token not found"})}
    //if tokens is undefined, because of nature of find...it will still return something
    else{
      Post.find(function(err,posts){
         if(err){res.json({failure:"no post found"})}
         else{res.json({
           success: true,
           response: posts.slice(0,10)
           })
         }
      })
    }
  })
})

//post posts
router.post('/api/posts/',function(req,res){
  Token.find({token:req.body.token},function(err,tokens){
    if(tokens.length===0){res.json({failure: "token not found"})}
    else{
      User.findById(tokens[0].userId,function(err,user){
        if(err){res.json({failure: "no matching user found"})}
        else{
          var newPost = new Post ({
            poster: {
              name: user.fname+' '+user.lname,
              id: user.id
            },
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: new Date()
          })
          console.log(newPost);
          newPost.save(function(err,post){
            if(err){res.json({failure:"post not saved"})}
            else{res.json({success:"post saved successfully"})}
          })
        }
      })
    }
  })
})

// post comments
router.post("/api/posts/comments/:post_id",function(req,res){
  Token.findOne({token:req.body.token},function(err,token){
   //findOne will return a single object this time
    if(!token){res.json({failure:"token not found"})}
    else{
      console.log("post id is", req.params.post_id)
      console.log("token is",token)
      Post.findById(req.params.post_id,function(err,post){
        //findById will only give a single object
        console.log('post is', post)
        if(err){res.json({failure: "no post found"})}
        else{
          User.findById(token.userId,function(err,user){
            if(err){res.json({failure:'cannot find user'})}
            else {
              var comment = {
                createdAt: new Date().getTime(),
                content: req.body.content,
                poster: {
                  name: user.fname+' '+user.lname,
                  id: user.id
                }
              }
              post.comments.push(comment);
              post.save(function(err,post){
                if(err){res.json({failure:"post not saved"})}
                else{res.json({success:"post saved successfully"})}
              })
              res.json({
                success: true,
                response: post
              })
            }
          })
        }
      })
    }
  })
})

//toggle likes
router.post('/api/posts/likes/:post_id',function(req,res){
  Token.findOne({token:req.body.token},function(err,token){
    if(!token){res.json({failure:"token not found"})}
    else{
      User.findById(token.userId,function(err,user){
        if(err){res.json({failure: "user not found"})}
        else {
              Post.findById(req.params.post_id,function(err,post){
                var arr = post.likes
                var object = {
                  name:user.fname+' '+user.lname,
                  id: user.id
                }
                var index=-1;
                for(var i = 0;i<arr.length;i++){
                  if(arr[i].id === object.id){
                    index = i;
                  }
                }
                console.log(index)
                if(index>-1){
                    post.likes.splice(index,1)
                } else {
                  post.likes.push(object)
                }
                console.log('post is',post)
                post.save(function(err,post){
                  if(err){res.json({failure:"post not saved"})}
                  else{
                    res.json({
                      success: true,
                      response: post})
                  }
                })
            })
        }
      })
    }
  })
})

module.exports = router
