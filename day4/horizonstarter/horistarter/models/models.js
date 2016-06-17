var mongoose = require('mongoose');
var connect = require('./connect');

mongoose.connect(connect);

var projectSchema = new mongoose.Schema ({
	title: {
		type: String,
		required: true
	},
	goal: {
		type: Number,
		required: true
	},
	raised: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	description: {
		type: String,
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
	contributions: {
		type: Array,
	}
});

projectSchema.virtual('percent').get(function () {
	return Math.round(this.raised / this.goal * 100);
});

module.exports = {
	project: mongoose.model('project', projectSchema),
	user: mongoose.model('user', {
		username: {
			type: String,
			required: true
		}
	})
};




