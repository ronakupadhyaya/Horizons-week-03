var express=require('express')
var router=express.Router()

//Users
var users=require('./models/users.js')
var User = users.User;
//token
var tokens=require('./models/token.js')
var Token = tokens.Token;

//Post
var posts=require('./models/posts.js')
var Post = posts.Post;


router.get('/',function(req,res){
  res.json({message:'hello'})
})



router.post('/users/register', function(req,res){


  var newUser=new User({
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    password:req.body.password
  })


  newUser.save(function(err,usr){
    if(err){
      res.json({failure:err})
    }else{
      res.json({success:true})
    }
  })
})

router.post('/users/login',function(req,res){

  User.find({email:req.body.email, password:req.body.password}, function(err,user){

    if(err){
      res.json({name:"LoginFailed"});
    }else{
      var newToken= new Token({
        userId: user._id,
        token: req.body.email+new Date(),
        createdAt: new Date()

      });

      newToken.save(function(err,user){
        if(err){
          res.json({failure:err})
        }else{

          res.json({success:true,response:{id:user._id,token: req.body.email+new Date()}})
        }

      })


    }
  })
})

router.get('/users/logout', function(req,res){

 Token.remove({token:req.query.token},function(err,removed){
    if(err){
      res.json({failure:err})

    }else{
      res.json({success:true})
    }
  })
})

router.get('/posts', function(req, res){

  res.redirect('1/?token='+req.query.token);
})

router.get('/posts/:page',function(req,res){

  Token.find({token:req.query.token},function(err, found){
    if(err){
      res.json({failure:err})
    }else{
      if(found.length!==0){

      var pg=parseInt(req.params.page);

      if(pg) {
        Post.find(function(err, fndPosts){
          if(err){res.json({failure:err})}else{
            res.json({success:true,response:fndPosts})
          }
        }).sort({'createdAt': -1}).skip((pg-1)*10).limit(10)

     }else{
        res.json({failure:"wrong url"})
      }

    }else{
    res.json({failure:"No token"})
  }
  }
  })
})

router.post('/posts',function(req,res){
  Token.find({token:req.body.token},function(err,fndToken){
    if(err){res.json({failure:err})} else{

      if(fndToken.length){
      User.find({id:fndToken._id},function(err,fndUser){
        if(err){
          res.json({failure:err})
      }else{


          var newPost= new Post({
            poster: {name:fndUser[0].fname+" "+fndUser[0].lname, id:fndUser[0]._id},
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: new Date()

          });

          newPost.save(function(err,sved){
            if(err){res.json({failure:err})}else{
              res.json({successs:true,response:sved})
            }

          })


        }

      })
      }else{
        res.json({
          failure:"No token found"
        })}


    }
  })

})

router.post('/posts/comments/:post_id',function(req,res){
  Token.find({token:req.body.token},function(err,fndToken){
    if(err){res.json({failure:err})} else{
      if(fndToken.length){
      User.find({id:fndToken._id},function(err,fndUser){

        if(err){
          res.json({failure:err})
      }else{
        if(fndUser.length!==0){
        Post.find({_id:req.params.post_id},function(err,fndPost){

          if(err){
            res.json({failure:err})
        }else{
          if(fndPost.length!==0){
          var newComment= {
            createdAt: new Date(),
            content: req.body.content,
            poster: {name:fndUser[0].fname+" "+fndUser[0].lname, id:fndUser[0]._id}
          };
          fndPost[0].comments.push(newComment);

          fndPost[0].save(function(err,sved){
            if(err){res.json({failure:err})}else{
              res.json({successs:true,response:sved})
            }

          })

        }else{res.json({failure:"No post found"})
        }
      }
        })
      }else{
        res.json({failure:"No user found"})
      }

        }

      })
      }else{
        res.json({
          failure:"No token found"
        })}


    }
  })

})

router.get('/posts/likes/:post_id',function(req,res){
  Token.find({token:req.query.token},function(err,fndToken){
    if(err){res.json({failure:err})} else{
      if(fndToken.length){
      //  User.find({id:fndToken._id},function(err,fndUser){
      //
      //   if(err){
      //     res.json({failure:err})
      // }else{
        // if(fndUser.length){
        Post.find({_id:req.params.post_id},function(err,fndPost){

          if(err){
            res.json({failure:err})
        }else{
          if(fndPost.length){

          res.json({success:true,response:fndPost[0]})
        }else{res.json({failure:"No post found"})
        }
      }
        })
      // }else{
      //   res.json({failure:"No user found"})
      // }

        // }

      //})
      }else{
        res.json({
          failure:"No token found"
        })}


    }
  })



})








module.exports=router
