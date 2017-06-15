"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true
  },
  // YOUR CODE HERE
  goal: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  contributions: [{
      name: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
  }]
});

module.exports = {
  Project: Project
}
