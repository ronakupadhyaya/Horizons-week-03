"use strict";

//MAKE A VALIDATE TOKEN METHOD??

//****just assume the user will use things correctly. format and everything
//come back later and add validation and checks and shit

var express = require('express');
var router = express.Router();

//importing models
var Token = require('./models/token');
var User = require('./models/user');
var Post = require('./models/post');


//USERS

  //registering
  router.post('/users/register', function(req, res){

  //could update to make sure things are validated more thoroughly before they go into a user
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;

    if(fname && lname && email && password){
      var newUser = new User({
        fname: fname,
        lname: lname,
        email: email,
        password: password
      })

      newUser.save(function(err, user){
        if(err){
          res.json({failure: 'Registration failed'});
        }else{
          res.json({success: true});
        }
      })
    }else{
      res.json({failure: 'Invalid request'});
      //should these json keys already be in "json format"
    }
  })


  //login
  router.post('/users/login', function(req,res){

    var email = req.body.email;
    var password = req.body.password;

    var user = {
      email: email,
      password: password
    }

    if(email && password){

      User.findOne(user, function(err, user){
        if(err || user === null){
          res.status(300).json({failure: "Invalid Login"});
        }else{
          //create new token object
          //console.log(user);
          var id = user._id;
          var date = new Date();
          var token = user.email + date;

          var newToken = new Token({
            userId: id,
            token: token,
            createdAt: date
          })

          //and save it to that collection of your db
          //and give the user a response
          newToken.save(function(err,token){
            if(err){
              res.json({failure: 'Login failed'});
            }else{
              res.json({
                success: 'true',
                response: newToken
              })
            }
          })
        }
      })

    }else{
      res.json({failure: 'Invalid login request'});
    }

  })

  //logout
  router.get('/users/logout', function(req,res){

    var token = {
      token: req.query.token
    }

    if(req.query.token){
      //find by token in token collection and remove it.
      Token.findOne(token, function(err, user){
        if(err || user === null){
          res.json({failure: 'Logout failed'});
        }else{
          Token.remove(user, function(err){
            if(err){
              res.json({failure: 'Logout failed due to mongoose'});
            }else{
              res.json({success: true});
            }
          })
        }
      })

    }else{
      res.json({failure: 'Invalid logout request'});
    }
  })


//POSTS

  //get POSTS
  router.get('/posts', function(req,res){

    if(req.query.token){

      var token = {
        token: req.query.token
      }

      //find by token in token collection and remove it.
      Token.findOne(token, function(err, user){
        if(err || user === null){
          res.json({failure: 'Invalid token'});
        }else{
          //find 10 requests
          //posts is an array with 10 post objects
          Post.find().limit(10).exec(function(err,posts){
            if(err){
              res.json({failure: 'Find posts failed'})
            }else{
              //posts now holds an array of post objects
              res.json({
                success: true,
                response: posts
              })

            }
          })
        }
      })

    }else{
      res.json({failure: 'No token supplied'});
    }

  })



  //make a post
  router.post('/posts', function(req,res){

    var token = req.body.token;
    var content = req.body.content;


    if(req.body.token){

      //find by token in token collection to validate before posting
      Token.findOne({token: token}, function(err, user){
        if(err || user === null){
          res.json({failure: 'Invalid token'});
        }else{
          //make the post that you will save to mongoDB

          //FIND USER ASSOCIATED WITH TOKEN
          User.findById(user.userId, function(err,userAss){
            if(err || userAss === null){
              res.json({failure: 'Invalid token2'});
            }else{
              //store post in newPost model and save to db
              //if this works return succes plus newPost in json object
              var poster = {
                name: (userAss.fname + ' ' + userAss.lname),
                id: userAss._id
              }
              var newPost = new Post({
                poster: poster,
                content: content,
                likes: [],
                comments: [],
                createdAt: new Date()
              })

              newPost.save(function(err, savedPost){
                if(err){
                  res.json({failure: "Failed to save post"});
                }else{
                  res.json({
                    success: true,
                    response: newPost
                  })
                }

              })

            }
          })

        }
      })

    }else{
      res.json({failure: 'No token supplied'});
    }

  })



  //get comments
  // router.get('/posts/comments/:post_id', function(req, res){
  //
  //   var token = req.query.token;
  //   var postid = req.params.post_id;
  //
  //   if(token){
  //
  //     Post.findById(postid, function(err, post){
  //       var comments = post.comments;
  //
  //       var
  //
  //       res.json({
  //         success: true,
  //
  //       })
  //     })
  //
  //
  //   }else{
  //     res.json({failure: 'No token supplied'});
  //   }
  //
  // })


//post comments

router.post('/posts/comments/:post_id', function(req,res){

  var postid = req.params.post_id;

  var token = req.body.token;
  var content = req.body.content;



  Post.findById(postid, function(err,post){

    var comment_body = {
      createdAt: new Date(),
      content: content,
      poster: {
        name: 
      }
    }

    post.comments.push

  })





})







// ===================== FINISH UP =============================

  //NEED TO FINISH ******** BUT FUCK IT.
  //get posts but specify 1,2,3. just need to adjust find.limit to deal with getting proper range
  router.get('/posts/:page', function(req,res){

    if(req.query.token){


      var token = {
        token: req.query.token
      }

      if(parseInt(req.params.page) === 1){
        //load first 10

      }else if(parseInt(req.params.page) === 2){
        //load 10-20

      }else if(parseInt(req.params.page) === 3){
        //load 20-30

      }else{
        res.json({failure: 'Invalid page load request'});
      }

    }else{
      res.json({failure: 'No token supplied'});
    }

  })




module.exports = router;
