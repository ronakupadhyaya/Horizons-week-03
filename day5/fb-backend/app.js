"use strict";

var express = require('express');
var exphbs = require('express-handlebars')
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();
var mongoose = require('mongoose');
var Token = require('./model/token')
var User = require('./model/user')
var Post = require('./model/post')


if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(expressValidator());



app.post('/api/users/register', function(req, res){
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save({}, function(error, nUser){
    if (error) {
      console.log("failed to create new user");
    } else {
      console.log("created new user");
      res.send(nUser);
    }
  });
});

app.post('/api/users/login', function(req, res){
  var newToken = new Token ({
    userId: req.body._id,
    token: req.body.email + new Date(),
    createdAt: new Date()
  });
  newToken.save({}, function(error, nToken){
    if (error) {
      console.log("failed to create new token");
    } else {
      console.log("created new token");
      res.send(nToken);
    }
  });
});

app.get('/api/users/logout', function(req, res){
  Token.findByIdAndRemove(req.body._id, function(error, foundId){
    if(error) {
      console.log("logout error");
    } else {
      console.log("you logged out");
    }
  });
});

app.get('/api/posts', function(req, res){
  Token.findById(req.body._id, function(error, foundId){
    if (error) {
      console.log("couldn't get id for get posts");
    } else {
      console.log("found id for get posts");
      Post.find({}).sort('-date').limit(10).exec(function(error, firstTen){
        if(error){
          console.log("didn't find first ten posts");
        } else {
          console.log("found first ten posts");
          res.send(firstTen);
        }
      })
    }
  });
});

app.get('/api/posts/:page', function(req, res){
  Token.findById(req.body._id, function(error, foundId){
    if (error) {
      console.log("couldn't get id for get posts");
    } else {
      console.log("found id for get posts");
      Post.find({}).sort('-date').skip((parseInt(req.params.page)-1)*10).limit(10).exec(function(error, xTen){
        if(error){
          console.log("didn't find page posts");
        } else {
          console.log("found page posts");
          res.send(xTen);
        }
      })
    }
  });
});

app.post('/api/posts', function(req, res){
  Token.findById(req.body._id, function(error, foundId){
    if (error) {
      console.log("couldn't get id for post posts");
    } else {
      console.log("found id for post posts");
      var newPost = new Post ({
        poster: req.body.poster,
        content: req.body.content,
        likes: req.body.likes,
        comments: req.body.comments,
        createdAt: req.body.createdAt
      });
      newPost.save(function(error, nPost){
        if (error) {
          console.log("couldn't post new post");
        } else {
          console.log("posted new post");
          res.send(nPost);
        }
      });
    }
  });
});

app.get('/api/posts/comments/:post_id', function(req, res){
  Token.findById(req.body._id, function(error, foundId){
    if(error) {
      console.log("couldn't get id for comments");
    } else {
      Post.findById(req.params.post_id, function(error, foundPostId){
        if(error){
          console.log("couldn't find postid");
        } else {
          console.log("found postid");
          res.send(foundPostId.comments);
        }
      })
    }
  })
});


app.post('/api/posts/comments/:post_id', function(req, res){
  Token.findById(req.body._id, function(error, foundId){
    if(error) {
      console.log("couldn't get id for comments");
    } else {
      Post.findById(req.params.post_id, function(error, foundPostId){
        if(error){
          console.log("couldn't find postid");
        } else {
          console.log("found postid");
          var newComment ={
            createdAt: new Date(),
            content: req.body.content,
            poster: req.body.poster
          }
          foundPostId.comments.push(newComment);
          foundPostId.save(function(error, uPost){
            if(error) {
              console.log("couldn't add new comment");
            } else {
              console.log("comment saved");
              res.send(uPost);
            }
          })
        }
      })
    }
  })
});

app.get('/api/posts/likes/:post_id', function(req, res){
  Token.findById(req.body._id, function(error, foundId){
    if(error) {
      console.log("couldn't get id for likes");
    } else {
      Post.findById(req.params.post_id, function(error, foundPostId){
        if(error){
          console.log("couldn't find postid");
        } else {
          console.log("found postid");
          res.send(foundPostId.likes);
        }
      })
    }
  })
});



console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
