var mongoose = require('mongoose');
var connect = require('./connect');

mongoose.connect(connect);

module.exports = {
	project: mongoose.model('Project', {
		title: {
			type: String,
			required: true
		},
		category: {
			type: String,
			required: true
		},
		goal: {
			type: Number,
			required: true
		},
		total: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		start: {
			type: String,
			required: true
		},
		end: {
			type: String,
			required: true
		},
		contrib: {
			type: Array,
			required: true
		}
	})
}