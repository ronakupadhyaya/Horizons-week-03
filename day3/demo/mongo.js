'use strict'

var mongoose = require('mongoose');
mongoose.connect(process.env.MONOGODB_URI)

// console.log(`monogo uri is ${process.env.MONOGODB_URI}`);

// each student is going to have a name!
var Student = mongoose.model('Student', {
  name: String
}); //creates the collection

// var tim = new Student({name: 'Timmy'}); //creates a document
//
// tim.save(function(err){
//   if (err) {
//     console.log('could not save', err);
//   } else {
//     console.log('success');
//   }
// });

Student.find({name: 'Timmy'}, function(err, students) {
  if (err) {
    console.log('Something went wront', err);
  } else {
    console.log('students', students);
  }
});
