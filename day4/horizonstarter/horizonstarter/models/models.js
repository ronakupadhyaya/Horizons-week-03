var mongoose = require('mongoose');
var connect = require('./connect');

mongoose.connect(connect);

module.exports(connect) {
	project: mongoose.model('Project', {
		title: String,
		required: true
	})
};