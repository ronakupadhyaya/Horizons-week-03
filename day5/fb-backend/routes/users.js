"use strict";

var express = require("express");
var router = express.Router();

var Token = require('../models.js').Token;
var User = require("../models.js").User;

// REGISTER -- create new user and save to database
router.post("/register", function(req, res) {
  var new_user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });

  new_user.save(function(err, user) {
    if (!err) {
      res.json({ success: true });
    } else {
      console.log("Could not save user to the database.");
      res.json({ success: false });
    }
  });
});

// LOGIN
router.post("/login", function(req, res) {

  User.findOne({ email: req.body.email }, function(err, user) {
    if(req.body.password !== user.password || err) { // Check if email and password are valid
      res.status(301).send("Login failed");

    } else {
      // Create new session token.
      // TODO: improve token generation algorithm
      var session_token = (req.body.email ^ new Date()) << 1;

      // Create new token and save to database
      new Token({
        userId: user._id,
        token: session_token,
        createdAt: new Date()
      }).save(function(err, token) {
        if (!err) {
          res.json({
            success: true,
            response: {
              id: user._id,
              token: token
            }
          });
        } else {
          console.log("Could not save session token")
        }
      });
    }


  })
});

// LOGOUT
router.post("/logout", function(req, res) {
  if (!req.body.token) {
    res.status(400).send("Failed to supply token");
  } else {
    Token.remove({ token: req.body.token }, function(err, token) {
      if (err) { // Token cannot be found
        res.status(401).send("Unauthorized");
        res.json({
          success: false
        });
      } else {
        console.log("You have successfully logged out.");
        res.json({
          success: true
        });
      }
    });
  }
});

module.exports = router;
