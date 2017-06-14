var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();


// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser({extended : true}));

app.get('/', function(req, res) {
  res.render('example3');
});

function fileReader(csvFilePath){
  var readFile = fs.readFileSync(path.join(__dirname,csvFilePath), 'utf8');
  var arr = JSON.parse(readFile);
  return arr;
}
var array = fileReader('accounts.json');

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var hasPrinted = false;
  array.forEach(function(input) {
    if (username === input.email && password === input.password) {
      res.render('example3', {name : input.first_name});
      hasPrinted = true;
    }
  })
  if (!hasPrinted) {
    throw new Error("invalid login");
  }
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
