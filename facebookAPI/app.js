var fs = require('fs');
var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var Token = require('./models/token')
var User = require('./models/user')
var Post = require('./models/post')

var mongoose = require('mongoose');

if (! fs.existsSync('./config.js')) {
  throw new Error('config.js file is missing');
}
var config = require('./config');
if (! config.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in file config.js');
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in config.js');
  process.exit(1);
});
mongoose.connect(config.MONGODB_URI);

var config = require('./config');
if (! config.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in file config.js');
}


app.post('/api/users/register', function(req, res) {

  if(req.body.fname==='' || req.body.lname === '' || req.body.email === '' || req.body.password === ''){

    res.status(400).json("Missing Information");
  } else{

    var newUser = new User({

      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save(function(err) {

      if(err){
        res.status(400).json("Couldn't save user.");

      } else{
        console.log("New User Created.");
        res.status(200).json({
          "success": true,
          response: newUser
        });
      }
    });
  }
});

app.post('/api/users/login', function(req, res) {

  if(req.body.email === "" || req.body.password === ""){
    res.status(400).json({"Error": "Missing Information."});
  } else{

    User.find(function(err, users){

    if(err){
      res.status(400).json(err);
    }


    var login = false;
    for(var i=0; i<users.length; i++){
      
      if(users[i].email === req.body.email && users[i].password === req.body.password){

        login = true;
      }
    }

    if(!login){
      res.status(301).json({"Error": "Email or password does not match"});
    } else{

      var newUserToken = new Token({

        userId: req.body.email,
        token: req.body.email + new Date(),
        createdAt: new Date()

      });

      newUserToken.save(function(err){

        if(err){
          console.log(err);
        } else{

          res.status(200).json({

            "success": true,
            "response": {
              "id": newUserToken.userId,
              "token": newUserToken.token
            }
          });
        }
      });
    }
  });
  }
});


app.get('/api/users/login', function(req, res){

  res.status(401).json({
    "Error": "Login failed."
  });
});

app.get('/api/posts/error', function(req, res){

  res.status(401).json({"error": "Action is not allowed. Please authenticate"});

});


app.post('/api/posts', function(req, res){

  if(req.body.token === "" || req.body.content === ""){
    res.status(400).json({"Error": "Missing token or content for post."});
  } else{

    var tokenExists = false;
    var userId;

    //To Verify User is logged
    Token.find(function(err, tokens){

      tokens.forEach(function(token){

        if(token.token === req.body.token){
          // console.log("Hit here!!!");
          tokenExists = true;
          userId = req.body.userId;
        } 
      });

      if(!tokenExists){
      console.log(req.body.token);
      res.status(400).json({"Error": "User is not logged in."});
    } else{

      var fname;
      var lname;
      var trueUserId;

      User.find(function(err, users){

        if(err){
          res.status(400).json({"Error": "Could not get list of users."});
        } else{

          users.forEach(function(user){

            console.log("BLAH BLAH");
            console.log(user.email);
            console.log(userId);

            if(user.email === userId){
              fname = user.fname;
              lname = user.lname;
              trueUserId = user.id;
              console.log("***********************");

              console.log(fname);
              console.log(lname);
              console.log(trueUserId);

              console.log("***********************");
            }
          });

          var newPost = new Post({

            poster: {
              name: fname + lname,
              id: trueUserId
            },
            
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: new Date()

          });

          newPost.save(function(err){

            if(err){
              res.status(400).json({"Error": "Could not save new post."});
            } else{
              res.status(200).json({"success": true});
            }
          });
        }
      });
    }

    });

    
  }
});

app.post('/api/users/logout', function(req, res){

  if(req.body.token === ""){
    res.status(400).json({"Error": "Did not pass in a token."});
  } else{

    Token.findOne({"token": req.body.token}, function(err, token){

      if(err){
        res.status(400).json(err);
      } else{

        token.remove(function(err){

          if(err){
            res.status(400).json(err);
          } else{

            res.status(200).json({
              "success": true
            });
          }

        });

      }

    });

  }




});



console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);







