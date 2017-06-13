var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

var fs = require('fs');
var data = fs.readFileSync('accounts.json');
var accounts = JSON.parse(data);
// var name = [];

// console.log(accounts);

// for (var i = 0; i < accounts.length; i++) {
//   if (accounts[i]['email'] === emailVal) {
//     name: req
//   }
// }

// view engine setup

app.engine('hbs', exphbs({extname:'hbs'}));

var bodyParser = require('body-parser');
app.use(bodyParser({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

app.post('/', function(req, res){
  res.render('example3', {
    email: req.body.email

  });
});
// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
