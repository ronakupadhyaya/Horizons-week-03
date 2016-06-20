var mongoose = require('mongoose');
mongoose.connect('mongodb://spark423:psh8181@ds019254.mlab.com:19254/horizonstart')
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

projectSchema.virtual('raised').get(function() {
	this.contributions.map(function(el) {
		return el.amount
	}).reduce(function(a,b) {
		return a+b;
	},0)
})

projectSchema.virtual('progress').get(function() {
	if (this.goal>0) {
		return Math.floor(this.raised/this.goal*100)
	}
})




module.exports = mongoose.model('Project', projectSchema);

