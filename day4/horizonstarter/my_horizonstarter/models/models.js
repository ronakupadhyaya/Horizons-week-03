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
    amount: {
    	required: true,
    	type: Number
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
    }
  })
}