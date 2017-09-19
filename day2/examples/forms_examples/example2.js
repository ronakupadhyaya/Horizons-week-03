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
  // console.log(req.query.gender, typeof req.query.gender)
  // var gender = req.query.gender || false;
  // var stateSelected = function() {
  //   if (req.query.state === "None") {
  //
  //   }
  // }
  res.render('example2',
  {
    user: req.query.user,
    pass: req.query.pass,
    name: req.query.name,
    state: req.query.state
    // gender: gender,
    // genderChecked: genderChecked,
    // isChecked: isChecked
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
