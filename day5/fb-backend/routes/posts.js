"use strict";

var express = require("express");
var router = express.Router();

var Token = require('../models.js').Token;
var User = require("../models.js").User;
var Post = require('../models.js').Post;

router.get("/", function(req, res) {

  if (!req.body.token) {
    res.status(400).send("Failed to supply token");
  } else {
    Token.findOne({ token: req.body.token }, function(err, token) {
      if (err) {
        res.status(500).send("Token cannot be verified")
      } else {
        Post.find({})
        .sort('-createdAt')
        .limit(10)
        .exec(function(err, posts) {
          if (err) {
            res.status(500).send("Failed to query posts");
          } else {
            res.json({
            success: true,
            response: posts
          });
          }
        });
      }
    });
  }
});


router.get("/:page", function(req, res) {
  if (!req.body.token) {
    res.status(400).send("Failed to supply token");
  } else {
    Token.findOne({ token: req.body.token }, function(err, token) {
      if (err) {
        res.status(500).send("Token cannot be verified")
      } else {
        Post.find({})
        .sort('-createdAt')
        .skip(10 * req.params.page - 10)
        .limit(10)
        .exec(function(err, posts) {
          if (err) {
            res.status(500).send("Failed to query posts");
          } else {
            res.json({
              success: true,
              response: posts
            });
          }
        });
      }
    });
  }
});


router.post("/", function(req, res) {
  if (!req.body.token) {
    res.status(400).send("Failed to supply token.");
  } else if (!req.body.content) {
    res.status(400).send("No post content");
  } else {
    Token.findOne({ token: req.body.token }, function(err, token) {
      if (err) {
        res.status(500).send("Token cannot be verified.");
      } else {
        console.log("userId", token);
        User.findById(token.userId, function(err, user) {
          console.log("User", user);
          if (err) {
            res.status(500).send("Failed to find user.");
          } else {
            new Post({
              poster: {
                id: user._id,
                name: user.fname + " " + user.lname
              },
              content: req.body.content,
              createdAt: new Date(),
              comments: [],
              likes: []
            }).save(function(err, post) {
              if (err) {
                res.status(500).send("Failed to save post.");
              } else {
                res.json({
                  success: true,
                  response: post
                });
              }
            });
          }

        });

      }
    })
  }
});

router.get("/comments/:post_id", function(req, res) {

});

router.post("/comments/:post_id", function(req, res) {

});

router.get("/likes/:post_id", function(req, res) {

});

module.exports = router;
