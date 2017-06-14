var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var accounts = require('./accounts');
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3'), {
    email: req.query.email,
    password: req.query.password,
  };
});

app.post('/login', function(req, res) {
  var firstname = "";
  function found(email, password) {
    var found = accounts.some(function (el) {
      if (el.email === email && el.password === password) {
        firstname = el.first_name;
        return true;
      }
      return false;
    });
    return found;
  }
  if (found(req.body.email, req.body.password)) {
    res.render('example3',{
      email: req.body.email,
      password: req.body.password,
      firstname: firstname
    })
  }
});
// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
