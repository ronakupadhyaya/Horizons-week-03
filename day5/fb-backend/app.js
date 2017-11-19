"use strict";
// Require and set up Express
var express = require('express');
var app = express();
// Require and set up express-handlebars
var exphbs  = require('express-handlebars');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
// Require mongoose & ensure that there is a MONGODB_URI environment variable (source env.sh)
var mongoose = require('mongoose');
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connect(process.env.MONGODB_URI);
// Require and setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Require and set up path package
var path = require('path');

var Post = require('./Model/post');
var Token = require('./Model/token');
var User = require('./Model/user');

//Load the login/register page
app.get('/api/users/login',function(req,res){
    res.render('index');
});

//Post a new user from the registration page and redirect to login page (if unseccessful, indicate error)
app.post('/api/users/register',function(req,res){
  if(req.body.fname&&req.body.lname&&req.body.email&&req.body.password){
    var newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password
    });
    newUser.save(function(err){
      if(err){
        res.status(400).send(err);
      }
      else{
        res.status(200).json({'success':true});
      }
    });
  }
  else{
    res.status(400).send("Missing registration information");
  }
});

//Post a new login from the login page and redirect to the posts page (if unseccessful, indicate error)
app.post('/api/users/login',function(req,res){
  if(req.body.email && req.body.password){
    User.findOne({'email':req.body.email},function(err,user){
      if(err || !user || req.body.password!==user.password){
        res.status(301).send(`One or more of your authentication details was incorrect. Make sure you are sending the correct email and password you set upon registration and that these values are defined.`);
      }
      else{
        var token = new Token({
          userId: user._id,
          token: user.email + Date(),
          createdAt: new Date()
        });
        token.save(function(err2){
          if(err){
            res.status(501).send(err2);
          }
          else{
            res.status(200).json({
              'success':true,
              'response': {
                  'id': token.userId,
                  'token': token.token
              }
            });
          }
        });
      }
    });
  }
  else{
    res.status(301).send(`One or more of your authentication details was incorrect. Make sure you are sending the correct email and password you set upon registration and that these values are defined.`);
  }
});

//Logout an proceed to login page
app.get('/api/users/logout',function(req,res){  //TOKEN REQUIRED
  if(!req.query.token){
    res.status(400).send("Failed to supply token.");
  }
  else{
    Token.findOne({'token':req.query.token},function(err, token){
      if(err||!token){
        res.status(400).send("Cannot decode token.");
      }
      else{
        token.remove({'_id':token._id},function(err2){
          if(err2){
            res.status(500).send("Failed to save data.");
          }
          else{
            res.status(200).json({'success':true});
          }
        });
      }
    });
  }
});

//Get First 10 Posts
app.get('/api/posts/',function(req,res){ //TOKEN REQUIRED
  if(!req.query.token){
    res.status(400).send("Failed to supply token.");
  }
  else {
    Token.findOne({'token':req.query.token},function(err, tokenObject){
      if(err||!tokenObject){
        res.status(400).send("Cannot decode token.");
      }
      else{
        User.findById(tokenObject.userId,function(err2,userObject){
          if(err2 || !userObject){
            res.status(400).send('Cannot find user.');
          }
          else{
            Post.find({},function(err3,posts){
              if(err3 || !posts){
                res.status(500).send('Cannot find posts.');
              }
              else{
                posts.sort(function(postA,postB){
                  return postB.createdAt - postA.createdAt
                });
                posts = posts.slice(0,10);
                var returnObject = {
                  success: true,
                  response: posts
                };
                res.json(returnObject);
              }
            });
          }
        });
      }
    });
  }
});

//Get Specified Number Of Posts
app.get('/api/posts/:page',function(req,res){ //TOKEN REQUIRED
  if(!req.query.token){
    res.status(400).send("Failed to supply token.");
  }
  else {
    var numPosts;
    if(!req.params.page || isNaN(parseInt(req.params.page))){
      numPosts = 10;
    }
    else{
      numPosts = 10*parseInt(req.params.page);
    }
    Token.findOne({'token':req.query.token},function(err, tokenObject){
      if(err||!tokenObject){
        res.status(400).send("Cannot decode token.");
      }
      else{
        User.findById(tokenObject.userId,function(err2,userObject){
          if(err2 || !userObject){
            res.status(400).send('Cannot find user.');
          }
          else{
            Post.find({},function(err3,posts){
              if(err3 || !posts){
                res.status(500).send('Cannot find posts.');
              }
              else{
                posts.sort(function(postA,postB){
                  return postB.createdAt - postA.createdAt
                });
                posts = posts.slice(numPosts-10,numPosts);
                var returnObject = {
                  success: true,
                  response: posts
                };
                res.json(returnObject);
              }
            });
          }
        });
      }
    });
  }
});

