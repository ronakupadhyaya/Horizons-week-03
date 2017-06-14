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
  res.render('index.hbs',
  {students: data} )
});

app.get('/male', function(req, res){
  var male = [];
  data.forEach(function(item){
    if (item.gender === "Male"){
      male.push(item);
    }
  })
  res.render('index.hbs',
  {students: male}
  )
})

app.get('/female', function(req, res){
  var female = [];
  data.forEach(function(item){
    if (item.gender === 'Female'){
      female.push(item);
    }
  })
  res.render('index.hbs',
  {students: female}
)
})


app.listen(3000);
