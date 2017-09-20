var accounts = require('./accounts.json');

var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({extended: true}));
app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/', function(req, res) {
  console.log(req.body.email)
  console.log(req.body.secret)
  var name = '';
  var passwordCorrect = false;
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].email === req.body.email) {
      if(accounts[i].password === req.body.secret) {
        name = accounts[i].first_name;
        passwordCorrect = true;
      }
    }
  }
  console.log(passwordCorrect);
  // console.log(req.body.email && req.body.password)
  res.render('example3', {
    checkPassword: passwordCorrect,
    name: name
  // });
});
});


// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
