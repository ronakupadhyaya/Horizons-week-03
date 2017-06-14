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
  res.render('example2', {
    username: req.query.username,
    password: req.query.password,
    name: req.query.name,
    gender: req.query.gender,
    male: false,
    female: false,
    other: false,
    state: req.query.state || "Please select state"
  });
});

app.get('/register', function(req, res) {
  var reqGen = req.query.gender;
  var male = false;
  var female = false;
  var other = false;
  if (reqGen === "Male") {
    male = true;
  } else if (reqGen === "Female") {
    female = true;
  } else if (reqGen === "Other") {
    other = true;
  }
  res.render('example2', {
    username: req.query.username,
    password: req.query.password,
    name: req.query.name,
    male: male,
    female: female,
    other: other,
    state: req.query.state
  });
});



// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
