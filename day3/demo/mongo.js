"use strict";

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Student = mongoose.model('Student', {
  name: String
});
Student.find(function(error, students) {
  if (error) {
    console.log('Error', error);
  } else {
    console.log('Students', students);
  }
});
