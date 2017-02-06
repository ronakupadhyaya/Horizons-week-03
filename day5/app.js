var mongoose = require('mongoose');
var express = require('express');
var app = express();
var fs = require('fs');
var exphbs  = require('express-handlebars');
var path = require('path');
// var logger = require('morgan');
var bodyParser = require('body-parser');
// var validator = require('express-validator');
var User = require('./models/user').User;
var Token = require('./models/token').Token;
var Post = require('./models/post').Post;
var ObjectId = mongoose.Types.ObjectId;
var config = require('./config');
if (! fs.existsSync('./config.js')) {
  throw new Error('config.js file is missing');
};
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in config.js');
  process.exit(1);
});
mongoose.connect(config.MONGODB_URI);

// Handlebars setup
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// app.use(logger('dev'));

// Parse req.body contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup express-validator
// app.use(validator());

// Read static files in /public
app.use(express.static(path.join(__dirname, 'public')));

// MY ROUTES
app.get('/', function(req, res) {
  res.render('index.hbs')
})

// REGISTER!
app.post('/api/users/register', function(req, res) {
  var user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
  user.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      // res.send('Success: registered a user object in MongoDb');
      res.json(user)
    }
  });
});

//VALIDATION FOR REGISTER: IF ACCOUNT ALREADY EXISTS, DON'T ALLOW
app.post('/api/users/login', function(req, res) {
  User.findOne({email: req.body.email}, function(err, found) {
    if(err) {
      console.log(err);
    } else {
      if(found.password === req.body.password) {
        console.log('good')
        var token = new Token({
          userId: req.body.email,
          token: req.body.email + new Date(),
          createdAt: new Date()
        })
        token.save(function(err) {
          if(err) {
            console.log(err)
          } else {
            res.send('saved token')
          }
        })
        res.json({
          message: 'hello',
          token: token
        })
      }
    }
  })
});

app.post('/api/users/logout', function(req, res) {
  Token.findOne({token: req.body.token}, function(err, found) {
    if(err) {
      console.log(err);
    } else {
      found.remove();
      res.json({
        message: 'logged out'
      })
    }
  })
})

//GET POSTS
app.get('/api/posts', function(req, res) {
  if(req.query.token) {
    console.log('inside')
    Post.find(function(err, posts) {
      if(err) {
        console.log(err);
      } else{
        console.log('hello')
        console.log(posts)
        res.status(200).json({
          "success": true,
          "response": posts
        })
      }
    })
  }
})

// MAKE POST
app.post('/api/posts', function(req, res) {
  // validate that we're logged in. must validate contents as well
  console.log('outside')
  // RECEIVE TOKEN AND CONTENT
  if(req.body.token) {
    console.log('inside token')
    Token.findOne({'token': req.body.token}, function(err, token) {
      if(err) {
        console.log(err)
      } else {
        // found is currently a token
        User.findOne({'email': token.userId}, function(err, user) {
          // found is now a user object
          console.log('THANKS HAM')
          if(err) {
            console.log(err)
          } else {
            console.log('no error yet')
            var post = new Post({
              poster: {
                name: user.fname + " " + user.lname,
                id: user.id
              },
              content: req.body.content, // only token and content are part of body
              likes: [],
              comments: [],
              createdAt: new Date() // probably need to convert to readable date later
            })
            console.log(post)
            post.save(function(err) {
              if(err) {
                console.log(err);
              } else {
                console.log('post saved')
              }
            });
            res.json(post);
          }
        })
      }
    })
  } else {
    console.log('you didnt get in at all');
  }
})


// LIMIT NUMBER OF POSTS
  // app.get('/api/posts/:numberOfPosts', function(req, res) {
  //   if(req.query.token){
  //
  //   } else {
  //     console.log('no token');
  //   }
  // })


// GET COMMENTS OF A POST
app.get('/api/posts/comments/:id', function(req, res) {
  if(req.query.token) {
    Post.findById(req.params.id, function(err, found) {
      if(err) {
        console.log(err);
      } else {
        res.json(found.comments)
      }
    })
  } else {
    console.log('no token')
  }
});

// MAKE COMMENT ON A POST
app.post('/api/posts/comments/:id', function(req, res) {
  var token = req.body.token;
  var _id = req.params.id;
  Token.findOne({'token': token}, function(err, token) {
    if(err) {
      console.log(err);
    } else {
      Post.findOne({'_id': _id}, function(err, post) {
        if(err) {
          console.log(err);
        } else {
          User.findOne({'email': token.userId}, function(err, user) {
            var newComment = {
              createdAt: new Date(),
              content: req.body.content,
              poster: {
                name: user.fname + " " + user.lname,
                id: user.id
              }
            };
            var newArray = post.comments;
            newArray.push(newComment);
            Post.findOneAndUpdate({'_id': req.params.id}, {"comments": newArray},
            function(err, postUpdate) {
              if(err) {
                console.log(err);
              } else {
                res.json(postUpdate)
              }
            })
          })
        }
      })
    }
  })
});

// "GET" LIKES
app.get('/api/posts/likes/:id', function(req, res) {
  console.log('called')
  var myToken = req.query.token;
  console.log(myToken)
  var _id = req.params.id;
  Token.findOne({token: myToken}, function(err, token) { // omg findOne != find lmao
    if(err) {
      console.log(err);
    } else {
      Post.findOne({'_id': _id}, function(err, post) {
        if(err) {
          console.log(err);
        } else {
          User.findOne({'email': token.userId}, function(err, user) {
            var newLike = {
              name: user.fname + " " + user.lname,
              id: user.id
            }
            var newLikesArray = post.likes;
            newLikesArray.push(newLike);
            console.log('reached post')
            Post.findOneAndUpdate({'_id': _id}, {"likes": newLikesArray},
            function(err, newUpdate) {
              if(err) {
                console.log(err);
              } else {
                res.json(newUpdate);
              }
            })
          })
        }
      });
    }
  });
});
//////////////////////////////////////////////////////////////////////////////
console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
