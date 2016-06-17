var mongoose = require('mongoose')


var ProjectSchema = new mongoose.Schema({
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
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	goal: {
		type: Number,
		required: true
	}, 
	donations: [
		{
			donator: {
				type: String,
				required: true
			},
			amount: {
				type: Number,
				required: true
			},
			comment: String
		}
	]
})
var Project = mongoose.model('Project', ProjectSchema)

module.exports = Project;