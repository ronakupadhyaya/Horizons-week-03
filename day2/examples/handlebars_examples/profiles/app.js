var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.send(data);
});

app.get('/male', function(req, res){
  var male = []
  for(var i = 0; i < data.length; i++){
    if(data[i]['gender'] === 'Male'){
      male.push(data[i].first_name);
      //console.log(data[i].first_name);
    }
  }
  res.render('index', {data: male});
});

app.listen(3000);
