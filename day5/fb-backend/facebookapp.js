"use strict"

var express = require('express');
var fb = express.Router();
var User = require('./models').User;
var Token = require('./models').Token;
var Post = require('./models').Post;
var strftime = require('strftime');

fb.post('/api/users/register', function(req, res){
  console.log(req.body)
  // var findemail = {email: req.body.email};
  // console.log(req.body)
  // // req.checkBody('fname', 'Incomplete register definition').notEmpty();
  // req.checkBody('lname', 'Incomplete register definition').notEmpty();
  // req.checkBody('email', 'Incomplete register definition').notEmpty();
  // req.checkBody('password', 'Incomplete register definition').notEmpty();
  // User.findOne(findemail, function(error, doc){
  //   if(error){
  //     res.json('Error', error);
  //   }
  //   else {
  //     var errors = req.validationErrors();
  //     if(errors){
  //       res.json(errors);
  //
  //     }
  //     else{
  if(req.body){
      var newUser =  new User({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: req.body.password
        }).save(function(err){
          if(err){
            console.log('Error!', err);
            res.json('Error!', err);
          }
          else{
            console.log("Saved");
            res.json({success: true})

          }
        })
      }
  //     }
  //   }




  // })
})
module.exports = fb
