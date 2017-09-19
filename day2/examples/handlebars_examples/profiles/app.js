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
  res.render('index', {data: data});
})

app.get('/:gender', function(req, res) {
  var isFemale = (req.params.gender === "female" ? true : false);

  res.render('gender',
    {
      data: data,
      isFemale: isFemale,
      helpers: {
      compareGender: function(s) {
        return s.gender.toLowerCase() === req.params.gender.toLowerCase();
      }}
    })
})
app.listen(3000);
