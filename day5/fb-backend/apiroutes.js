/*jslint node: true */
var express = require("express");
var router = express.Router();
var models = require("./models/models");
var User = models.User;
var Token = models.Token;
var Post = models.Post;




// POST /api/users/register

//create new user and save to database

router.post("/users/register", function(req, res) {
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save(function(err, newUser) {
    if (err) {
      console.log("Could not save user to database.");
      res.json({failure: "database error"});
    } else {
      res.json({success: true});
    }
  });
});
//
// POST /api/users/login
router.post("/users/login", function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      console.log("user not in database");
      res.status(301).send("Login failed.");
    } else if(req.body.password !== user.password) {
      console.log("wrong password");
      res.status(301).send("Wrong password");
    } else {
      var tokenInfo = {
        userId: user._id,
        token: user.email + new Date(),
        createdAt: new Date()
      };
      var newToken = new Token(tokenInfo);
      newToken.save(function(err, token) {
        if (err) {
          console.log("Could not save token to database.");
          res.json({failure: "database error"});
        } else {
          res.json({success: true});
        }
      });
    }
  });
});


router.post("/users/logout", function(req, res) {
  if (!req.body.token) {
    res.status(400).send("You did not supply a token");
  }
  Token.remove({token: req.body.token}, function(err, res) {
    if (err) {
      res.status(401).send("You are not authorized");
    } else {
      console.log("You have successfully logged out.");
    }
  });

});



// GET /api/posts/ (🔒)
// GET /api/posts/:page (🔒)
// POST /api/posts/ (🔒)
// GET /api/posts/comments/:post_id (🔒)
// POST /api/posts/comments/:post_id (🔒)
// GET /api/posts/likes/:post_id (🔒)



router.get("/posts", function(req, res) {
  if (!req.query.token) {
    res.status(400).send("Failed to supply token");
  } else {
    var userToken = decodeURIComponent(req.query.token);
    Token.find({token: userToken}, function(err, token) {
        if (err) {
          res.status(500).send("Token cannot be verified");
        } else {
          Post.find({})
          .sort('-createdAt')
          .limit(10)
          .exec(function(err, posts) {
            if (err) {
              res.status(500).send("Failed to query posts");
            } else {
              res.json({success: true, response: posts});
            }
        });
      }
    });
  }
});


router.get("/posts/:page", function(req, res) {
  if (!req.query.token) {
    res.status(400).send("Failed to supply token");
  } else {
    var userToken = decodeURIComponent(req.query.token);
    Token.find({token: userToken}, function(err, token) {
      var startPage = ~~+req.params.page;
        if (err) {
          res.status(500).send("Token cannot be verified");
        } else {
          Post.find({})
          .sort('-createdAt')
          .skip(10 * startPage - 10)
          .limit(10)
          .exec(function(err, posts) {
            if (err) {
              res.status(500).send("Failed to query posts");
            } else {
              res.json({success: true, response: posts});
            }
        });
      }
    });
  }
});


router.post("/posts", function(req, res) {
  if (!req.body.token) {
    res.status(400).send("Failed to supply token");
  } else {
    Token.find({token: req.body.token}, function(err, token) {
        if (err) {
          res.status(500).send("Token cannot be verified");
        } else {
          User.findOne({userId: token.userId}, function(err, user){
            if (err) {
              res.status(500).send("Cannot find user.");
            } else {
              var poster = {
                id: user._id,
                name: user.fname + " " + user.lname
              };
              var postInfo = {
                poster: poster,
                content: req.body.content,
                createdAt: new Date(),
                comments: [],
                likes: []
              };
              var newPost = new Post(postInfo);
              console.log(newPost);
              newPost.save(function(err, post) {
                if (err) {
                  res.status(500).send("Failed to save data.");
                } else {
                  res.json({success: true, response: newPost});
                }
              });
            }
          });
      }
    });
  }
});


router.get("/posts/comments/:post_id", function(req, res) {
  if (!req.query.token) {
    res.status(400).send("Failed to supply token");
  } else if (!req.params.post_id){
    res.status(400).send("Empty post ID");
  } else {
    Token.find({token: req.query.token}, function(err, token) {
        if (err) {
          res.status(500).send("Token cannot be verified");
        } else {
          User.findOne({userId: token.userId}, function(err, commenter){
            if (err) {
              res.status(500).send("Failed to find user");
            } else {
              Post.findOne({_id: req.params.post_id}, function(err, post) {
                if (err) {
                  res.status(400).send("Invalid post ID.");
                } else {
                  res.json({success: true, response: post.comments});
                }
              });
            }
          });
      }
    });
  }
});


router.post("/posts/comments/:post_id", function(req, res) {
  if (!req.body.token) {
    res.status(400).send("Failed to supply token");
  } else if (!req.params.post_id){
    res.status(400).send("Empty post ID");
  } else if (!req.body.content) {
    res.status(400).send("No comment content.");
  } else {
    Token.find({token: req.body.token}, function(err, token) {
        if (err) {
          res.status(500).send("Token cannot be verified");
        } else {
          User.findOne({userId: token.userId}, function(err, commenter){
            if (err) {
              res.status(500).send("Failed to find user");
            } else {
              Post.findOne({_id: req.params.post_id}, function(err, post) {
                if (err) {
                  res.status(400).send("Invalid post ID.");
                } else {
                  var commenterInfo = {
                    name: commenter.fname + " " + commenter.lname,
                    id: commenter._id
                  };
                  var comment = {
                    poster: commenterInfo,
                    content: req.body.content,
                    createdAt: new Date()
                  };
                  post.comments.push(comment);
                  post.save(function (err, post) {
                    if (err) {
                      res.status(500).send("Failed to save data.");
                    } else {
                      res.json({success: true, response: comment});
                    }
                  });
                }
              });
            }
          });
      }
    });
  }
});


router.get("/posts/likes/:post_id", function(req, res) {
  if (!req.query.token) {
    res.status(400).send("Failed to supply token");
  } else if (!req.params.post_id){
    res.status(400).send("Empty post ID");
  } else {
    var likerToken = decodeURIComponent(req.query.token);
    Token.findOne({token: likerToken}, function(err, token) {
        if (err) {
          res.status(500).send("Token cannot be verified");
        } else {
          User.findOne({_id: token.userId}, function(err, liker){
            if (err) {
              res.status(500).send("Failed to find user");
            } else {
              Post.findOne({_id: req.params.post_id}, function(err, post) {
                if (err) {
                  res.status(400).send("Invalid post ID.");
                } else {
                  var likes = post.likes;
                  var likeIndex = -1;
                  for (var i = 0; i < likes.length; i++) {
                    if (likes[i].id.toString() === liker._id.toString()) {
                      likeIndex = i;
                    }
                  }
                  if (likeIndex !== -1) {
                    likes.splice(likeIndex, 1);
                  } else {
                    likeObj = {
                      name: liker.fname + " " + liker.lname,
                      id: liker._id
                    };
                    likes.push(likeObj);
                  }
                  post.likes = likes;
                  post.save(function (err, save) {
                    if (err) {
                      res.status(500).send("Failed to save data.");
                    } else {
                      res.json({success: true});
                    }
                  });
                }
              });
            }
          });
      }
    });
  }
});










module.exports = router;
