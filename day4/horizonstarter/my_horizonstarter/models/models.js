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
    	type: String,
    	required: true
    },
    goal: {
    	required: true,
    	type: Number
    },
    amount: {
        type: Number,
        default: 0
    },
    category: {
    	type: String,
    	required: true
    },
    start: {
    	type: String,
    	required: true
    },
    end: {
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
    }]
  })
}