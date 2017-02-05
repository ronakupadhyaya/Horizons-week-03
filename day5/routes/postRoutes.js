var express = require('express');
var router = express.Router();

var Post = require('../models/post');
var Token = require('../models/token');
var User = require('../models/user');

function createNewPost(usr, content) {
  return new Post({
    poster: usr,
    content: content,
    likes: [],
    comments: [],
    createdAt: new Date()
  });
};

function createNewComment(content, poster) {
  return {
    createdAt: new Date(),
    content: content,
    poster: poster,
    likes: []
  };
};

function doIfValidTokenUser(req, res, fn) {
  Token.find({token: req.body.token}, function(err, tok) {
    if (err || !tok.length) {
      res.status(500).send("Couldn't verify token.");
    } else {
      User.findById(tok[0].userId, function(err, usr){
        if (err || !usr) {
          res.status(500).send("Couldn't locate user for token.");
        } else {
          fn(usr);
        }
      });
    }
  });
};

//TODO move this and users version into routeUtils
function successResponse(obj) {
  return {success: true, response: obj};
};

router.post('/', function(req, res) {
  doIfValidTokenUser(req, res, function(usr){
    var newPost = createNewPost(usr, req.body.content);
    newPost.save(function(err) {
      if (err) {
        res.status(400).json({error: "No Post content"});
      } else {
        res.status(200).json({success: true});
      }
    });
  });
});

router.get('/', function(req, res) {
  res.redirect(req.baseUrl + '/10');
});

router.get('/error', function(req, res) {
  res.status(401).json({error: "An error occured obtaining posts."});
});

router.get('/:postAmount', function(req, res) {
  Post.find({}, null, {limit: parseInt(req.params.postAmount), sort:{createdAt: -1}}, function(err, posts) {
    if (err) {
      res.redirect(req.baseUrl + '/error');
    } else {
      res.status(200).json(successResponse(posts));
    }
  });
});

router.post('/comments/:id', function(req, res) {
  doIfValidTokenUser(req, res, function(usr) {
    var newComment = createNewComment(req.body.content, usr);
    Post.findByIdAndUpdate(req.params.id, {$push: {"comments": newComment}}, {new: true}, function(err, post){
      if (err) {
        res.status(500).json({error: "Could not add comment."});
      } else {
        res.status(200).json(successResponse(post));
      }
    });
  });
});

router.get('/comments/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      res.status(500).json({error: "Couldn't find post for that id."})
    } else {
      res.status(200).json(successResponse(post.comments));
    }
  });
});

router.get('/likes/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      res.status(500).json({error: "Couldn't find post for that id."})
    } else {
      res.status(200).json(successResponse(post.likes));
    }
  });
});


module.exports = router;
