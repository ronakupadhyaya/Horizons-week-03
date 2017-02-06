var express = require('express');
var exphbs  = require('express-handlebars');
var config = require('./config');
var mongoose = require('mongoose');
var Post = require('./models/post').Post;
var Token = require('./models/token').Token;
var User = require('./models/user').User
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.MONGODB_URI);

mongoose.connection.on('connected', function(){
  console.log('success')
})

console.log(config)
// boiler plate for using layouts
// assumes layouts folder and partials folder inside
// views folder
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('view engine', 'hbs');

app.post('/api/users/register', function(req, res){
  // User.findOne({email: req.body.email}, function())
  var user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  user.save(function(err) {
    if(err) {
      res.status(400).json(err)
    } else {
      res.send({success: true})
    }
  })
})

app.post('/api/users/login', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({email:email}, function(err, user) {
    if(err) res.status(400).json(err);
    else{
      var t = req.body.email + new Date();
      if(password === user.password) {
        var token = new Token({
          userId: user._id,
          token: t,
          createdAt: new Date()
        })
        token.save(function(err) {
          if(err) console.log(err);
        })
        res.status(200).json({success: true, response:{id: user._id, token: t}})
      } else {
        res.status(301).json({error: "Login failed."})
      }
    }
  })
})

app.get('/api/users/login', function(req, res){
  res.status(401).json({error: "Login failed."})
})

app.get('/api/posts/error', function(req, res){
  res.status(401).json({error: "Action not allowed. Please authenticate."})
})

app.get('/api/posts', function(req, res) {
  Token.findOne({token:req.query.token},function(err, foundTokens){
    if(err) console.log(err);
    if(foundTokens) {
      Post.find().sort({createdAt: -1}).limit(10).exec(function(err, posts) {
        if(err) console.log(err);
        else{
          res.status(200).json({success: true, response: posts})
        }
      })
    } else {
      res.redirect('/api/posts/error')
    }
  })
})

app.get('/api/posts/:numberOfPosts', function(req, res) {
  Token.findOne({token:req.query.token},function(err, foundTokens){
    if(err) console.log(err);
    if(foundTokens) {
      Post.find().sort({createdAt: -1}).limit(10 * req.params.numberOfPosts).exec(function(err, posts) {
        if(err) console.log(err);
        else{
          res.status(200).json({success: true, response: posts})
        }
      })
    } else {
      res.redirect('/api/posts/error')
    }
  })
})


app.post('/api/posts', function(req,res){
  var postData = req.body;
  if(postData.content !== '') {
    Token.findOne({token:postData.token}, function(err, tokens) {
      if(err) res.status(400).json({error: "No post content."});
      User.findOne({_id:tokens.userId}, function(err, user) {
        if(err) console.log(err);
        else { 
          var newPost = new Post({
            poster: {
              name: user.fname +" "+ user.lname,
              id: user._id
            },
            content: postData.content,
            comments: [],
            likes: [],
            createdAt: new Date()
          });
          newPost.save(function(err){
            if(err) console.log(err);
          })
          res.status(200).json({success:true, response: newPost})
        }
      })
    })
  } else {
    res.status(400).json({error: "No post content!"})
  }
})

app.post('/api/posts/comments/:id', function(req,res){
  var commentData = req.body;
  if(commentData.content !== '') {
    Token.findOne({token:commentData.token}, function(err, foundTokens) {
      if(err) res.status(400).json({error: err});
      User.findOne({_id:foundTokens.userId}, function(err, foundUser) {
        if(err) console.log(err);
        Post.findOne({_id:req.params.id}, function(err, foundPost) {
          if(err) console.log(err);
          else {
            foundPost.comments.push({
              createdAt: new Date(),
              content: commentData.content,
              poster: {
                name: foundUser.fname + " "+ foundUser.lname,
                id: foundUser._id
              }
            })
            foundPost.save(function(err){
              if(err) console.log(err);
            })
            res.status(200).json({success:true, response: foundPost})
          }
        })
      })
    })
  } else {
    res.status(400).json({error: "No post content!"})
  }
})

app.get('/api/posts/likes/:id', function(req,res){
  Token.findOne({token:req.query.token},function(err, foundToken){
    if(err) console.log(err);
    if(foundToken){
      User.findOne({_id:foundToken.userId}, function(err, foundUser) {
        if(err) console.log(err);
        Post.findOne({_id: req.params.id}, function(err, foundPost) {
          if(err) console.log(err);
          var postLikes = foundPost.likes;
            var counter = 0;
            if(postLikes.length === 0){
              postLikes.push({
                name: foundUser.fname+" "+foundUser.lname,
                id: foundUser._id
              })
            } else {
            for(var i=0;i<postLikes.length;i++) {
              if(postLikes[i].id.$oid === foundUser._id.$oid) {
                postLikes.splice(i,1);
                break;
              }
              else {
                console.log('add')
                counter++
                if(counter === postLikes.length){
                  postLikes.push({
                    name: foundUser.fname+" "+foundUser.lname,
                    id: foundUser._id
                  })
                }
              }
            }}
          foundPost.save(function(err){
            if(err) console.log(err);
          })
          res.status(200).json({success:true, response: foundPost})
        })
      })
    } else {
      res.redirect('/api/posts/error')
    }
  })
})

app.post('/api/users/logout', function(req,res){
  Token.findOne({token:req.body.token},function(err, foundToken){
    if(err) console.log(err);
    foundToken.remove()
    res.status(200).json({success: true})
  })
})





app.listen(3000);
