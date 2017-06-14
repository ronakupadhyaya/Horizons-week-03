"use strict";

var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
mongooose.connect(process.env.MONGODB_URI);

var Student = mongoose.model('Student', {
  name: String
})

Student.find({name: 'Dominic'})

var app = express();
app.engine('hbs', exphbs({
  'extname': 'hbs'
  //defaultLayout: 'main.hbs'
}));
app.set('view engine', 'hbs');

var counter = 0;
app.get('/', function(req, res) {
  counter++;
  res.render('index.hbs', {
    counter: counter
  });
});

app.get('/second', fucntion(req, res){
  res.render('second');
})


app.listen(3000, function() {
  console.log('Running on port 3000!');
});
