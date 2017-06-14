var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({
  extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/*', function(req, res) {
  // res.render('index', {
  //   data: data
  // });
  var people = [];
  if (req.params[0] === 'male') {
    data.forEach(function(person) {
      if (person.gender === 'Male')
        people.push(person);
    });
  } else if (req.params[0] === 'female') {
    data.forEach(function(person) {
      if (person.gender === 'Female')
        people.push(person);
    })
  } else {
    people = data;
  }
  res.render('index', {
    people: people
  })
});



/*
app.get('/:word', function(req, res) {
  var gender = (req.params.word === 'female' ? true : false);
  res.render('index', {
    word: req.params.word,
    gender: gender
  });
});
*/




app.listen(3000);
