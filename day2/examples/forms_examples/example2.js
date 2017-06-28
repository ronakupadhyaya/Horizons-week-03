var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
var gender = {
  male: false,
  female: false,
  other: false
}
app.get('/', function(req, res) {

  console.log(gender)
  gender[req.query.gender] = true
  console.log(req.query.gender)
  console.log(gender)
  res.render('example2', {
    text: req.query.text,
    password: req.query.password,
    name: req.query.name,
    male: gender.male,
    female: gender.female,
    other: gender.other
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
