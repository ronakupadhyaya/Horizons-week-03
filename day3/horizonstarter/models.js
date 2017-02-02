"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('project', {
  title: {
    type: String
  },
  goal: {
    type: Number
  },
  description: {
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  contributions: {
    type: [{name: String, amount: Number}]
  }
  // YOUR CODE HERE
});

module.exports = {
  Project: Project
}
