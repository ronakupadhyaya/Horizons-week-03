var express = require('express'); // we need to be able to access different properties of express so we require it again. // we dont need body parser because we are not doing bodyparser.Router()
var router = express.Router();
var models = require('./models/models') // step into the models directory and grab models.js - importing this file from the module.export on models.js
var User = models.User;
var Token = models.Token;
var Post = models.Post;


router.get('/', function(req, res) {
  res.json({
    message: 'hello'
  }) // don't need to put quotation marks around message because it is assumed all keys are strings
});

// Registration

// look at api documention
router.post('/users/register', function(req, res) { // route to api/users/register
  var newUser = new User({ // imported this User from models.User
    fname: req.body.fname, //look at api documention to get this
    lname: req.body.lname, // every request has a head and a body. The head has a url and the method. The body has the key value pairs.
    email: req.body.email, // cookies are stored in the head.
    password: req.body.password // we can do req.body because we are using body parser
  });
  newUser.save(function(err, usr) {
    if (err) {
      res.json({
        failure: "database error"
      });
    } else {
      res.json({
        success: true // can't set headers error if you do this outside because of async. Every request has 1 response every response has 1 request
      });
    }
  }); //save takes a function that 1st arguement: error , 2nd argument: user that was just saved
});

// Login
router.post('/users/login', function(req, res) {
  // Get current date
  var dateObject = new Date();
  var currentTime = dateObject.getTime()
    .toString();
  User.find({
    email: req.body.email,
    password: req.body.password
  }, function(err, user) {
    console.log(user[0]._id);
    if (err) {
      console.log("User was not found");
    } else {
      var newToken = new Token({
        userId: user[0]._id,
        token: user[0]._id + currentTime,
        createdAt: currentTime
      });
      newToken.save(function(err, token) {
        if (err) {
          res.json({
            failure: "new token could not saved"
          });
        } else {
          res.json({
            success: "Successfully logged in", // can't set headers error if you do this outside because of async. Every request has 1 response every response has 1 request
            response: {
              id: token.userId,
              token: token.token
            }
          });
        }
      });
    }
  });
});

router.get('/users/logout/', function(req, res) {
  Token.remove({
    token: req.query.token
  }, function(err, token) {
    // console.log("token", token[0]);
    if (err) {
      res.json({
        failure: "could not logout"
      });
    } else {
      res.json({
        success: "successfully logged out"
      });
    }
  });
});

router.post('/posts/', function(req, res) {
  Token.find({
      token: req.body.token
    },
    function(err, token) {
      // console.log(user);
      if (err) {
        console.log("User is not authorized to make the post");
      } else {
        User.find({
          userId: token.userId
        }, function(err, user) {
          // console.log(user);
          var newPost = new Post({
            poster: {
              name: user[0].fname,
              id: user[0]._id
            },
            content: req.body.content,
            likes: [],
            comments: [],
            createdAt: new Date()
          });
          newPost.save(function(err, post) {
            if (err) {
              res.json({
                failure: "Could not save post"
              });
            } else {
              console.log("posterId", post.poster.id);
              res.json({
                success: "Succesfully made a post", // can't set headers error if you do this outside because of async. Every request has 1 response every response has 1 request
              });
            }
          });
        });
      }
    });
});

router.get('/posts/:page/', function(req, res) {
  Token.find({
    token: req.query.token
  }, function(err, token) {
    if (err) {
      console.log("Could not identify token", token);
    } else {
      // console.log("Token", token);
      Post.find({}, function(err, posts) {
        // console.log(posts);
        posts.sort(function(a, b) {
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
        // console.log(posts);
        console.log(req.params.page);
        var editedPosts = posts.slice(10 * (req.params.page - 1), req.params.page * 10);
        console.log(posts);
        res.json({
          success: true,
          response: editedPosts
        });
      });
    }
  });
});


module.exports = router; // trying to require all the routes on app.js because you are requireing './apiroutes') which is an import
