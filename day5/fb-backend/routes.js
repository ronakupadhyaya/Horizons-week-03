"use strict";

var express = require('express');
var router = express.Router();
var strftime = require('strftime');
var expressValidator = require('express-validator');
var Post = require('./models').Post;
var User = require('./models').User;
var Token = require('./models').Token;
var bcrypt = require('bcrypt');
const saltRounds = 10;
router.use(expressValidator());

router.post('/users/register', function(req,res){
  req.checkBody('fname','You need a first name').notEmpty();
  req.checkBody('lname','You need a last name').notEmpty();
  req.checkBody('email','You need an email').notEmpty().isEmail();
  req.checkBody('password','You need a password').notEmpty();
  var result = req.validationErrors();
  if (result){
    res.json({error:'Cannot leave any fields blank!'})
  }else if (!result){
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        var newUser = new User({
          fname:req.body.fname,
          lname:req.body.lname,
          email:req.body.email,
          password:hash
        });
        newUser.save(function(err){
          if (err){
            res.json({error:err});
          }
          else{
            res.json({success:true});
          }
        })
      });
    });
  }
})
router.post('/users/login', function(req,res){
  var n = Date.now();
  req.checkBody('email','You need to enter an email').notEmpty().isEmail();
  req.checkBody('password','You need to enter a password').notEmpty();
  var result = req.validationErrors();
  if (result){
    res.json({error:'Cannot leave any fields blank!'});
  }else if (!result){
    User.findOne({email:req.body.email},function(err,obj){
      if (err){
        res.json({error:err})
      }else{
        if (bcrypt.compareSync(req.body.password, obj.password)){
          var token = new Token({
            userId:obj._id,
            token: obj.email + n,
            createdAt: new Date()
          })
          token.save(function(err){
            if (err){
              res.json({error:err});
            }else{
              res.json({
                success:true,
                response:{
                  id: token.userId,
                  token: token.token
                }
              });
            }
          })
        }
        else{
          res.json({error:"Incorrect Password"});
        }
      }
    })
  }
})

router.post('/users/logout', function(req,res){
  if (req.query.token){
    Token.findOne({token: req.query.token},function(err,obj){
      if (err){
        res.json({error:err});
      }else{
        obj.remove(function(err,obj){
          if (err){
            res.json({error:err});
          }else{
            res.json({success:true});
          }
        })
      }
    })
  }
  else{
    res.json({error: "Failed to supply token"})
  }
})

// router.get('/posts', function(req,res){
//   if (req.query.token){
//     Token.findOne({token: req.query.token},function(err,obj){
//       if (err){
//         console.log("Oops! There was an error: "+ err);
//       }else{
//
//       }
//     })
//   }
//   else{
//     res.json({error: "Failed to supply token"})
//   }
// })
router.get('/posts/', function(req,res){
  if (req.query.token){
    Token.findOne({token: req.query.token},function(err,obj){
      if (err){
        res.json({error:err});
      }else{
        Post.find(function(err,array){
          if (err){
            res.json({error:err});
          }else{
            res.json({success:true,response:array.slice(0,10)});
          }
        })
      }
    })
  }
  else{
    res.json({error: "Failed to supply token"})
  }
})

router.get('/posts/:page', function(req,res){
  if (req.query.token){
    Token.findOne({token: req.query.token},function(err,obj){
      if (err){
        res.json({error:err});
      }else{
        var page = 1;
        if (req.params.page){
          page = parseInt(req.params.page);
        }
        Post.find(function(err,array){
          if (err){
            res.json({error:err});
          }else{
            res.json({success:true,response:array.slice(10*(page-1),10*page)});
          }
        })
      }
    })
  }
  else{
    res.json({error: "Failed to supply token"});
  }
})

router.post('/posts/', function(req,res){
  if (req.body.token){
    Token.findOne({token: req.body.token},function(err,obj){
      if (err){
        res.json({error:err});
      }else{
        if (req.body.content){
          User.findOne({_id:obj.userId},function(err,user){
            if (err){
              res.json({error:err});
            }else{
              var newPost = new Post({
                poster: {name:user.email,id:obj.userId},
                content: req.body.content,
                likes: [],
                comments: [],
                createdAt: new Date()
              })
              newPost.save(function(err){
                if (err){
                  res.json({error:err});
                }else{
                  res.json({success:true,response:newPost});
                }
              })
            }
          })
        }else{
          res.json({error:"No content"})
        }
      }
    })
  }else{
    res.json({error: "Failed to supply token"})
  }
})


router.post('/posts/comments/:post_id', function(req,res){
  if (req.body.token){
    Token.findOne({token: req.body.token},function(err,obj){
      if (err){
        res.json({error:err})
      }else{
        if (req.body.content){
          User.findOne({_id:obj.userId},function(err,user){
            if (err){
              res.json({error:err});
            }else{
              Post.findOne({_id:req.params.post_id},function(err,postC){
                if (err){
                  res.json({error:err});
                }else{
                  var comment = {
                    createdAt: new Date(),
                    content: req.body.content,
                    poster:{name: user.fname + ' ' + user.lname,id: user._id}
                  }
                  postC.comments.push(comment);
                  postC.save(function(err){
                    if (err){
                      res.json({error:err});
                    }else{
                      res.json({success:true,response:postC});
                    }
                  })
                }
              })
            }
          })
        }else{
          res.json({error:"No content"})
        }
      }
    })
  }else{
    res.json({error: "Failed to supply token"})
  }
})


router.get('/posts/comments/:post_id', function(req,res){
  if (req.query.token){
    Token.findOne({token: req.query.token},function(err,obj){
      if (err){
        res.json({error:err});
      }else{
        User.findOne({_id:obj.userId},function(err,user){
          if (err){
            res.json({error:err});
          }else{
            Post.findOne({_id:req.params.post_id},function(err,postC){
              if (err){
                res.json({error:err});
              }else{
                res.json({success:true,response:postC.comments});
              }
            })
          }
        })
      }
    })
  }else{
    res.json({error: "Failed to supply token"})
  }
})

router.get('/posts/likes/:post_id', function(req,res){
  if (req.query.token){
    Token.findOne({token: req.query.token},function(err,obj){
      if (err){
        res.json({error:err})
      }else{
        User.findOne({_id:obj.userId},function(err,user){
          if (err){
            res.json({error:err});
          }else{
            Post.findOne({_id:req.params.post_id},function(err,postC){
              if (err){
                res.json({error:err});
              }else{
                res.json({success:true,response:postC.likes});
              }
            })
          }
        })
      }
    })
  }else{
    res.json({error: "Failed to supply token"})
  }
})

router.put('/posts/:post_id', function(req,res){
  if (req.query.token){
    Token.findOne({token: req.query.token},function(err,obj){
      if (err){
        res.json({error:err});
      }else{

      }
    })
  }
  else{
    res.json({error: "Failed to supply token"})
  }
})

router.delete('/posts/:post_id', function(req,res){
  if (req.query.token){
    Token.findOne({token: req.query.token},function(err,obj){
      if (err){
        res.json({error:err});
      }else{

      }
    })
  }
  else{
    res.json({error: "Failed to supply token"})
  }
})



module.exports = router;
