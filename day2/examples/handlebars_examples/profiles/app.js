var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data.json');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res){
  res.render('myFile', {
    data: data
  });
});

app.get('/male', function(req, res){
  var maleData =[];
  data.forEach(function(item){
    if(item.gender === 'Male'){
      maleData.push(item);
    }
  })
  res.render('myfile', {
    data: maleData,
    maleBool: true
  })
})

app.get('/female', function(req, res){
  var femaleData =[];
  data.forEach(function(item){
    if(item.gender === 'Female'){
      femaleData.push(item);
    }
  })
  res.render('myfile', {
    data: femaleData,
    femaleBool: true
  })
})


app.listen(3000);
