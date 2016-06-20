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
		goalAmount: {
			type: Number,
			required: true
		},
		startDate: {
			type: Date,
			required: true
		},
		endDate: {
			type: Date,
			required: true
		},
		totalContribution: {
			type: Number
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
		projectId: {
			type: String,
			required: true
		}

	})
}