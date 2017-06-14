var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require('fs');
var csvjson = require('csvjson');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
function fileReader(csvFilePath){
  var readFile = fs.readFileSync(path.join(__dirname,csvFilePath), 'utf8');
  // var arr = csvjson.toObject(readFile);
  var arr = JSON.parse(readFile);
  return arr;
}
var array = fileReader('data.json');

app.get('/', function(req, res) {
  res.render('index', {data : array});
});

app.get('/male', function(req, res) {
  var newData = data.filter(function(input) {
    return input.gender === "Male"
  })
  res.render('index', {data : newData});
});

app.get('/female', function(req, res) {
  var newData = data.filter(function(input) {
    return input.gender === "Female"
  })
  res.render('index', {data : newData});
});

app.listen(3000);
