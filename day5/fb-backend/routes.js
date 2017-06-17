// get router
var express = require('express');
var router = express.Router();

// get dem models
var models = require('./models/models');
var User = models.User;
var Token = models.Token;
var Post = models.Post;

var executeOnUser = require('./helpers/helpers');

router.get('/', function(req, res){
  res.send('HELLO WORLD! YOU ARE A CHAMP');
})

router.post('/users/register', function(req, res){
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  console.log("NEW USER REGISTERED", newUser);

  newUser.save(function(err, user){
    if(err){
      res.json({error: "database error"});
    }else{
      res.json({success: true});
    }
  });
});

router.post('/users/login', function(req, res){
  User.findOne({email: req.body.email, password: req.body.password}, function(err, foundUser){
    if(err){
      res.status(500).json({error: "FailedToSerializeUser"});
    }else{
        if(!foundUser){
          res.status(301).json({error: "LoginFailed"});
        }else{
          var currDate = new Date();
          var userId = foundUser.id;
          var token = req.body.email + currDate;

          var new_token = new Token({
            token: token,
            userId: userId,
            createdAt: currDate
          });

          var response = {success: true, response: {id: userId, token: token} };

          new_token.save(function(err, token){
            if(err){
              res.status(500).json({error: "FailedToSaveData"});
            }else{
              res.json(response);
            }
          });
        }
    }
  });
});

router.get('/users/logout', function(req, res){
  var token = req.query.token;

  if(!token){
    res.status(400).json({error: "FailedToSupplyToken"});
    return;
  }

  if(typeof token !== "string"){
    res.status(400).json({error: "CannotDecodeToken"});
  }

  Token.findOne({token: token}, function(err, foundToken){
    if(err){
      res.status(500).json({error: "TokenCannotBeVerified"});
      return;
    }

    if(!foundToken){
      res.status(400).json({error: "Unauthorized"});
      return;
    }

    Token.remove({token: token}, function(err){
      if(err){
        res.status(500).json({error: "FailedToSaveData"});
      }else{
        res.json({success: true});
      }
    });
  });
});

router.post('/posts', function(req, res){
  var token = req.body.token;
  var content = req.body.content;

  if(!content){
    res.status(400).json({error: 'NoPostContent'});
    return;
  }

  // [contains all other arguments], must be passed into callback function as well
  executeOnUser(token, [content], function(foundUser, content){
    // console.log("USER IS", foundUser);
    var newPost = new Post({
      poster: {
        name: foundUser.fname + ' ' + foundUser.lname,
        id: foundUser.id
      },
      content: content,
      createdAt: new Date(),
      comments: [],
      likes: []
    });

    newPost.save(function(err, verifyPost){
      if(err){
        res.status(500).json({error: "FailedToSaveData"});
      }else{
        res.json({success: true, response: verifyPost});
      }
    });

  });
});

router.get('/posts', function(req, res){
  res.redirect('1'+"/?token="+req.query.token);
});


router.get('/posts/:page', function(req, res){
  console.log("GOT IT");
  var token = req.query.token;
  var pageNum = parseInt(req.params.page);

  // validation
  if(!token){
    res.status(400).json({error: "FailedToSupplyToken"});
    return;
  }
  if(pageNum < 1 || pageNum > 3){
    res.status(400).json({error: "InvalidPageNumber"});
    return;
  }

  executeOnUser(token, [pageNum], function(foundUser, pageNum){
    Post.find({}, function(err, foundPosts){
      var postArr;
      if(pageNum === 1){
        postArr = foundPosts.slice(0,10);
      }else if(pageNum === 2){
        postArr = foundPosts.slice(10,20);
      }else{
        postArr = foundPosts.slice(20,30);
      }
      res.json({success: true, response: postArr});
    });
  });
});

router.post('/posts/comments/:post_id', function(req, res){
  var token = req.body.token;
  var content = req.body.content;
  var postId = req.params.post_id;

  if(!token){
    res.status(400).json({error: "FailedToSupplyToken"});
    return;
  }
  if(!content){
    res.status(400).json({error: "NoCommentContent"});
    return;
  }
  if(!postId){
    res.status(400).json({error: "EmptyPostId"});
  }

  executeOnUser(token, [content, postId], function(foundUser, content, postId){
    Post.findOne({'_id': postId}, function(err, foundPost){
      if(err){
        res.status(500).json({error: "FailedToPostCommentsOnPost"});
        return;
      }

      if(!foundPost){
        res.status(400).json({error: "InvalidPostID"});
        return;
      }

      var comment = {
        createdAt: new Date().getTime(),
        content: content,
        poster: {
          name: foundUser.fname + ' ' + foundUser.lname,
          id: foundUser.id
        }
      }

      foundPost.comments.push(comment);
      foundPost.save(function(err, savedPost){
        if(err){
          res.status(500).json({error: "FailedToSaveData"});
        }else{
          res.json({success: true, response: savedPost});
        }

      })

    });
  });
});

router.get('/posts/comments/:post_id', function(req, res){
  var token = req.query.token;
  var postId = req.params.post_id;

  if(!token){
    res.status(400).json({error: "FailedToSupplyToken"});
    return;
  }
  if(!postId){
    res.status(400).json({error: "EmptyPostId"});
  }

  executeOnUser(token, [postId], function(foundUser, postId){
    Post.findById(postId, function(err, foundPost){
      if(err){
        res.status(500).json({error: "FailedToQueryPosts"});
        return;
      }
      res.json({success: true, response: foundPost.comments});
    });
  });
});

// get token
// executeOnUser
// find post via postId
// get the comments

router.get('/posts/likes/:post_id', function(req, res){
  var token = req.query.token;
  var postId = req.params.post_id;

  if(!token){
    res.status(400).json({error: "FailedToSupplyToken"});
    return;
  }
  if(!postId){
    res.status(400).json({error: "EmptyPostId"});
  }

  executeOnUser(token, [postId], function(foundUser, postId){
    Post.findById(postId, function(err, foundPost){
      if(err){
        res.status(500).json({error: "FailedToQueryPosts"});
        return;
      }
      res.json({success: true, response: foundPost.likes});
    });
  });
});


module.exports = router;
