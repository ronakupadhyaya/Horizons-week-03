var express = require('express');
var router = express.Router();
var User = require('./models').User;
var Token = require('./models').Token;
var Post = require('./models').Post;

router.post('/api/users/register', function(req, res) {
  req.check('fname').notEmpty();
  req.check('lname').notEmpty();
  req.check('email').notEmpty();
  req.check('password').notEmpty();

  if (req.validationErrors()) { res.status(400).send("400 Error") };

  User.findOne({email: req.body.email}, function(err1, foundUser) {
    if (foundUser) {
      res.status(400).json(foundUser);
    } else if (err1) {
      res.send("err:", err1);
    } else {
      var user = new User(
        {fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: req.body.password
        });
      user.save(function(err2) {
        if (err2) {
          res.send(err2);
        } else {
          res.json({"success":true});
        }
      });
    }

  });
});

router.post('/api/users/login', function(req, res) {
  req.check('email').notEmpty();
  req.check('password').notEmpty();
  if (req.validationErrors()) { res.status(400).send("400 Error") };

  User.findOne({email: req.body.email}, function(err, foundUser) {
    if (err) {res.send(err);}
    else {
      if (foundUser.password !== req.body.password) { res.status(401).send("401: Login failed."); return; }
      var token = foundUser.email + new Date();
      var tokenModel = new Token({
        userId: foundUser._id,
        token: token,
        createdAt: new Date()
      });
      tokenModel.save(function(err2) {
        if (err2) {res.send(err2);}
        else {
          res.json(
            {
              "success": true,
              "response":
              {
                "id": foundUser._id,
                "token": tokenModel.token
              }
            }
          );
        }
      });
    }
  });
});

router.get('/api/users/logout', function(req, res) {
  Token.remove({token: req.query.token}, function(err) {
    if (err) {res.send(err);}
    else {
      res.json({"success": true});
    }
  });
});

module.exports = router;
