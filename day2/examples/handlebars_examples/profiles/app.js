var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require('fs');
var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res){
  var readFileJSON = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  res.render('index', {students: readFileJSON});
})

app.get('/male', function(req, res){
  var maleArr = [];
  var readFileJSON = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  for(var i = 0; i < readFileJSON.length; i++){
    if(readFileJSON[i].gender ==='Male'){
      maleArr.push(readFileJSON[i]);
    }
  }
  console.log(maleArr);
  res.render('index', {students: maleArr});
})
app.get('/female', function(req, res){
  var maleArr = [];
  var readFileJSON = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  for(var i = 0; i < readFileJSON.length; i++){
    if(readFileJSON[i].gender ==='Female'){
      maleArr.push(readFileJSON[i]);
    }
  }
  console.log(maleArr);
  res.render('index', {students: maleArr});
})
app.listen(3000);
