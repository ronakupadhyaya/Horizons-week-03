"use strict";

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Student = mongoose.model("Student", {
	name: String
});

var patrick = new Student({name: "Patrick"});

patrick.save(function(err) {
	if (err) {
		console.log("Could not save", err);
	} else {
		console.log("Success");
	}
});