// accessing a different part of express
var express = require('express')
var router = express.Router()
var models = require('./models/models')
var User = models.User
var Token = models.Token
var Post = models.Post
router.get('/', function(req, res){
res.send({message: 'hello'})

})
// every response has 1 request / every request has  1 response
//Body object have key value pairs

///// REGISTER USERS!
router.post('/users/register', function(req, res){
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })

  newUser.save(function(err, usr){
    if(err){
      res.json({failure: 'database error'})
    }else{
      res.json({success:true})
    }
  });
})
/////////// LOGIN
router.post('/users/login', function(req, res){
  User.findOne({email: req.body.email}, function(err, array){
  //  console.log(array);
    //var userID = array.id
    //console.log(userID)
    var newToken = new Token({
      userId: array.id,
      token: array.email + new Date(),
      createdAt: new Date()
    })
    newToken.save(function(err, token){
      if(err){
        res.json({failure: 'database error'})
      }else{
        res.json({success:true})
      }
    });
    // res.render('index', {
    //   items: array,
    //
    // })
  })
})

////Logging out - REmoving Tokens
router.get('/users/logout', function(req, res){
  Token.remove({token:req.query.token}, function(err, token){
    if(err){
      res.json({failure: 'database error'})
    }else{
      res.json({success:true})
    }
  })
})
//Post Posts
router.post('/posts', function(req, res){
  Token.findOne({token:req.query.token}, function(err, tokenObj){
    //console.log(tokenObj);
    User.findById(tokenObj.userId, function(err, userObj){
      console.log(userObj)
      var newPost = new Post({
         poster: {
           name: userObj.fname + " " + userObj.lname,
           id: userObj.id
         },
         content: req.body.content,
         likes: [],
         comments: [],
         createdAt: new Date(),
       })
       newPost.save(function(err, post){
         if(err){
           res.json({failure: 'database error'})
         }else{
           res.json({
             success:true,
             response: newPost

           });
         };
       });
    })
  })
})

/// Get Posts - NOT COMPLETE
router.get('/posts', function(req, res){
  Token.findOne({token:req.query.token}, function(err, tokenObj){
    //console.log(tokenObj);
    User.findById(tokenObj.userId, function(err, userObj){
      console.log(userObj)
    })
  })
})

//Post comments
router.post('/posts/comments/:post_id', function(req, res){
  var postID = req.params.post_id // id of post being replied to
  //console.log(postID)
  //console.log(req.body.content);// content of comment
  //console.log(req.body.userID) // userID of commenter
  Post.findById(postID, function(err, postObj){
    console.log(postObj)
  Token.findOne({token:req.body.token}, function(err, tokenObj){
    //console.log(tokenObj);
    User.findById(tokenObj.userId, function(err, userObj){
       console.log(userObj)
       var currentComment = {
         createdAt: new Date(),
         content: req.body.content,
         poster: {
             name: userObj.fname + " " + userObj.lname,
             id: userObj.id
           }
       }
       console.log(currentComment)
       console.log(postObj)
       postObj.comments.push(currentComment)
postObj.save(function(err){
  if(err){
    console.log(err)
  }else{
    res.json({
      success: true,
      response: postObj,
    })
  }
})
    })
  })

  //console.log(postID)

    //console.log(postObj)
    // var currentComment = {
    //   createdAt: 1496822000540,
    //   content: "Text me if you're at Dolores!",
    //   poster: {
    //       "name": "Patrick Hennessey",
    //       "id": "59373f23a6bf290011bf5daa"
    // }
    //postObj.comments.push({req.comment})
  })

})
// Get post comments
router.get('/post/comments/:post_id', function(req, res){


})
  // var newToken = new Token({
  //   userId: String,
  //   token: String,
  //   createdAt: Date
  // })

//   newUser.save(function(err, usr){
//     if(err){
//       res.json({failure: 'database error'})
//     }else{
//       res.json({success:true})
//     }
//   });
// })

// router.post('/users/logout', function(req, res){
//   var newUser = new User({
//     fName: req.body.fName,
//     lName: req.body.lName,
//     email: req.body.email,
//     password: req.body.password
//   })
//
//   newUser.save(function(err, usr){
//     if(err){
//       res.json({failure: 'database error'})
//     }else{
//       res.json({success:true})
//     }
//   });
// })


// router.post('/users/register', function(req, res){
//   var newPost = new Post({
//     poster: req.body.poster,
//     content: req.body.content,
//     likes: req.body.likes,
//     comments: req.body.comments,
//     createdAt: req.body.createdAt,
//   })

//   newUser.save(function(err, usr){
//     if(err){
//       res.json({failure: 'database error'})
//     }else{
//       res.json({success:true})
//     }
//   });
// })
module.exports = router;
