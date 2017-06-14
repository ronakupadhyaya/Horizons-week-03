var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser')
var app = express();
var account = require('./accounts.json');
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var exist = false;
  var first_name = "";
  account.forEach(function(acc) {
    if (acc.email === email && acc.password === password) {
        exist = true;
        first_name = acc.first_name;
    }
  });

  res.render("login", {
    exist: exist,
    username: first_name
  })
})
// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
