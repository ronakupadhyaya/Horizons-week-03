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

function isValidUsername(username, password) {
  var valid = false;
  var name;
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].email === username && accounts[i].password === password) {
      valid = true;
      name = accounts[i].first_name;
      break;
    }
  }
  return [valid, name];
}
//body parser
app.use(bodyParser({extended: true}));
app.get('/', function(req, res) {
  res.render('example3', {
    notFirstTime: false
  });
});

app.post('/submitted', function(req, res) {
  res.render('example3', {
    user: req.body.username,
    valid: isValidUsername(req.body.username, req.body.password)[0],
    name: isValidUsername(req.body.username, req.body.password)[1],
    notFirstTime: true
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