//Get comments for specified post
app.get('/api/posts/comments/:post_id',function(req,res){  //TOKEN REQUIRED
  if(!req.query.token){
    res.status(400).send("Failed to supply token.");
  }
  if(!req.params.post_id){
    res.status(400).send("Empty Post ID.");
  }
  else{
    Token.findOne({'token':req.query.token},function(err, tokenObject){
      if(err || !tokenObject){
        res.status(400).send("Cannot decode token.");
      }
      else{
        User.findById(tokenObject.userId,function(err2,userObject){
          if(err2 || !userObject){
            res.status(500).send("Failed to find user.");
          }
          else{
            Post.findById(req.params.post_id,function(err3, postObject){
              if(err3 || !postObject){
                res.status(400).send("Invalid Post ID.");
              }
              else{
                var returnObject = {
                  success: true,
                  response: postObject.comments
                };
                res.json(returnObject);
              }
            });
          }
        });
      }
    });
  }
});

//Like or unlike specified post
app.get('/api/posts/likes/:post_id',function(req,res){  //TOKEN REQUIRED
  if(!req.query.token){
    res.status(400).send("Failed to supply token.");
  }
  if(!req.params.post_id){
    res.status(400).send("Empty Post ID.");
  }
  else{
    Token.findOne({'token':req.query.token},function(err, tokenObject){
      if(err || !tokenObject){
        res.status(400).send("Cannot decode token.");
      }
      else{
        User.findById(tokenObject.userId,function(err2,userObject){
          if(err2 || !userObject){
            res.status(500).send("Failed to find user.");
          }
          else{
            Post.findById(req.params.post_id,function(err3, postObject){
              if(err3 || !postObject){
                res.status(400).send("Invalid Post ID.");
              }
              else{
                var likeIndex = postObject.likes.indexOf(userObject._id);
                if(likeIndex<0){
                  postObject.likes.push(userObject._id);
                }
                else{
                  postObject.likes.splice(likeIndex,1);
                }
                var returnObject = {
                  'succes': true,
                  'response': postObject
                };
                res.json(returnObject);
              }
            });
          }
        });
      }
    });
  }
});

//Create new post
app.post('/api/posts',function(req,res){  //TOKEN REQUIRED
  if(!req.body.token){
    res.status(400).send("Failed to supply token.");
  }
  if(!req.body.content){
    res.status(400).send("No post content.");
  }
  else {
    Token.findOne({'token':req.body.token},function(err, tokenObject){
      if(err||!tokenObject){
        res.status(400).send("Cannot decode token.");
      }
      else{
        User.findOne({'_id':tokenObject.userId},function(err2,userObject){
          if(err2||!userObject){
            res.status(500).send("Failed to find user.");
          }
          else{
            var newPost = new Post({
                poster: {
                  name: userObject.fname + " " + userObject.lname,
                  id: userObject._id
                },
                content: req.body.content,
                createdAt: Date(),
            });
            newPost.save(function(err3, postObject){
              if(err3||!postObject){
                res.status(500).send("Failed to save data.");
              }
              else{
                var responseObject={
                  success:true,
                  response:postObject
                };
                res.json(responseObject);
              }
            });
          }
        });
      }
    });
  }
});

//Create new comment
app.post('/api/posts/comments/:post_id',function(req,res){  //TOKEN REQUIRED
  if(!req.body.token){
    res.status(400).send("Failed to supply token.");
  }
  if(!req.params.post_id){
    res.status(400).send("Empty Post ID.");
  }
  if(!req.body.content){
    res.status(400).send("No comment content.");
  }
  else{
    Token.findOne({'token':req.body.token},function(err, tokenObject){
      if(err || !tokenObject){
        res.status(400).send("Cannot decode token.");
      }
      else{
        User.findById(tokenObject.userId,function(err2,userObject){
          if(err2 || !userObject){
            res.status(500).send("Failed to find user.");
          }
          else{
            Post.findById(req.params.post_id,function(err3, postObject){
              if(err3 || !postObject){
                res.status(400).send("Invalid Post ID.");
              }
              else{
                var commentObject = {
                  createdAt: new Date(),
                  content: req.body.content,
                  poster: {
                    name: userObject.fname + " " + userObject.lname,
                    id: userObject._id
                  }
                };
                postObject.comments.push(commentObject);
                postObject.save(function(err4){
                  if(err4){
                    res.status(500).send("Failed to save data.");
                  }
                  else{
                    var responseObject={
                      success:true,
                      response:postObject
                    };
                    res.json(responseObject);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});


// Begin listening on port 3000
app.listen(3000, function(){
  console.log('Listening on port 3000');
});
