var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
//console.log(data)
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req,res){
  res.render('proper-display',{
    datax: data
  });
});


app.get('/male', function (req,res){
  var male = data.filter(function(person){
    return person.gender === "Male"
  })
  //console.log(male)
  res.render('proper-display', {
    datax: male
  })
});

app.get('/female', function (req,res){
  var female = data.filter(function(person){
    return person.gender === "Female"
  })
  //console.log(male)
  res.render('proper-display', {
    datax: female
  })
})

// YOUR CODE HERE

app.listen(3000);
