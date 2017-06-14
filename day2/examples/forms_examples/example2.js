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
    username: req.query.usernameBox,
    password: req.query.passwordBox,
    name: req.query.nameBox,
    male: req.query.gender === "Male",
    female: req.query.gender === "Female",
    other: req.query.gender === "Other",
    Alaska: req.query.state === "AK",
    California: req.query.state === "CA"
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
