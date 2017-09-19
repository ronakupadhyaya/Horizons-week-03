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

// parsing accounts.json
var fs = require('fs');
var accountsArray = JSON.parse(fs.readFileSync('./accounts.json', 'utf8'));


app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var validLogin = false;
  var user;
  for(var i = 0; i < accountsArray.length; i++) {
    if(accountsArray[i].email === email) {
      if(accountsArray[i].password === password) {
        validLogin = true;
        user = accountsArray[i];
      }
      break;
    }
  }
  if(validLogin) { //correct user and password
    res.render('example3', {
      valid: true,
      firstName: user.first_name
    });
  } else { //incorrect user or password
    res.render('example3', {
      invalid: true
    });
  }
});
// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
