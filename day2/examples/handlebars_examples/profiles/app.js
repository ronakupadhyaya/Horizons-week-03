var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var app = express();

app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Directory of all students
var data = JSON.parse(fs.readFileSync('data.json'));


app.get('/', function(req, resp){
  resp.render('index', {
    //store json data into people
    people: data
  });
});

app.get('/male', function(req, resp){
  var male = _.filter(data, function(obj){
    return obj.gender === "Male";
  })

  resp.render('index',{
    male: true,
    people: male
  });
});

app.get('/female', function(req, resp){
  var female = _.filter(data, function(obj){
    return obj.gender === "Female";
  })

  resp.render('index',{
    female: true,
    people: female
  });
});

app.listen(3000);
