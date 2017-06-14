var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var accounts = require('./accounts');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  var answer = '';
  accounts.forEach(function(element) {
    if (element.email === req.body.email){
      if (element.password === req.body.password){
        answer = '<h1>Hi ' + element.first_name + '!</h1>';
      }
    }
  }, this);
  if (answer === ''){
    answer = '<h1 style="color:red">Incorrect Cridentials!</h1>'
  }
  res.send(answer);
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
