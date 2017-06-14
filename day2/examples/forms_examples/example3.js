var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var data = require('./accounts');
// view engine setup
app.engine('hbs', exphbs({
  extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({
  extended: true
}));

app.get('/', function(req, res) {
  res.render('example3');
});
app.post('/login', function(req, res) {
  var emailBody = req.body.email;
  var passwordBody = req.body.password;
  var turn = false;
  var name = '';
  data.forEach(function(item) {
    if ((item.email === emailBody) && (item.password === passwordBody)) {
      turn = true;
      name = item.first_name;
    }
  })

  res.render('login', {
    email: req.body.email,
    password: req.body.password,
    turn: turn,
    name: name
  });

});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
