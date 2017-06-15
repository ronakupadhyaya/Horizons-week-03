"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    require: true
  },
  // YOUR CODE HERE
  goal: {
    type: Number,
    require: true
  },
  description: {
    type: String
  },
  start: {
    type: Date,
    require: true
  },
  end: {
    type: Date,
    require: true
  },
  constributions: {
    type: Array
  }
});

module.exports = {
  Project: Project
}
