var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var accounts = require('./accounts');

var app = express();
var bodyParser = require('body-parser');

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3', {
    first: true
  });
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var pass = req.body.pass;
  var name = "";
  var authen = false;

  accounts.forEach(function(ele) {
    if (ele.email === email && ele.password === pass) {
      authen = true;
      name = ele.first_name;
    }
  })

  if (authen) {
    res.render('example3', {
      correct : true,
      name: name
    });
  } else {
    res.render('example3');
  }
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
