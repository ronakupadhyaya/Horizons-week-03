var mongoose = require('mongoose');
var connect = require('./connect');

mongoose.connect(connect);

module.exports = {
  project: mongoose.model('Project', {
    title: {
      type: String,
      required: true
    },
    goal: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    desc: {
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
    donation: {
      type: Number 
    }
  })

};
