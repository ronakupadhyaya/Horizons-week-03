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
  res.render('index', {
    students: data
  });
});

app.get('/:Gender', function(req, res){
  var female = data.filter(function(arr){
    return arr.gender === "Female";
  });
  var male = data.filter(function(arr){
    return arr.gender === "Male";
  });
  var sex = null;
  if (req.params.Gender === "male"){
    sex = male;
  } else if (req.params.Gender === "female"){
    sex = female;
  }

  res.render('studentlist', {
    students: sex,
    Gender: req.params.Gender
  })
});


app.listen(3000);
