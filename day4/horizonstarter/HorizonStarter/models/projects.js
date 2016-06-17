var mongoose = require('mongoose');
mongoose.connect('mongodb://spark423:psh8181@ds011860.mlab.com:11860/horizonstarter');
var projectSchema = mongoose.Schema({
	title: {
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
	start: {
		type: Date,
		required: true
	},
	end: {
		type: Date,
		required: true
	},
	about: {
		type: String,
		required: true
	}

});
module.exports = mongoose.model('Projects', projectSchema);
