var express = require("express");
var router = express.Router();
var models = require("../models/models");
var User = models.User;
var Token = models.Token;
var Post = models.Post;


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

module.exports = router;
