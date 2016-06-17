var mongoose = require('mongoose');
var connect = require('./connect');

mongoose.connect(connect);

module.exports={
	project: mongoose.model('project', {
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		goal: {
			type: String,
			required: true
		},
		user:{
			type: String,
			required: true
		},
		raised:{
			type: String,
			required: true
		},
		percent:{
			type:String,
			required: true
		},
		complete:{
			type: Boolean,
			required: true
		},
		category: {
			type: String,
			required: true
		},
		date: {
			type: String
		}
	})
}