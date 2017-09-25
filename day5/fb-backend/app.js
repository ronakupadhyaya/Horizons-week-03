"use strict";

//Require and setup express
var express = require('express');
var app = express();

//Require and setup mongoose
var mongoose = require('mongoose');
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});

//REquire and setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Require and setup handlebars
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Require models
var Token = require('./models.js').Token;
var User = require('./models.js').User;
var Post = require('./models.js').Post;


/*-----------------------------*
 * Begining of route endpoints *
 *-----------------------------*/

app.post('/api/users/register', function(req, res) {
  var user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  // console.log("test", user);
  user.save(function(err) {
    if (err) {
      res.send(`Error: ${err}`);
    } else {
      res.send(`Success: ${user}`);
    }
  })
})

app.post('/api/users/login', function(req, res) {
  var id;
  User.find({
    email: req.body.email
  }, function(error, user) {
    if (user.length > 0) {
      id = user[0].id;
      console.log(id);
      var date = Date();
      var token = new Token({
        userId: id,
        createdAt: date,
        token: req.body.email + date
      })
      token.save(function(err) {
        if (err) {
          res.send(`Error: ${err}`)
        } else {
          res.send(`Success: ${token}`)
        }
      })
    } else {
      res.send("This user does not seem to exist")
    }
  })
})

app.get('/api/users/logout', function(req, res) {
  Token.findOneAndRemove({
    token: req.query.token
  }, function(error, token) {
    if (token) {
      res.send("Success")
    } else {
      res.send("The token could not be found")
    }
  })
})

app.get('/api/posts', function(req, res) {
  Token.findOne({
    token: req.query.token
  }, function(err, token) {
    if (token) {
      Post.find(function(error, posts) {
        if (posts) {
          res.send(posts);
        } else {
          res.send(`There were no posts: ${error}`);
        }
      })
    } else {
      res.send(`You do not have a valid token: ${err}`);
    }
  })
})

app.get('/api/posts/:page', function(req, res) {
  Token.findOne({
    token: req.query.token
  }, function(err, token) {
    if (token) {
      Post.find(function(error, posts) {
        if (posts) {
          var page = req.params.page * 10;
          res.send(posts.slice(page - 10, page));
        } else {
          res.send(`There were no posts: ${error}`);
        }
      })
    } else {
      res.send(`You do not have a valid token: ${err}`);
    }
  })
})

app.post('/api/posts', function(req, res) {
  Token.findOne({
    token: req.body.token
  }, function(err, token) {
    if (token) {
      User.findById(token.userId, function(error, user) {
        // console.log(user);
        var post = new Post({
          poster: `${user.fname} ${user.lname}`,
          content: req.body.message,
          likes: [],
          comments: [],
          createdAt: new Date()
        })
        // console.log("test");
        post.save(function(errorMessage) {
          if (errorMessage) {
            res.send(`There seems to have been an error: ${errorMessage}`);
          } else {
            res.send("Success");
          }
        })
      })
    } else {
      res.send(`You do not have a valid token: ${err}`);
    }
  })
})

app.get('/api/posts/comments/:post_id', function(req, res) {
  Token.findOne({
    token: req.query.token
  }, function(err, token) {
    if (token) {
      User.findById(token.userId, function(error, user) {
        if (user) {
          res.send(user.comments)
        } else {
          res.send(`There does not seem to be a user for this token... that's strange: ${error}`);
        }
      })
    } else {
      res.send(`You do not have a valid token: ${err}`);
    }
  })
})

app.post('/api/posts/comments/:post_id', function(req, res) {
  Token.findOne({
    token: req.body.token
  }, function(err, token) {
    if (token) {
      User.findById(token.userId, function(error, user) {
        if (user) {
          Post.findById(req.params.post_id, function(anotherError, post) {
            var comment = {
              createdAt: new Date(),
              content: req.body.message,
              poster: {
                name: `${user.fname} ${user.lname}`,
                id: token.userId
              }
            }
            post.comments.push(comment);
            post.save(function(errorMessage) {
              if (errorMessage) {
                res.send(errorMessage);
              } else {
                res.send("success");
              }
            })
          })
        }
      })
    }
  })
})

app.get('/api/posts/likes/:post_id', function(req, res) {
  Token.findOne({
    token: req.body.token
  }, function(err, token) {
    if (token) {
      User.findById(token.userId, function(error, user) {
        if (user) {
          Post.findById(req.params.post_id, function(anotherError, post) {
            var like = {
              name: `${user.fname} ${user.lname}`,
              id: token.userId
            }
            post.likes.push(like);
            post.save(function(errorMessage) {
              if (errorMessage) {
                res.send(errorMessage);
              } else {
                res.send("success");
              }
            })
          })
        }
      })
    }
  })
})

app.listen(3000, function() {
  console.log("Listenting on port 3000");
});
