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
  var male_check = false;
  var female_check = false;
  var other_check = false;

  if(req.query.gender === 'male'){
    male_check = true;
  }else if(req.query.gender === 'female'){
    female_check = true;
  }else if(req.query.gender === 'other'){
    other_check = true;
  }

  res.render('example2', {
    text: req.query.text,
    username: req.query.username,
    password: req.query.password,
    name: req.query.name,
    male: male_check,
    female: female_check,
    other: other_check


  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
