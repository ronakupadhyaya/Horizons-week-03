var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-Parser');
var accounts = require('./accounts');

var app = express();
app.use(bodyParser({extended: true}))

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].email === email) {
      if (accounts[i].password === password) {
        res.render('example3', {
          name: accounts[i].first_name + "!"
        });
        return;
      } else {
        res.render('example3', {
          error: true
        });
        return;
      }
      break;
    }
  }

  res.render('example3', {
    error: true
  });
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
