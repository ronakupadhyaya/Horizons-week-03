var mongoose = require('mongoose');
var connect = require('./connect');

mongoose.connect(connect);

// module.exports = {
// 	project: mongoose.model('Project', {
// 		title: {
// 			type: String,
// 			required: true
// 		}
// 	})
// };

var Schema = mongoose.Schema;
var ProjectSchema = new Schema ({
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
    required: true,
    enumValues: [
      'Famous Muppet Frogs',
      'Current Black Presidents',
      'The Pen Is Mightier',
      'Famous Mothers',
      'Drummers Named Ringo',
      '1-Letter Words',
      'Months That Start With "Feb"',
      'How Many Fingers Am I Holding Up',
      'Potent Potables'
    ]
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

// virtuals allow the project schema to get updated
ProjectSchema.virtual('raised').get(function() {
	return this.contributions.map(function(el) {
		return el.amount;
	}).reduce(function(a, b) {
		return a + b
	}, 0);
});

ProjectSchema.virtual('progress').get(function() {
	if (this.goal > 0)
  // Calculate percentage and round down.
    return Math.floor(this.raised/this.goal*100);
  return 0;
});

module.exports = {
	projectSchema: ProjectSchema,
	project: mongoose.model('Project', ProjectSchema)
}

