var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var _ = require('underscore');

var app = express();
var data = require('./data'); // require is synic function 

app.engine('hbs', exphbs({
  extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index', {
    container: data
  })
})
app.get('/:gender', function(req, res) {
  var gender = req.params.gender;
  if (gender === 'male') {
    res.render('index', {
      container: _.groupBy(data, function(item) {
        if (item.gender === 'Male') return 'Male';
      })['Male']
    })
  }
  if (gender === 'female') {
    res.render('index', {
      container: _.groupBy(data, function(item) {
        if (item.gender === 'Female') return 'Female';
      })['Female']
    })
  } else {
    res.render('index', {
      container: data
    })
  }
})

// app.get('/female', function(req, res) {
//
// })
// YOUR CODE HERE

app.listen(5000);
// console.log(data);
console.log('server is runnnig');
