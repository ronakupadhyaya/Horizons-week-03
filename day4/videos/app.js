var express = require('express');
var app = express();


// npm install handlebars --save

// npm install express-validator --save
var validator = require('express-validator');
app.use(validtor());

app.post('/', function(req, res) {
  res.check('user', 'username must be specified')
    .notEmpty();
  res.check('secret', 'password must be at least 4 character long')
    .isLength({
      min: 4
    });

  var error = req.validtionErrors();
  console.log('errors are', error);
  if (error) {
    res.status(400);
  }
  res.render('myFirstTemplate' {
    error: error
  });
});
