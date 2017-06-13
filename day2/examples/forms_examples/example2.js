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
  var isFemale, isMale, isOther = false;
  if(req.query.gender ==="Female"){
    isFemale=true;
    isMale = false;
    isOther = false;
  } else if(req.query.gender ==="Male"){
    isFemale=false;
    isMale = true;
    isOther = false;
  } else if(req.query.gender ==="Other"){
    isFemale=false;
    isMale = false;
    isOther = true;
  }
  res.render('example2', {
    text: req.query.text,
    user: req.query.username,
    password: req.query.password,
    name: req.query.name,
    gender: req.query.gender,
    isMale: isMale,
    isFemale: isFemale,
    isOther: isOther
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
