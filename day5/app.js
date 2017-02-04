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

// TESTING
// app.get('/create-test-account', function(req, res) {
//   console.log('im here')
//   var user = new User({
//     fname: 'I am a test user',
//     lname: 'what up',
//     email: 'email',
//     password: 'hello'
//   });
//   user.save(function(err) {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.send('Success: created a User object in MongoDb');
//     }
//   });
// });
///////////////////////////////////////////////////////////////////////////


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
  // var user = new User({
  //   email: req.body.email,
  //   password: req.body.password
  // })
  // var token = new Token({
  //   userId: req.body._id,
  //   token: req.body.token,
  //   createdAt: req.body.createdAt
  // })
  User.findOne({email: req.body.email}, function(err, found) {
    if(err) {
      console.log(err);
    } else {
      if(found.password === req.body.password) {
        console.log('good')
        var token = new Token({
          userId: found._id,
          token: found._id + Date.now(),
          createdAt: Date.now()
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

//GET login

// GET POSTS Error

//GET POSTS
app.get('/api/posts', function(req, res) {
  if(req.query.token) {
    console.log('inside')
    Post.find({}, function(err, found) {
      if(err) {
        console.log(err);
      } else{
        console.log('hello')
        res.json(found);
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
    Token.findOne({token: req.body.token}, function(err, found) {
      if(err) {
        console.log(err)
      } else {
        // found is currently a token
        User.findOne({_id: found.userId}, function(err, found) {
          // found is now a user object
          console.log('THANKS HAM')
          if(err) {
            console.log(err)
          } else {
            console.log(found)
            var posterName = found.fname + " " + found.lname;
            var posterId = found._id; // ??????
            var post = new Post({
              poster: {
                name: posterName,
                id: posterId
              },
              content: req.body.content, // only token and content are part of body
              likes: [],
              comments: [],
              createdAt: Date.now() // probably need to convert to readable date later
            })
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
  console.log(req.params.id)
  if(req.body.token) { // check if token exists
    Post.findOne({'_id': mongoose.mongo.BSONPure.ObjectID.fromHexString(""+req.params.id)}, function(err, found) { // here we get the post
      if(err) {
        console.log(err);
      } else {
        console.log(found)
        // create new object but first find poster, then push object
        found.comments.push(req.body.content);
        found.save();
        res.json(found);
      }
    })
  } else {
    console.log('no token')
  }
});

            // Post.find({
            //   poster: {
            //     name: posterName,
            //     id: posterId
            //   }, function(err, found) {
            //     if(err) {
            //       console.log(err);
            //     } else {
            //       // FOUND IS NOW A POST OBJECT
            //
            //     }
            //   }
            // })
            //
            // var Post = new Post({
            //   //found is now the user
            //   poster: {
            //     name: found.fname + " " + found.lname,
            //     id: found._id //or found.userId???
            //   },
            //   content: req.body.content???,
            //   likes: req.body.likes???,
            //   comments: req.body.comments???,
            //   createdAt: req.body.createdAt???
            // })



    // var Post = new Post({
    //   poster: {
    //     name: ?, // SEARCH THROUGH TOKEN
    //     id: ? // SEARCH
    //   },
    //   content: req.body.content,
    //   likes: req.body.likes,
    //   comments: req.body.comments,
    //   createdAt: req.body.createdAt
    // })
    // res.redirect('/api/posts');
    // // OR res.render
    //




//////////////////////////////////////////////////////////////////////////////
console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
