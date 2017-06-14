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
  var gender = req.query.gender || male;
  var male = false;
  var female = false;
  var other = false;
  if (gender === 'female') {
    female = true;
  } else if (gender === 'other') {
    other = true;
  } else {
    male = true;
  }

  var state = req.query.state || 'DC'
  console.log(state);

  res.render('example2', {
    username: req.query.username,
    password: req.query.password,
    name: req.query.name,
    male: male,
    female: female,
    other: other,
    state: state
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
