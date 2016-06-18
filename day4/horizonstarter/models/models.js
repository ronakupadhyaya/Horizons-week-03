var mongoose = require('mongoose');
var connect = require('./connect');

mongoose.connect(connect);

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
		goal: {
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
		}
	}),


	contribution: mongoose.model('contribution', {
		name: {
			type: String,
			required: true
		},
		comment: {
			type: String,
		},
		amount: {
			type: Number,
			required: true
		},
		projectid: {
			type: String,
			required: true
		}

	})







}