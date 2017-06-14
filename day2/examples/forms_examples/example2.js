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
  var genderObj = {
    male: false,
    female: false
  };

  genderObj[req.query.gender] = true;

  var stateObj = {
    CA: false,
    FL: false
  }

  stateObj[req.query.state] = true;

  res.render('example2', {
    username: req.query.username || "Placeholder username",
    password: req.query.passwordn || "Placeholder password",
    name: req.query.name || "Placeholder name",
    gender: genderObj,
    state: stateObj
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
