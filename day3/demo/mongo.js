"use strict"

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Student = mongoose.model('Student', {
	name: String
});

var max = new Student({name: 'Max'});
max.save(function(err){
	if (err){
		console.log('could not save', err);
	} else {
		console.log('success')
	}
});

// Student.find({name: 'Moose'}, function(error, students) {
//   if (error) {
//     console.log('Error', error);
//   } else {
//     console.log('Students', students);
//   }
// });