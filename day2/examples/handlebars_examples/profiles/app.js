var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
var friendsMale = [];
var friendsFemale = [];
for (var i=0; i < data.length; i++) {
  if (data[i].gender === "Male") {
    friendsMale.push(data[i]);
  }
  if (data[i].gender === "Female") {
    friendsFemale.push(data[i]);
  }
  friendsMale;
  friendsFemale;
}

app.get('/', function(req,res) {
  res.render('looping', {
    friends: data
  });
});

app.get('/male', function(req,res) {
  res.render('looping', {
    friends: friendsMale
  });
});

app.get('/female', function(req,res) {
  res.render('looping', {
    friends: friendsFemale
  });
});

app.listen(3000);
