var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var accounts = require('./accounts');
var app = express();
app.use(bodyParser({extended: true}));

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3', {
    email: req.query.email,
    password: req.query.password
  });
});

app.post('/login', function(req, res) {
  var password = req.body.password;
  var email = req.body.email;
  var valid = null;
  var name = null;
  accounts.forEach(function(item, index) {
    if(item.email === email && item.password === password) {
      valid = true;
      name = item.first_name;
    }
  })
  res.render('example3.hbs', {
    loggedIn: valid,
    fname: name
  })
})



// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
