// "use strict";
//Require express
var express = require('express');
var app = express();

// Require and setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Require express-handlebars
var exphbs  = require('express-handlebars');

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


// Require mongoose
var mongoose = require('mongoose');
// Establish mongoose connection to the mongoDB on mlab
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);

var models = require('./models.js');

var User = models.User;
var Token = models.Token;
var Post = models.Post;



app.get('/', function (req, res) {
  res.send('Hello World!')
})


app.post('/api/users/register', function(req, res){
  //obj property is what is in the model file, obj value is what you input when posting
  var newUser = new User({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function(error){
    if (error) {
      res.send(error)
    } else {
      res.send('wooo')
      // res.redirect('/api/users/login')
    }
  })
});

app.post('/api/users/login', function(req,res){
  // var loggingIn = {
  //   email: email,
  //   password: password
  // }
  User.findOne({email: req.body.email, password: req.body.password}, function(error, person) {
    if(error){
      res.send(error)
    } else {
      if(person === null){
        res.redirect('/api/users/register');
        return;
      }
      var newToken = new Token({
        userId: person.id,
        token: person.email + new Date(),
        createdAt: new Date()
      });

      newToken.save(function(error){
        if(error){
          res.send(error)
        } else {
          res.json({
            "success": true,
            "response": {
              "id": person.id,
              "token": newToken.token
            }
          });
        }
      });
    }
  });
});



app.post('/api/users/logout',function(req,res) {
  Token.remove({token: req.body.token}, function(error, tok) {
    if(error){
      res.send(error);
    } else {
      res.send('success')
    }
  });
});

app.get('/api/posts', function(req,res){
  Token.find({token: req.query.token}, function(error, tok) {
    if(error){
      res.send(error)
    } else if (tok === null){
      res.send("go home")
    } else {
      Post.find(function(error, foundPosts) {
        if(error){
          res.send(error)
        } else {
          res.json({
            "success":true,
            "response":foundPosts})
        }
      })
    }
  })
})

app.get('/api/posts/:page', function(req,res){
  Token.find({token: req.query.token}, function(error, tok) {
    if(error){
      res.send(error)
    } else if (tok === null){
      res.send("go home")
    } else {
      Post.find(function(error, foundPage) {
        if(error){
          res.send(error)
        } else {
          res.json({
            "success":true,
            "response":foundPage.slice((parseInt(req.params.page) - 1) * 10, (parseInt(req.params.page) - 1) * 10 + 10)
          })
        }
      })
    }
  })
})

app.post('/api/posts', function(req,res){
  Token.find({token: req.body.token}, function(error, tok) {
    if(error){
      res.send(error)
    } else if (tok === null){
      res.send("go home")
    } else {
      var newPost = new Post({
        poster: req.body.poster,
        content: req.body.content,
        likes: req.body.likes,
        comments: req.body.comments,
        createdAt: new Date()
      })
      newPost.save(function(error, stuff) {
        if(error){
          res.send(error)
        } else {
          res.json({
            "success" : true,
            "response": stuff
            // {
            //   "poster": {
            //     "name": stuff.name,
            //     "id": stuff.id
            //   },
            //   "content": stuff.content,
            //   "createdAt": stuff.createdAt,
            //   "_id": stuff.id,
            //   "comments": stuff.comments,
            //   "likes": stuff.likes
            // }
          })

        }
      })
    }
  })
})

app.get('/api/posts/comments/:post_id', function(req,res){
  Token.find({token: req.query.token}, function(error, tok) {
    if(error){
      res.send(error)
    } else if (tok === null){
      res.send("go home")
    } else {
      Post.findById(req.params.post_id, function(error, getComments) {
        if(error){
          res.send(error)
        } else {
          res.json({
            "success":true,
            "response":getComments})
        }
      })
    }
  })
})

app.post('/api/posts/comments/:post_id', function(req,res){
  Token.findOne({token: req.body.token}, function(error, tok) {
    console.log(tok);
    if(error){
      res.send(error)
    } else if (tok === null){
      res.send("go home")
    } else {
      Post.findById(req.params.post_id, function(error, post){
        console.log(post);
        if(error){
          res.send(error)
        } else {
          User.findById(tok.userId, function(error, user){
            if(error){
              res.send(error)
            } else {
              var newComment = {
                first: user.fName,
                last: user.lName,
                content: req.body.content
              }
              post.comments.push(newComment)
              post.save(function(error){
                if (error){
                  res.send(error);
                } else {
                  res.send({
                    "success":true,
                    "response": post
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})

app.get('/api/posts/likes/:post_id', function(req,res){
  
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
