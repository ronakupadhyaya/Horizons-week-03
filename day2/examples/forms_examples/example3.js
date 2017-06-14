var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bs = require('body-parser');
var data = require('/accounts.json');
var app = express();
app.use(bs({extended:true}));

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', function(req, res) {
  var name = req.body.email;
  var pass = req.body.pass;
  for var

  res.render('example3');
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
