var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require('fs');

var JSON_FILE = 'data.json'
//ensureFileExists();
var data = JSON.parse(fs.readFileSync(JSON_FILE));

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/', function(req, res) {
  res.render('index', {
    profiles: data
  })
})

app.get('/:gender', function(req, res) {
  var localData = data.filter(function(profile) {
    if (profile.gender.toLowerCase() === req.params.gender.toLowerCase()) {
      return true
    } else {
      return false
    }
  })
  res.render('index', {
    profiles: localData
  })
})
app.listen(3000);
console.log('up and running...')
