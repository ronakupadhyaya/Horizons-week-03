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
			type: Number,
			default: 0
		},
		percent:{
			type:Number,
			default: 0
		},
		complete:{
			type: Boolean,
			default: false
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