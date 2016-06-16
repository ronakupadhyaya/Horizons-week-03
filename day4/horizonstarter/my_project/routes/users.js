var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;





// script2:
// var secret = 'my password';
// module.export = secret;
//  or
//  module.export = {
//    x: x,
//    index: index
//  }
//
// script1:
// var secretString = require('./script2');
// console.log(secret);
// console.log(secretString.x)
