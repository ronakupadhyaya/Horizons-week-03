

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
    text: req.query.text,
    usernameValue: req.query.usernameBox,
    passwordValue: req.query.passwordBox,
    nameValue: req.query.nameBox,
    maleCheck: req.query.gender === 'male',
    femaleCheck: req.query.gender === 'female',
    otherCheck: req.query.gender === 'other',
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
