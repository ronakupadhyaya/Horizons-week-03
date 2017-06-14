var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
var data = require('./data.json');

app.get('/', function(req, res){
  res.render('index', {
    students: data
  });
});

app.get('/:gender', function(req, res){
  var isFemale = (req.params.gender === 'female');
  var isMale = (req.params.gender === 'male');
  res.render('index', {
    students: data,
    isFemale: isFemale,
    isMale: isMale
  });
});

// app.get('/male', function(req, res){
//   res.render('index', {
//     students: data
//   });
// });

// app.get('/:', function(req, res){
//   var female = (req.params.gender === 'female');
//   var male = (req.params.gender === 'male');
//   var all = (req.params.gender === undefined);
//   res.render('index', {
//     students:
//   });
// });

app.listen(3000);
console.log(`Let's go!`);
