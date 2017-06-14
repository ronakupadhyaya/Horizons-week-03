var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

var accounts = require("./accounts");

var bodyParser = require("body-parser");
app.use(bodyParser({extended: true}));

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  var found = false;
  var name = "";
  console.log(accounts);
  accounts.forEach(function(obj) {
    if (obj.email === req.body.email && obj.password === req.body.password) {
      found = true;
      name = obj.first_name;
    }
  });
  if (found) {
    res.render('example3', {
      email: req.body.email,
      password: req.body.password,
      name: name,
      found: true
    })
  } else {
    res.send('<h1 style="color: red">ERROR! Invalid credentials</h1>')
  }
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
