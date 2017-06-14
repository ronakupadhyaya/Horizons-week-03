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

  var state = req.query.state || "Please select a state";
  var stateType = req.query.stateType || "";

  // if (req.query.gender === "Male") {
  //   male = true;
  // } else (req.query.gender === "False") {
  //   female = true;
  // } else {
  //   other = true;
  // }

  res.render('example2', {
    text: req.query.text,
    passsword: req.query.password,
    name: req.query.name,
    gender: req.query.gender,
    state: state,
    stateType: stateType
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
