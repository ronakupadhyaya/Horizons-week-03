var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser')
var data = require('./accounts.json');

var app = express();
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
  var bool = false;
  var name = null;
  data.forEach(function(info) {
    if (info.email === req.body.email && info.password === req.body.password) {
      bool = true;
      name = info.first_name;
    }
  })
  res.render('example3', {
    email: req.body.email,
    password: req.body.password,
    bool: bool,
    name: name,
  });
});



// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
