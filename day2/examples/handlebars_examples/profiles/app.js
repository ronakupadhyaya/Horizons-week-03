var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var _ = require('underscore');
var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// var isMale = function(this){
//   return (this.gender === 'male');
// };
// var isFemale = function (this) {
//   return (this.gender === 'female');
// };
// YOUR CODE HERE
var maleData = [];
_.forEach(data, function(person){
  if (person.gender === 'Male'){
    maleData.push(person);
  }
})

var femaleData = [];
_.forEach(data, function(person){
  if (person.gender === 'Female'){
    femaleData.push(person);
  }
})
app.get('/', function(req, res){
  res.render('index', {
    students: data
  });
});
app.get('/male', function(req, res){
  res.render('index', {
    students: maleData
  });
});
app.get('/female', function(req, res){
  res.render('index', {
    students: femaleData
  })
});

app.listen(3000);
