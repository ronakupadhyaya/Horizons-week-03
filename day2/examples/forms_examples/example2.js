var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  var male = false;
  var female = false;
  var other = false;
  var none = false;
  if (req.query.gender === 'male') {
    male = true;
  } else if (req.query.gender === 'female') {
    female = true;
  } else if (req.query.gender === 'other') {
    other = true;
  } else {
    none = true;
  }
  res.render('example2', {
    username: req.query.username,
    password: req.query.password,
    name: req.query.name,
    gender: req.query.gender,
    state: req.query.state,
    male: male,
    female: female,
    other: other,
    none: none,
    text: req.query.text
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
