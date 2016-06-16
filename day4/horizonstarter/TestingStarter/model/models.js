var mongoose = require('mongoose');
var connect = require('./connect');

mongoose.connect(connect);

module.exports = {
	project: mongoose.model('Project', {
		title: {
			type: String,
			required: true
		},
		description: {
			type: String
		}
	})

}