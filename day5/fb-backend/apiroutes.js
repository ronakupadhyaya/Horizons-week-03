"use strict"

var express = require('express');
var router = express.Router();
var models = require('./models/models');

var User = models.User;
var Token = models.Token;
var Post = models.Post;

router.get('/', function(req, res){
  res.send('hello');
});

router.post('/users/register', function(req, res){
  var newUser = new User({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password,
  });

  newUser.save(function(err, usr){
    if(err){
      res.json({failure: 'database error'});
    } else {
      res.json({success: true});
    }
  })
});

router.post('/users/login', function(req, res){
  User.find({email: req.body.email}, function(err, userList){
    if(err){
      console.log('Sorry, couldn\'t find an account with that email');
    } else {
      var user;
      userList.forEach(function(usr){
        if(usr.password === req.body.password){
          user = usr;
          var currentTime = Date.now();
          var userToken = req.body.email + currentTime.toString();
          var tkn = new Token({
            userId: user._id,
            token: userToken,
            createdAt: currentTime
          });

          tkn.save(function(err){
            if(err){
              res.json({failure: 'database saving error - token'});
            } else {
              res.json({success: true});
            }
          });
        }
      });
    }
  });
});

router.get('/users/logout', function(req, res){
  Token.remove({token: req.query.token}, function(err){
    if(err){
      console.log('Error logging out');
    } else {
      console.log('Success logging out');
      res.json({success: true});
    }
  });
});

router.get('/posts/', function(req, res){
  Token.findOne({token:req.query.token}, function(err, tkn){
    if(err){
      res.Status(500).json({TokenCannotBeVerified: "Token cannot be verified."});
    } else {
      User.findOne({_id: tkn.userId}, function(err, user){
        if(err){
          res.Status(500).json({FailedToFindUser: "Failed to find user."});
        } else {
          Post.find({}).sort({createdAt: -1}).exec(function(err, arr){
            if(err){
              console.log('Error sorting, ', err);
            } else {
              var page = 1;
              res.json({response: arr.slice((page-1)*10, page*10)});
            }
          });
        }
      });
    }
  });
});

router.get('/posts/:page', function(req, res){
  Token.findOne({token:req.query.token}, function(err, tkn){
    if(err){
      res.Status(500).json({TokenCannotBeVerified: "Token cannot be verified."});
    } else {
      User.findOne({_id: tkn.userId}, function(err, user){
        if(err){
          res.Status(500).json({FailedToFindUser: "Failed to find user."});
        } else {
          Post.find({}).sort({createdAt: -1}).exec(function(err, arr){
            if(err){
              console.log('Error sorting, ', err);
            } else {
              var page = req.params.page;
              if(!page){
                page = 1;
              }
              res.json({response: arr.slice((page-1)*10, page*10)});
            }
          });
        }
      });
    }
  });
});

router.post('/posts', function(req, res){
  Token.findOne({token:req.body.token}, function(err, tkn){
    if(err){
      res.Status(500).json({TokenCannotBeVerified: "Token cannot be verified."});
    } else {
      User.findOne({_id: tkn.userId}, function(err, user){
        if(err){
          res.Status(500).json({FailedToFindUser: "Failed to find user."});
        } else {
          var content = req.body.content;
          var newPost = new Post({
            poster: {
              name: user.fName + ' ' + user.lName,
              id: user._id
            },
            content: content,
            likes: [],
            comments: [],
            createdAt: Date.now()
          });

          newPost.save(function(err){
            if(err){
              res.Status(500).json({FailedToSaveData: 'Failed to save data'});
            } else {
              res.json({success: true, response: newPost});
            }
          })
        }
      });
    }
  });
});

router.get('/posts/comments/:post_id', function(req, res){
  Token.findOne({token:req.query.token}, function(err, tkn){
    if(err){
      res.Status(500).json({TokenCannotBeVerified: "Token cannot be verified."});
    } else {
      User.findOne({_id: tkn.userId}, function(err, user){
        if(err){
          res.Status(500).json({FailedToFindUser: "Failed to find user."});
        } else {
          Post.findById(req.params.post_id, function(err, post){
            if(err){
              res.Status(400).json({InvalidPostID: "Invalid Post ID"});
            } else {
              res.json({success: true,
                        response: post.comments});
            }
          })
        }
      })
    }
  });
});

router.post('/posts/comments/:post_id', function(req, res){
  Token.findOne({token:req.body.token}, function(err, tkn){
    if(err){
      res.Status(500).json({TokenCannotBeVerified: "Token cannot be verified."});
    } else {
      User.findOne({_id: tkn.userId}, function(err, user){
        if(err){
          res.Status(500).json({FailedToFindUser: "Failed to find user."});
        } else {
          var newComment = {
            createdAt: Date.now(),
            content: req.body.content,
            poster: {
              name: user.fName + ' ' + user.lName,
              id: user._id
            }
          }

          Post.findById(req.params.post_id,function(err, post){
            if(err){
              res.Status(400).json({InvalidPostID: "Invalid Post ID"});
            } else {
              var newComments = post.comments;
              newComments.push(newComment);
              post.update({comments: newComments}, function(err){
                if(err){
                  res.Status(500).json({FailedToPostCommentsOnPost: "Failed to post comments on post."});
                } else {
                  res.json({success: true, response: post});
                }
              })
            }
          });
        }
      })
    }
  });
});

router.get('/posts/likes/:post_id', function(req, res){
  Token.findOne({token:req.query.token}, function(err, tkn){
    if(err){
      res.Status(500).json({TokenCannotBeVerified: "Token cannot be verified."});
    } else {
      User.findOne({_id: tkn.userId}, function(err, user){
        if(err){
          res.Status(500).json({FailedToFindUser: "Failed to find user."});
        } else {
          Post.findById(req.params.post_id,function(err, post){
            if(err){
              res.Status(400).json({InvalidPostID: "Invalid Post ID"});
            } else {
              var likeList = post.likes;
              var toggled = false;
              for(var i = 0; i < likeList.length; i++){
                if(likeList[i].id === user._id){
                  toggled = true;
                  likeList.splice(i, 1);
                }
              }

              if(!toggled){
                  likeList.push({
                    name: user.fName + ' ' + user.lName,
                    id: user._id
                  });
              }

              post.update({likes: likeList}, function(err){
                if(err){
                  res.Status(500).json({FailedToPostCommentsOnPost: "Failed to post comments on post."});
                } else {
                  res.json({success: true, response: post});
                }
              })
            }
          });
        }
      });
    }
  });
});
module.exports = router;
