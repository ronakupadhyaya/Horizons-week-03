var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');

// var inputs = fs.readFileSync("data.json", { encoding : 'utf8'})

app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res){
  res.render('index', {
    data: data
  });
});

app.get('/male', function(req, res){
  var males = data.filter(function(item){
    return item.gender === 'Male';
  })

  res.render('index', {
    data: males
  });
});

app.get('/female', function(req, res){
  var females = data.filter(function(item){
    return item.gender === 'Female';
  })

  res.render('index', {
    data: females
  });
});


app.listen(3000);
