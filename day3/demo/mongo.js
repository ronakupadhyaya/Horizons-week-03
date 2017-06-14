"use strict";

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)

var Student = mongoose.model('Student', {
  name: String
});

// var max = new Student({name: Max});

Student.find(function(err, students) {
  if (err) {
    console.log('Something went wrong', err);
  } else {
    console.log('students', students);
  }
})
