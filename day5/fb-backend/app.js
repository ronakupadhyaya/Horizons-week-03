"use strict";

var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var mongoose = require('mongoose');
var fs = require('fs');

var app = express();


// Handlabars setup
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Setup express-validator
app.use(validator());

//connect to mongoDB

// if (! fs.existsSync('./env.sh')) {
//   throw new Error('env.sh file is missing');
// }
// if (! process.env.MONGODB_URI) {
//   throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
// }
//
// mongoose.connection.on('connected', function() {
//   console.log('Success: connected to MongoDb!');
// });
// mongoose.connection.on('error', function() {
//   console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
//   process.exit(1);
// });


mongoose.connect(process.env.MONGODB_URI);


console.log('Hello!');
var Token = mongoose.model('Token', {
    userId: String,
    token: String,
    createdAt: Date
  })

var User = mongoose.model('User', {
    fname: String,
    lname: String,
    email: String,
    password: String
})

var Post = mongoose.model('Post', {
  poster: Object,
    content: String,
    likes: Array,
    comments: Array,
    createdAt: Date
})

app.post('/api/users/register', function(req, res){

  //Add tests

        var newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
      });

    newUser.save(function(err,user){
      if(err){
        res.send(err);
      } else {
        res.send({'success':true});
      }
    });

  });

app.post('/api/users/login', function(req, res){
console.log('here');
  User.findOne({email: req.body.email, password: req.body.password}, function(err, user){
    if(!err){
      var date = new Date();
      date = date.getTime();
      var token = req.body.email + date;

      var newToken = new Token({
      userId: user._id,
      token: token,
      createdAt: Date.now()
    })

    newToken.save(function(err, token){
      if(err){
        console.log('token not save - ERROR');
      } else{
        console.log('Token saved');
      }
    })
      var obj = {
        'success': true,
        'response': {
          'id': user._id,
          'token': {
            'userId': user._id,
            'token': token,
            'createdAt': Date.now()
          }
        }
      }
      console.log('yes');
      res.send(obj);
    } else{
      console.log('fuck');
      res.send({'error': err});
    }
  })
})

app.get('/api/users/logout', function(req, res){

  Token.remove({token: req.query.token}, function(err, token){
    if(!err){
      console.log(err, token);
      res.send({sucess: true});
    } else{
      res.send({error: err});
    }
  })
})

app.post('/api/posts/', function(req, res){

  var token = req.body.token;
  var content = req.body.content;
  var posterObj = null;
  var dateNow = Date.now()

  Token.findOne({token: req.body.token}, function(err, token){
    if(!err && token){
      var userId = token.userId;
      User.findOne({_id: userId}, function(err, user){
        posterObj = {
          name: user.fname + ' ' + user.lname,
          id: user._id
        }
        var newPost = new Post({
            poster: posterObj,
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: dateNow
        })

        newPost.save(function(err){
          if(!err){
            res.send({
              success: true,
              response: newPost
            })
          }
        });

      })
    } else{
      res.send({error: err});
    }
  })
})

app.get('/api/posts/', function(req, res){
  var token  = req.query.token;
  Token.findOne({token: req.query.token}, function(err, token){
    if(!err){
      Post.find(function(err, array){
        if(!err){
          res.send({
            success: true,
            response: array
          })
        } else{
          res.send({
            error: err
          })
        }
      })
    } else{
      res.send({
        error: err
      })
    }
  })
})

app.post('/api/posts/comments/:postid', function(req, res){
  var postId = req.params.postid;
  var content = req.body.content;
  var posterId;
  var posterName = '';
  var posterObj;
  var commentObj;

  Token.findOne({token: req.body.token}, function(err, token){
    if(!err){
      posterId = token.userId;
      User.findOne({_id: posterId}, function(err, user){
        if(!err){
          posterName = user.fname + ' ' + user.lname;
          posterObj = {
            name: posterName,
            id: posterId
          }

          commentObj = {
            createdAt: new Date(),
            content: content,
            poster: posterObj
          }

          Post.findOne({_id: postId}, function(err, post){
            if(!err && post){
            var comments = post.comments;
            comments.push(commentObj);
            post.comments = comments;
            post.save();
            res.send({
              success: true,
              response: post
            });
          } else{
            console.log('Err or No Post', err, post)
          }
          })
        }
      })
    }
  })
})





console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
