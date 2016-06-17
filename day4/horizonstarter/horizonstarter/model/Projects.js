var mongoose = require('mongoose');


var ProjectSchema = new Mongoose.schema({
	title: String,
	description: String,
	category: String,
	fundraisingGoal: Number,
	startDate: Date,
	endDate: Date,
	about: String
});

var Project = mongoose.model('myprojects', ProjectSchema);

var date = new Date(2016, 6, 17);
var dateTwo = new Date(2016, 7, 19);

var firstProject = new Project({title: "Project 1", description: "test", category: "test", fundraisingGoal: 10000000, startDate: date, endDate: dateTwo, about: "hope this works"});

