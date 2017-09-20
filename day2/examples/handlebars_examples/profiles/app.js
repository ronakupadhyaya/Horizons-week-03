// [{"id":1,"first_name":"Bonnie","last_name":"Ellis","email":"bellis0@vkontakte.ru","gender":"Female"},
var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data.json');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index', {people:data});
});

app.get('/:gender', function(req, res) {
  var gender = req.params.gender.toLowerCase();
  var fdata = data.filter(function(female){
    //console.log(female);
    //console.log(female.gender);
    if(female.gender === 'Female'){
      return female;
    }
  })
  console.log(fdata);
  var mdata = data.filter(function(male){
    if(male.gender === 'Male'){
      return male;
    }
  })
  //console.log(mdata);
  if(gender === 'female'){
    res.render('index', {people: fdata});
  }else{
    res.render('index', {people: mdata});
  }
});


app.listen(3000);
