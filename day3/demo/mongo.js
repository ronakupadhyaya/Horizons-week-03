"use strict";

// creates a connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// create a model
var Student = mongoose.model('Student', {
  name: String
});
// console.log("mongodbURI", process.env.MONGODB_URI);

// creates a student (max is a document)
var max = new Student({
  name: 'Max'
});

max.save(function(err) {
  if (err) {
    console.log('could not save', err);
  } else {
    console.log('success');
  }
});


// Find everything within your Database
Student.find(function(err, students) {
  if (err) {
    console.log('Something went wrong', err;
    }
    else {
      console.log('students', students);
    }
  }
});

Student.find(function(err, students) {
  if (err) {
    console.log('Something went wrong', err;
    }
    else {
      console.log('students', students);
    }
  }
});
