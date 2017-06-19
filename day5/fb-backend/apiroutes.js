var express = require('express');
var router = express.Router();
var models = require('./models/models');
var User = models.User;
var Token = models.Token;
var Post = models.Post;

// Router is able
// app.js is actually able to spin up a server

router.get('/', function(req, res){
  res.send({message: 'hello'});
});

router.post('/users/register', function(req, res){
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  console.log(`req.body is ${req.body.fname}`);
  console.log(`newUser is ${newUser}`);

  newUser.save(function(err, usr){
    if (err) {
      res.json({failure: "database error"});
    } else {
      res.json({success: true});
    }
  });
});

// on log in
router.post('/users/login', function(req, res) {
  // assume successful login
  User.findOne({email: req.body.email, password: req.body.password}, function(err, user){

    if (err) {
      // err message here
      console.log('unsuccessful login credentials');
      res.json({error: err})
    } else {
      userId = user._id;
      console.log(`typeof userId is ${typeof userId}`);
      token = user.email.split('@').join("") + new Date();
      currentDate = new Date();

      var newTokenObj = new Token ({
        userId: userId,
        token: token,
        createdAt: currentDate
      });

      newTokenObj.save(function(err, usr){
        if (err) {
          console.log('Incorrect token');
        } else {

          res.json({
            success: true,
            response: {
              id: userId,
              token: token
            }
          });
        }
      });
    }
  });
});

// on log out
router.get('/users/logout', function(req, res) {
  var tokenId = req.query.token;

  Token.findOneAndRemove({token: tokenId}, function(err, token){
    if (err) {
      console.log('Incorrect token');
    } else {
      if (token) {
        res.json({success: true})
      } else {
        res.error(401);
      }
    }
  })
});

router.get('/posts/', function(req, res){
  var tokenId = req.query.token;
  var page = 1;
  Token.findOne({token: tokenId}, function(err, token){
    if (err) {
      console.log('Something went wrong with your token,', err);
    } else {
      if (token) {
        Post.find({}, function(err, posts){
          if (err) {
            console.log('Something went wrong with getting your posts', err);
          } else {
            var editedPosts = posts.sort(function(a, b){
              return b.createdAt.getTime() - a.createdAt.getTime();
            });
            res.json({
              success: true,
              response: editedPosts.splice(10 * (page - 1), 10 * page)
            });
          }
        });
      } else {
        res.status(401);
      }
    }
  });
});

router.get('/posts/:page', function(req, res){
  var tokenId = req.query.token;
  var page = req.params.page || 1;
  Token.findOne({token: tokenId}, function(err, token){
    if (err) {
      console.log('Something went wrong with your token,', err);
    } else {
      if (token) {
        Post.find({}, function(err, posts){
          if (err) {
            console.log('Something went wrong with getting your posts', err);
          } else {
            var editedPosts = posts.sort(function(a, b){
              return b.createdAt.getTime() - a.createdAt.getTime();
            });
            res.json({
              success: true,
              response: editedPosts.splice(10 * (page - 1), 10 * page)
            });
          }
        });
      } else {
        res.status(401);
      }
    }
  });
});

router.post('/posts/', function(req, res){
  var token = req.body.token;
  var post = req.body.post
  Token.findOne({token: token}, function(err, token){
    if (err) {
      console.log('Incorrect token');
    } else {
      if (token) {
        User.findById(token.userId, function(err, user){
          if (err) {
            console.log('Problem finding user');
          } else {
            var postObj = new Post({
              poster: {
                id: user._id,
                name: `${user.fname} ${user.lname}`,
              },
              content: post,
              createdAt: new Date(),
              comments: [],
              likes: []
            });
            postObj.save(function(err, post){
              if (err) {
                console.log('Saving post failed');
              } else {
                res.json(postObj);
              }
            })
          }
        });
      } else {
        res.status(401);
      }
    }
  });
});

router.get('/posts/comments/:post_id', function(req, res){
  var token = req.query.token;
  var postId = req.params.post_id;
  Token.findOne({token: token}, function(err, token){
    if(err){
      console.log("Token is not defined");
    } else {
      if (token) {
        Post.findById(postId, function(err, post){
          if (err) {
            console.log('Post not found');
          } else {
            if (post) {
              res.json({
                success: true,
                response: post.comments
              })
            } else {
              res.status(404)
            }
          }
        })
      } else {
        res.status(401);
      }
    }
  });
});

router.post('/posts/comments/:post_id', function(req, res){
  var token = req.body.token;
  var postId = req.params.post_id;
  var content = req.body.content;
  Token.findOne({token: token}, function(err, token){
    if(err){
      console.log("Token is not defined");
    } else {
      if (token) {
        Post.findById(postId, function(err, post){
          if (err) {
            console.log('Post not found');
          } else {
            if (post) {
              User.findById(token.userId, function(err, poster){
                var newComments = post.comments;
                var comment = {
                  createdAt: new Date(),
                  content: content,
                  poster: {
                    name: `${poster.fname} ${poster.lname}`,
                    id: poster._id
                  }
                }
                newComments.push(comment);
                post.comments = newComments;
                post.save(function(err, post){
                  if (err) {
                    console.log(`Trouble saving your new comment`, err);
                  } else {
                    res.json({
                      success: true,
                      response: newComments
                    })
                  }
                })
              })
            } else {
              res.status(404)
            }
          }
        })
      } else {
        res.status(401);
      }
    }
  });
});

router.get('/posts/likes/:post_id', function(req, res){
  var token = req.query.token;
  var postId = req.params.post_id;
  Token.findOne({token: token}, function(err, token){
    if (err) {
      console.log(`Something went wrong with finding your token: ${err}`);
    } else {
      if (token) {
        Post.findById(postId, function(err, post){
          if (err) {
            console.log(`Trouble finding your post: ${err}`);
          } else {
            if (post) {
              User.findById(token.userId, function(err, user){
                var newPost = post;
                var likes = post.likes;
                var liked = false;
                var likeIndex = -1;
                likes.forEach(function(like, index, likes){
                  // console.log(`like #${index}'s keys are ${Object.keys(like)}`);
                  // console.log(`like's property is ${typeof like}`);
                  console.log(like);
                  console.log("likeid", typeof (like.id));
                  console.log("tokenid", typeof token.userId);
                  console.log(`like.id is ${like.id} and token.userId is ${token.userId}`);
                  // console.log(like.id);
                  if (like.id == token.userId) {
                    console.log('here')
                    liked = true;
                    likeIndex = index;
                  }
                })


                if (!liked) {
                  var userId = user._id;
                  console.log(typeof userId);
                  var likeForThisUser = {
                    id: userId,
                    name: `${user.fname} ${user.lname}`
                  }
                  // console.log(typeof user._id);
                  likes.push(likeForThisUser);
                } else {
                  likes.splice(likeIndex, 1);
                }
                console.log(liked);
                newPost.likes = likes;
                newPost.save(function(err, post){
                  res.json({
                    success: true,
                    response: post.likes
                  });
                })
              });
            } else {
              res.status(404);
            }
          }
        })
      } else {
        res.status(401);
      }
    }
  });
});

module.exports = router;
