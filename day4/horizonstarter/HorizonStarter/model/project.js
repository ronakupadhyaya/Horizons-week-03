var mongoose = require('mongoose');
mongoose.connect('mongodb://spark423:psh8181@ds017544.mlab.com:17544/horizon_starter')
var projectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},

	goal: {
		type: Number,
		required: true
	},
    contributions: [{
      name: {
        type: String,
        required: true
      },
      comment: String,
      amount: {
        type: Number,
        required: true
      }
    }],
	category: {
		type: String,
		required: true
	},

    description: {
    	type: String,
    	required: true
    },

	start: {
		type: Date,
		required: true
	},
	end: {
		type: Date,
		required: true
	}
});
module.exports = mongoose.model('Project', projectSchema);

