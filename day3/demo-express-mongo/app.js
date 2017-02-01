var express = require('express');
var exphbs  = require('express-handlebars');

// MONGOOSE
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));
var Cat = mongoose.model('Cat', {name: String, furColor: String});
// MONGOOSE

var app = express();

// views/partials

app.engine('hbs', exphbs({
  'extname': 'hbs',
  'defaultLayout': 'main'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  var mongoQuery = { };
  if (req.query.name) {
    mongoQuery.name = req.query.name;
  }
  Cat.find(mongoQuery, function(error, catsFromMongo) {
    res.render('index.hbs', {
      cats: catsFromMongo
    });
  })
});

app.get('/other', function(req, res) {
  res.render('other');
});


// app.engine('hbs', exphbs({extname:'hbs', defaultLayout: 'main.hbs'}));
// app.set('view engine', 'hbs');
//
// app.get('/', function (req, res) {
//     res.render('index.hbs');
// });
//
// app.get('/other', function (req, res) {
//     res.render('other.hbs');
// });

app.listen(3000);
