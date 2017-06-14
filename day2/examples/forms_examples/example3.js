var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();
var bodyParser = require("body-parser");
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});

app.get('/login', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.send('<h1 style="color:red;">Error</h1>');
  }
  var found = false;
  var user = {};
  var accounts = require('./accounts.json');
  accounts.forEach(function(n) {
    if ((n.email === req.body.username) && (n.password === req.body.password)) {
      found = true;
      user = n;
    }
  })
  user.name = user.first_name;
  if (found) {
    res.send('<h1>Hi ' + user.name + '!</h1>');
  } else {
    res.send('<h1 style="color:red;">Error</h1>');
  }
  

});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
