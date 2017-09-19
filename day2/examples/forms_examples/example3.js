var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var accounts = require('./accounts.json');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  var validCredentials = function() {
    for (account in accounts) {
      if (accounts[account].email === req.body.email && accounts[account].password === req.body.password) { return true; }
    };
    return false
  }
  res.render('example3',
  {
    email: req.body.email,
    validCredentials: validCredentials
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
