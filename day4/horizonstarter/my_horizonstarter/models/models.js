var mongoose = require('mongoose');
var connect = require('./connect');
//use ./ because it's in the current directory

mongoose.connect(connect);

//project in the context of kickstarter, model for kickstarter
module.exports = {
	project: mongoose.model('project', {
		title: {
			type: String,
			required: true
		}, 
		description: {
			type: String,
			required: true
		}, 
		category: {
			type: String,
			required: true
		},
		amount: {
			type: Number,
			required: true
		},
		startdate: {
			type: Date,
			required: true
		},
		enddate: {
			type: Date,
			required: true
		},
		funded: {
			type: Number,
			required: true
		},
		contributions: {
			type: [],
			required: false
		}

	})
};