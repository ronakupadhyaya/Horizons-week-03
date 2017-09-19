var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var accounts = require('./accounts');

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

app.get('/login', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  var username = req.body.user;
  var pw = req.body.password;
  var foundname = false;
  var name;
  accounts.forEach(function(ele) {
    if (ele.email === username && ele.password === pw) {
      foundname = true;
      name = ele.first_name;
    }
  })
  console.log(name);
  res.render('example3', {
    user: req.body.user,
    name: name,
    check: foundname
  });

})
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
