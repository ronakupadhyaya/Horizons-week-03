var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

var data = ('./accounts.json');

// app.post('/login', function(req, res){
//   req.body.username
// });

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
// console.log('Express started. Listening on port %s', port);
console.log(data);

module.exports = app;
