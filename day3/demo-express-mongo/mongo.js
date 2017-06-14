"use strict";

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

//model is defining a new collection; like object constructor
var Student = mongoose.model('Student', {
  name: String
});

var max = new Student({name: 'Max'})
max.save(function(err){
  if(err) {
    console.log('could not save', err);
  } else {
    console.log('success');
  }
});

// Student.find({name: 'Dominic'}, function(err, students){
//   if (err) {
//     console.log(err)
//   } else {
//
//   }
// })
