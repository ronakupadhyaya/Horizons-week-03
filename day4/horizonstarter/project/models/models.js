var mongoose = require('mongoose');
var connect = require('./connect');

mongoose.connect(connect);

module.exports = {
	project: mongoose.model('project', {
		title: {
			type: String,
			required: true
		},
		contributions: [{
			name: {
				type: String
			},
			comment: {
				type: String
			},
			amount: {
				type: Number
			}
		}],
		
	})
}