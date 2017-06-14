var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require('fs');

var app = express();
var data = require('./data');

//var dat = JSON.parse(fs.readFileSync(data));

app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index', {data:data });
});

app.get('/male', function(req, res) {
  var male=data.filter(function(item){

    return item.gender==="Male";
  });

  res.render('index', {
    male:male,
    m:true
   });
});

app.get('/female', function(req, res) {

  var female=data.filter(function(item){
    return item.gender==="Female";
  })

  res.render('index', {
    female:female,
    f:true
   });
});

app.listen(3000);
console.log("loop")
