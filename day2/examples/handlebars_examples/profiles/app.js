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
  res.render('index.hbs', {
    people: data
  })
})

app.get('/:gender', function(req, res) {
  var gender = req.params.gender;
  if (gender === 'male') gender = 'Male'
  if (gender === 'female') gender = 'Female'
  res.render('index.hbs', {
    people: data.filter(function(item, index) {
      return (item.gender === gender)
    })
  })
})

// app.get('/male', function(req, res) {
//   data.forEach(function(item, index) {
//     if (item.gender === 'Male') item.bool = true;
//     else item.bool = false;
//   })
//   res.render('index.hbs', {
//     people: data
//   })
// })
//
// app.get('/female', function(req, res) {
//   data.forEach(function(item, index) {
//     if (item.gender === 'Female') item.bool = true;
//     else item.bool = false;
//   })
//   res.render('index.hbs', {
//     people: data
//   })
// })









app.listen(3000);
console.log('started');
