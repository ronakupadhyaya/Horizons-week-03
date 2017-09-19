var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res) {
  res.render('index', {
    matt: data
  })
})

var male = [];
var female = [];

for(var i = 0; i < data.length; i++){
  if(data[i]["gender"] === "Male"){
    male.push(data[i])
  } else {
    female.push(data[i])
  }
}

app.get('/male', function(req, res) {
  res.render('index', {
    matt: male
  })
})

app.get('/female', function(req, res) {
  res.render('index', {
    matt: female
  })
})


app.listen(3000);
