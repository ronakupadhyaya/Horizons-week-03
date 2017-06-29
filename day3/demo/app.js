"use strict";

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
app.engine('hbs', exphbs({
  'extname': 'hbs',
  'defaultLayout': 'main'
}));
app.set('view engine', 'hbs');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Index page'
  });
});

app.get('/moose', function(req, res) {
  res.render('moose', {
    title: 'Moose page'
  });
});

// var Student = mongoose.model('students', {
//   name: String,
//   favoriteFood: String
// });

// var Cat = mongoose.model('Cat', {
//   name: {
//     type: String,
//     required: true
//   },
//   furColor: String
// });
//
// new Cat({
//   furColor: 'Calico'
// }).save(function(err) {
//   if (err) {
//     console.log('ERROR', err);
//   } else {
//     new Cat({
//       name: 'Crookshanks',
//       furColor: 'Black'
//     }).save(function(err) {
//       if (err) {
//         console.log('ERROR', err);
//       } else {
//         console.log('SAVED!');
//         Cat.find(function(err, cats) {
//           console.log('ALL CATS', cats);
//         });
//       }
//     });
//   }
// });
//
// console.log('DONE');

// new Student({
//   name: 'Leo',
//   favoriteFood: 'Pasta'
// })
// .save(function(err) {
//   if (err) {
//     console.log('ERROR', err);
//   } else {
//     console.log('SAVED!');
//   }
// });
//
// // console.log('A');
// Student.findOne({
//   name: 'Moose'
// },function(err, student) {
//   if (err) {
//     console.log('ERROR', err);
//   } else {
//     console.log('B', student);
//     student.remove(function(err2) {
//       console.log('DELETED');
//     });
//   }
// });
// // console.log('C');
//
// var counter = 0;
// app.get('/', function(req, res) {
//   counter++;
//   res.render('index.hbs', {
//     counter: counter
//   });
// });
//
app.listen(3000, function() {
  console.log('Running on port 3000!');
});
