"use strict";

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Student = mongoose.model('Student', {
  name: String
});

// var dominic = new Student({name: 'Dominic'});
// dominic.save(function(err) {
//   if (err) {
//     console.log('could not save', err);
//   } else {
//     console.log('success');
//   }
// });

Student.find(function(err, students) {
  if (err) {
    console.log('Something went wrong', err);
  } else {
    console.log('students', students);
  }
})