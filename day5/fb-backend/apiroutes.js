var express = require('express');
var router = express.Router()
var models = require('./models/models')
var User = models.User;
var Token = models.Token;
var Post = models.Post;

router.get('/', function(req, res){
  res.json({message: "hello"})
})
router.post('/users/register', function(req, res){
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  newUser.save(function(err, usr){
    if (err){
      res.json({failure: "database error"})
    } else {
      res.json({success: true})
    }
  })
})

// Post Login
router.post('/users/login', function (req, res){
  var email = req.body.email;
  var password = req.body.password;

 // whatever the function happens is after the find.
  User.findOne({email: email, password:password}, function(err, response){
    //behind this line happens after 'find'.
    if (err){
      console.log(err);
    }
    else{
      var newToken = new Token({
        userId: response._id ,
        token: email + new Date() ,
        createdAt: new Date()
      })
      newToken.save(function(error){
        if (error){
          console.log(err);
        }
        else{
          res.json(response) // sending user.
        }
      })
    }
  })
})

// Post Logout
router.get('/users/logout', function( req, res){
  var token = req.query.token;
  Token.remove({token:token}, function(err){
    console.log(err)
    res.json({status: "success"})
  })
})

// Part 4 posts
//GET posts
router.get('/posts', function( req, res){
  var token = req.query.token;
  Token.findOne({token: token}, function(err, tokenObj){
    if (err || !tokenObj){
      console.log("error");
    }
    else{
      Post.find(function(error, array){
        if (error){
          console.log(error)
        }
        else{
          res.json(array.slice(0, 10));
        }
      })
    }
  })
})

//GET posts according to :pg
router.get('/posts/:pg', function( req, res){
  var token = req.query.token;
  var page = req.params.pg;

  Token.findOne({token: token}, function(err, tokenObj){
    if (err || !tokenObj){
      console.log("error");
    }
    else{
      Post.find(function(error, array){
        if (error){
          console.log(error)
        }
        else{
          res.json(array.slice(page*10-10, page*10));
        }
      })
    }
  })
})

router.post('/posts', function( req, res){
  var token = req.body.token; // or req.query?
  console.log(token);

  Token.findOne({token: token}, function(err, tokenObj){
    if (err || !tokenObj){
      console.log("error@@");
    }
    else{
      User.findById(tokenObj.userId, function(error, userObj){
        if (error){
          console.log(error);
        }
        else{
          console.log("USER ID!!:"+tokenObj.userId);
          var newPost = new Post({
            poster: userObj.fname + userObj.lname,
            content: req.body.content ,
            likes: [], //????
            comments: [] ,
            createdAt: new Date()
          })
          newPost.save(function(e , poster){
            if (e){
              console.log(e);
            }
            else{
              var jsonObj = {
              "success": true,
              "response": {
                "poster": {
                  "name": userObj.fname + userObj.lname,
                  "id": poster.id
                },
              "content": req.body.content,
              "createdAt": new Date(),
              "_id": userObj.id,
              "comments": [],
              "likes": []
              }
            }
              res.json(jsonObj)
            }
          })
        }
      })
    }
  })
})

//get comments @@@@@@@@
router.get('/posts/comments/:post_id', function(req, res){
  var postId = req.params.post_id;
  var token = req.query.token;
  console.log("PostID"+ postId);
  console.log("Token"+ token);

  Token.findOne({token: token}, function(err, tokenObj){
    if (err || !tokenObj){
      console.log("error");
    }
    else{
      Post.find( {_id: postId}, function(error, postArray){
        if (error){
          console.log("HERE" + error)
        }
        else{
          console.log(postArray);
          res.json(postArray);
        }
      })
    }
  })
})

//post comments
router.post('/comments/:post_id', function( req, res){
  var token = req.body.token;
  var content = req.body.content;
  var postId = req.params.post_id;

  Token.findOne({token: token}, function(err, tokenObj){
    if (err || !tokenObj){
      console.log("error@@");
    }
    else{
      Post.findByID(postId, function(error, postArray){
        console.log("found!!");
      })

      // User.findById(tokenObj.userId, function(error, userObj){
      //   if (error){
      //     console.log(error);
      //   }
      //   else{
      //     console.log("USER ID!!:"+tokenObj.userId);
      //     var newPost = new Post({
      //       poster: userObj.fname + userObj.lname,
      //       content: req.body.content ,
      //       likes: [], //????
      //       comments: [] ,
      //       createdAt: new Date()
      //     })
      //     newPost.save(function(e , poster){
      //       if (e){
      //         console.log(e);
      //       }
      //       else{
      //         var jsonObj = {
      //         "success": true,
      //         "response": {
      //           "poster": {
      //             "name": userObj.fname + userObj.lname,
      //             "id": poster.id
      //           },
      //         "content": req.body.content,
      //         "createdAt": new Date(),
      //         "_id": userObj.id,
      //         "comments": [],
      //         "likes": []
      //         }
      //       }
      //         res.json(jsonObj)
      //       }
      //     })
      //   }
      // })
    }
  })
})


module.exports = router;
