"use strict";

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI); //connect to MongoDB

var Student = mongoose.model('Student', {
	name: String
});

var max = new Student({name: 'Max'});
max.save(function(err) {
	if (err) {
		console.log('could not save,' err);
	}
	else {
		console.log('success');
	}
})

Student.find(function(err, students) {
	if (err) {
		console.log('could not save,' err);
	}
	else {
		console.log('students', students);
	}
})
