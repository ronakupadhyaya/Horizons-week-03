var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res){
  res.render('index', {
    datalist: data
  })
})

app.get('/male', function(req,res){
  var arr = [];
  data.forEach(function(objects){
    if (objects.gender === "Male") {
      arr.push(objects)
    }
    console.log(objects)
  })
  res.render('male', {
      datalist: arr
  });
})

app.get('/female', function(req,res){
  var arr = [];
  data.forEach(function(objects){
    if (objects.gender === "Female") {
      arr.push(objects)
    }
    console.log(objects)
  })
  res.render('female', {
      datalist: arr
  });
})

app.listen(3000);
