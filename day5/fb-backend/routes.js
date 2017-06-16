"use strict";

// Routes, with inline controllers for each rout
var express = require('express');
var router = express.Router();

//models
var Token = require('./models').Token;
var User = require('./models').User;
var Post = require('./models').Post;

var strftime = require('strftime');
var _ = require('underscore');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var expressValidator = require('express-validator');
router.use(expressValidator());

router.get('/', function(req, res) {
  // res.render('login');
})

//PART3: USERS
//REgistration creat4e new user and save it ot mongodb
router.post('/api/users/register', function(req,res){

  //VALIDATE FIELDS
  console.log(req.body);
  console.log(req.body.fname,req.body.lname,req.body.email,req.body.password);
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;
  var password = req.body.password;

  var newuser = new User({
    fname: firstname,
    lname: lastname,
    email: email,
    password: password
  })

  newuser.save(function(error){
    if(error){
      console.log("copuldnt save new user",error);
      res.send(error);
    }else{
      console.log("user successfully created and saved");
      res.send('successful');
      // res.render('posts')
    }
  })

})

router.post('/api/users/login', function(req,res){
  //validate user info
  //if valid user
  //check to make sure there are no tokens with this userid or else that means they are already loggedin
  var email = req.body.email;
  var pword = req.body.password;
  req.checkBody('email','must enter username').notEmpty();
  req.checkBody('password','password must be entered').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    res.status(400).send("must enter fields to login");
  }else{
    User.findOne({email: email, password: pword}, function(error,userobj){
      if(error){
        console.log("error finding user with that info");
        res.status(500).json(err);
      }else{
        var userid = userobj._id;
        var datenow = new Date();

        var usertoken = new Token({
          userId: userid,
          token: email+datenow,
          createdAt: datenow
        })

        usertoken.save(function(error){
          if(error){
            console.log("error saving token");
            res.send(error);
          }else{
            // console.log("token successfully created and saved");
            res.send("token successfully created and saved");
            // res.render('')
          }
        })
        // localStorage.setItem('token', usertoken);

      }
    })
  }


})

router.get('/api/users/logout', function(req,res){
  var token = req.query.token;
  console.log(token);
  req.check('token','token not passed in request').notEmpty();
  var errors = req.validationErrors();
  // console.log(req.params);
  if(errors){
      console.log("errors token not found");
      res.status(400).send("failed to supply token")
  }else{
    Token.findOne({"token": token}, function(error,tokenobj){
      if(error){
        res.status(400).send("error finding token..?");
      }else{
        if(tokenobj){
          console.log(tokenobj);
          tokenobj.remove();
          res.send("token found and removed- logged out");

        }else{
          res.status(401).send("token not found")
        }

      }
    })
  }

})



//PART4 POSTS
router.get('/api/posts/', function(req,res){
  var token = req.query.token;
  console.log(token);
  req.check('token','token not passed in request').notEmpty();
  var errors = req.validationErrors();
  // console.log(req.params);
  if(errors){
      console.log("errors token not found");
      res.status(400).send("failed to supply token")
  }else{
    Token.findOne({"token": token}, function(error,tokenobj){
      if(error){
        res.status(400).send("error finding token..?");
      }else{
        if(tokenobj){
          console.log("token was found about to display posts");
          //find the posts
          Post.find({}, function(error,posts){
            if(error){
              console.log("error finding posts");
            }else{
              if(posts){
                res.status(200).send(posts);
              }
            }
          })



        }else{
          res.status(500).send("token cant be verified- are u logged in")
        }

      }
    })
  }

})

router.get('/api/posts/:page', function(req,res){

})

router.post('/api/posts/', function(req,res){
  var token = req.query.token;
  var content = req.body.content;

  // console.log("token", req.query.token, req.params.token);
  // console.log("Request body", req.body);
  req.check('token','token not passed in request').notEmpty();
  req.check('content','no content provided for post').notEmpty();
  var errors = req.validationErrors();
  // console.log(req.params);
  if(errors){
      console.log("errors token not found");
      res.status(400).send("failed to supply token")
  }else{
    Token.findOne({"token": token}, function(error,tokenobj){
      if(error){
        res.status(400).send("error finding token..?");
      }else{
        if(tokenobj){
          var userid = tokenobj.userId;
          // console.log("user id", userid);
          console.log("token was found now allowed to post");
          User.findOne({"_id": userid}, function(error,userobj){
            if(error){
              console.log("error finding user with that id");
            }else{
              if(userobj){
                console.log("user was found");
                var datenow = new Date();
                var newpost = new Post({
                  poster: userobj,
                  content: content,
                  likes: [],
                  comments: [],
                  createdAt: datenow
                })
                newpost.save(function(error){
                  if(error){
                    console.log("error saving post");
                    res.send(error);
                  }else{
                    // console.log("token successfully created and saved");
                    res.send("post successfully saved");
                    // res.render('')
                  }
                })

              }else{
                console.log("user not found");
              }
            }
          })


        }else{
          res.status(500).send("token cant be verified- are u logged in")
        }

      }
    })
  }

})


router.get('/api/posts/comments/:post_id', function(req,res){

})

router.post('/api/posts/comments/:post_id', function(req,res){

})

router.get('/api/posts/likes/:post_id', function(req,res){

})




module.exports = router;
