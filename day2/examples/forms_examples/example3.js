var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var accounts = require('./accounts.json')

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser({
  extended: true
}));

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});



function validAccount (myEmail, myPassword) {
  var valid = false;
  var firstName = "";
  accounts.forEach(function(account){
    if(account.email === myEmail && account.password === myPassword) {
      valid = true;
      firstName = account.first_name;
    }
  })
  return [valid, firstName];
}
app.get('/login', function(req, res) {
  res.render('example3', {
    valid: false,

  })
})

app.post('/login', function(req, res) {
  res.render('example3', {
    valid: validAccount(req.body.email, req.body.password)[0],
    firstName: validAccount(req.body.email, req.body.password)[1],
  })
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
