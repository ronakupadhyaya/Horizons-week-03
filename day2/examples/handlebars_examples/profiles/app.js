var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data.json');

app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
// Sort them according to gender
app.get('/', function(req, res) {

  res.render('handlebar_template', {
    students: data,
    otherData: 'Cortes'
  })
})

app.get('/male', function(req, res) {
  res.render('handlebar_template', {
    first_name: first_name,
    last_name: last_name,
    email: email
  })
})

app.get('/female', function(req, res) {
  res.render('handlebar_template', {
    first_name: first_name,
    last_name: last_name,
    email: email
  })
})



app.listen(3000);
console.log("running on port 3000");
