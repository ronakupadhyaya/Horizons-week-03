var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Token = require('../models/token');

function generateSessionToken(usr) {
  var now = new Date();
  return {
    userId: usr.id,
    token: usr.email + now, //TODO hash this (w/ salt?)
    createdAt: now
  }
};

function successResponse(obj) {
  return {success: true, response: obj};
};

router.post('/register', function(req, res) {
  //TODO validation everywhere
  User.find({email: req.body.email}, function(err, val) {
    if (err || val.length) {
      res.status(400).json({error: "That email may already be in use."});
    } else {
      User(req.body).save(function(err, newUser) {
        if (err) {
          res.status(400).json({error: "Incomplete register definition."});
        } else {
          var resJson = successResponse(newUser);
          res.status(200).json(resJson);
        }
      });
    }
  });
});

router.post('/login', function(req, res) {
  User.find(req.body, function(err, val) {
    if (err || !val.length) {
      res.redirect(req.baseUrl + '/login');
    } else {
      var foundUser = val[0];
      var seshToken = generateSessionToken(foundUser);
      Token(seshToken).save(function(err) {
        if (err) {
          res.status(500).send("Couldn't save session token");
        } else {
          var resJson = successResponse({id: foundUser.id, token: seshToken});
          res.status(200).json(resJson);
        }
      });
    }
  })
});

router.get('/login', function(req,res) {
  res.status(401).json({error: "Login failed."});
});

router.post('/logout', function(req,res){
  Token.find(req.body).remove(function(err, tok) {
    if (err || !tok.length) {
      res.status(500).send("Couldn't logout");
    } else {
      res.status(200).json({success: true});
    }
  });
});

module.exports = router;
