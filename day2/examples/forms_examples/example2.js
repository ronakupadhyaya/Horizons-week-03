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
  var gender = '';
  var state = '';
  var male = false;
  var female = false;
  if(req.query.state){
    state = req.query.state;
  }
  if(req.query.gender ==='male'){
    male = true;
  }
  if(req.query.gender==='female'){
    female = true;
  }
  console.log(req.query.username, req.query.password, req.query.name, gender);
  res.render('example2', {username: req.query.username, password: req.query.password, name: req.query.name, male: male, female: female});
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
