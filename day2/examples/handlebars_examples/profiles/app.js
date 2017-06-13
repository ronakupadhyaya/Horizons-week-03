var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/*',function(req,res){
  var gender = [];
  if (req.params['0'] === 'male') {
    data.forEach(function(peo) {
      if (peo.gender === "Male") {
        gender.push(peo);
      }
    })
  } else if (req.params['0'] === 'female') {
    data.forEach(function(peo) {
      if (peo.gender === "Female") {
        gender.push(peo);
      }
    })
  } else {
    gender = data;
  }
  res.render('index', {
    friends: gender
  })
})
app.listen(3000);
