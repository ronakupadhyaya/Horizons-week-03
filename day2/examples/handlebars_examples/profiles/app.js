var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get('/', function(request, response){
  response.render('index',
    {
      students: data
    }
  );
})

app.get('/male', function(request, response) {
  var maleStudents = data.filter(function(item) {
    return item.gender === 'Male'
  });
  response.render('index',
    {
      students: maleStudents
    }
  );
})

app.get('/female', function(request, response) {
  var femaleStudents = data.filter(function(item) {
    return item.gender === 'Female'
  });
  response.render('index',
    {
      students: femaleStudents
    }
  );
})





app.listen(3000);
