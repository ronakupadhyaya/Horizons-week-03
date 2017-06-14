var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

var accounts = require('./accounts');
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');
app.use(bodyParser({extended: true}));
app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/login', function(req, res) {
  res.render('example3', {
    email: req.body.email1
  });
});
// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
