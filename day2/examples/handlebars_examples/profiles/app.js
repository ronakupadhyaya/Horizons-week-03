var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require('fs')

var app = express();
var thedata = require('./data');

var data = require('./data.json');

var dogs = [{first: 'me'}, {first: '1'}, {first: '3'}];

app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  var all = true; //comment
  res.render('index', {
    all: all,
    data: data,
  })
})

function getFemArr(arr) {
  var retArr = [];
  arr.forEach(function(person) {
    if(person.gender === "Female") {
      retArr.push(person);
    }
  })
  return retArr;
}

function getMaleArr(arr) {
  var retArr = [];
  arr.forEach(function(person) {
    if(person.gender === "Male") {
      retArr.push(person);
    }
  })
  return retArr;
}

app.get('/:tag', function(req, res) {
  var male = (req.params.tag === 'male' ? true : false);
  var malArr = getMaleArr(data);
  var female = (req.params.tag === 'female' ? true : false);
  var femArr = getFemArr(data);

  res.render('index', {
    male: male,
    female: female,
    femArr : femArr,
    malArr : malArr,
  })
})

app.listen(3000);
console.log("profiles commence");
