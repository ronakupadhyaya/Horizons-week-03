var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', exphbs({
  extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example2', {
    text: req.query.text
  });
});

//need to figure out how to get radio button & state to stay
app.get('/another', function(req, res) {
  res.render('example2', {
    usernameValue: req.query.usernameTextBox,
    passwordValue: req.query.passwordTextBox,
    nameValue: req.query.nameTextBox,
    stateValue: req.query.state,
    genderValue: req.query.radioButtons
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
