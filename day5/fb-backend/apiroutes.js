var express = require('express');
var router = express.Router(); //router object that we can use back in app.js
// router is able to accept get requests, router can't spin up a server
var models = require('./models/models'); //get the models.js file that's in our models folder
var User = models.User;
var Token = models.Token;
var Post = models.Post;
router.get('/', function(req, res){
  res.send({message: "hello"})
});

//[Post] Register
//https://horizons-facebook.herokuapp.com/api/1.0/users/register
/*
{
	"fname" : "dog",
	"lname": "patrick",
	"email": "dog@gmail.com",
	"password": "pineapple"
}
*/
router.post('/users/register', function(req, res){
  var newUser = new User({ // coming from models.js
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  // every response has one request, async
  newUser.save(function(err, usr){
    if (err) {
      res.json({failure: 'database error'})
    } else {
      res.json({success: true})
    }
  });
})

//Users - [POST] Login
//create unique token for user to login
//token contains user information so that a username does not have to be passed through every time a request is made.
//make your `token` field in your Token object `email + new Date()` to guarantee uniqueness.
//Set the `userId` field on the Token object to the `_id` of the user that is currently logging in.
//Save this `token` to your mongo database.
//https://horizons-facebook.herokuapp.com/api/1.0/users/login
router.post('/users/login', function(req, res){
  User.findOne({
    email: req.body.email,
    password:req.body.password
  }, function(err, user){
    var userId = user._id;
    var email = user.email;
    var token = userId + new Date();
    var newToken = new Token({
      // userId: user.id,
      userId: userId,
      token: token,
      createdAt: new Date()
    });

    // console.log('this is our user ' + email)
    newToken.save(function(err, usr){

      if(err) {
        res.json({failure: 'login error'});
      } else {
        console.log("successful login");
        res.json({
          success: true,
          response: {
            // userId: userId,
            userId: userId,
            token: token,
            createdAt: new Date()
          }
        })
      }
    })

  });

})
//token: dog@gmail.com Fri Jun 16 2017 14:05:00 GMT-0700 (PDT)
//logout
//[GET] Logout
//takes in tokens
//https://horizons-facebook.herokuapp.com/api/1.0/users/logout
router.get('/users/logout', function(req, res){
  //make sure user exists
  //search for the given token
  //remove from database if token exists
  Token.remove({token: req.query.token}, function() {
    res.send('removed' + req.query.token);
  });

})

//GET /api/posts Posts - [GET] Posts
//Returns the 10 most recent posts posted by users from the site.
//https://horizons-facebook.herokuapp.com/api/1.0/posts/:page
//takes in tokens
/*
{
  "success": true,
  "response": [
  {
    "_id": "593771b9228790782fe8686e",
    "poster": {
      "id": "5936f560f3a1865b3916d683",
      "name": "Darwish Gani"
    },
    "content": "Welcome to Horizons! #prepwork",
    "createdAt": "2017-06-07T03:23:37.753Z",
    "comments": [],
    "likes": []
  }
}
*/
router.get('/posts', function(req,res){
  //look up token and retrieve userId
  // Auth.findOne({nick: 'noname'}, function(err,obj) { console.log(obj); });
  Token.findOne({
    token: req.query.token
  }, function(err, token){

    console.log("thisis token", token)
    if(token.userId) {
      Post.find(function(err, posts){
        res.json({success: true,
                  response: posts})
      })
    } else {
      res.json({failure: "token error"})
    }
  });
})

//Posts - [POST] New Facebook Post (a.k.a. post a post)
//https://horizons-facebook.herokuapp.com/api/1.0/posts
//takes in token, content
router.post('/posts', function(req, res){

  Token.findOne({
    token: req.body.token,
  }, function(err, token){
    var newToken = token.token;
    var newUserId = token.userId;
    console.log('this is the token: ', token.token)

    var newPost = new Post({
      poster: req.body.fname,
      content: req.body.content,
      likes: req.body.likes,
      comments: req.body.comments,
      createdAt: req.body.createdAt
    });

    newPost.save(function(err, post){
      if(err) {
        res.json({failure: 'posting error'});
      } else {
        console.log("posting successful");
        res.json({
          success: true,
          response: {
            poster: {
              name: User.fname,
              id: newToken // newToken + new Date()
            },
            content: req.body.content,
            createdAt: new Date(),
            comments: req.body.comments,
            likes: req.body.likes
          }
        })

      }
    });
  });
})

//Posts - [GET] Comments
//https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:post_id
router.get('/posts/comments/:post_id', function(req, res){
  var postId = req.params.post_id;
  Post.findById(postId, function(err, posts){
    if(err){
      res.json(err);
    } else {
      res.json({
        success:true,
        response: [
          {
            poster: {
              name: posts.poster,
              id: posts.id,
            },
            content: posts.content,
            createAt: new Date()
          }
        ]
      })
    }
  })
})

//Posts - [POST] Comments
//https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:post_id
//takes in token, content
router.post('/posts/comments/:post_id', function(req, res){
  var postId = req.params.post_id;
  Post.findById(postId, function(err, posts){
    var comments = posts.comments;
    User.findById(req.user_id, function(err, usr){
      if(err) {
        res.json({failure: "usr not found"});
      } else {
        // var firstName = usr.fname;
        // var lastName = usr.lname;
        // var usrName = firstName + " " + lastName;
        var newComments = {
          createAt: new Date(),
          content: req.body.content,
          poster: {
            // name: usrName,
            id: req.user_id
          },
        }
      }
      comments.push(newComments);
      Post.findByIdAndUpdate(posts._id, {//id, name
        comments: newComments
      }, function(err, newCom){
        if(err) {
          res.json({failure: "error with commenting"});
        } else {
          res.json({
            success: true,
            response: {
              _id: posts._id,
              poster: {
                id: req.uer_id,
                // name: usrName
              },
              content: req.body.content,
              createdAt: new Date(),
              comments: newCom.comments,
              likes: newCom.likes
            }
          })
        }
      })
    })
  });
})

//Posts - [GET] Likes
//https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/:post_id
router.get('/posts/likes/post_id', function(req, res){
  var postId = req.params.post_id;

})
module.exports = router;
