var mongoose = require('mongoose');
var models = require('../models/models');
var Token = models.Token;
var User = models.User;


function executeOnUser(tokenStr, argArray, fn){
  Token.findOne({token: tokenStr}, function(err, foundToken){
    if(err){
      res.status(500).json({error: "TokenCannotBeVerified"});
    }else{
      var userId = foundToken.userId;
      User.findOne({'_id': userId}, function(err, foundUser){
        if(err){
          res.status(500).json({error: "FailedToFindUser"});
        }else{
          if(!foundUser){
            res.status(400).json({error: "Unauthorized"});
            return;
          }
          console.log("user is (im in helpers)", foundUser);
          argArray.unshift(foundUser);
          fn.apply(this, argArray);
        }
      });
    }
  });
}

module.exports = executeOnUser;


//return a promise that we can call .then() on to get the user
//
// var query = Model.findOne....
//
// var promise = query.exec();
//
// return promise;
//
// function getTokenPromise(tokenStr){
//   return Token.findOne({token: token}).exec();
// }
//
// // get t
// function executeUserPromise(tokenPromise){
//   tokenPromise.then(function(err, foundToken){
//     if(err){
//       res.status(500).json({error: "TokenCannotBeVerified"});
//     }else{
//       User.
//     }
//   });
// }
//
// getUserPromise(getTokenPromise("asdfasdfasdf"));
