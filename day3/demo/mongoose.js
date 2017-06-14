"use strict";
var mongoose = require('mongoose');
// console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)

// create collection
var Student = mongoose.model('Student', {
  name: String
})

var max = new Student({name: 'max'})
max.save(function(err) {
  if (err) {
    console.log('cannot save' )
  } else {console.log('success')}
});

Student.find(function(err, students) {
  if (err) {console.log('something wrong', err)}
  else {
    console.log('students', students)
  }
})
