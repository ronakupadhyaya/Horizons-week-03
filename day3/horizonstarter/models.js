"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true
  }
  goal: {
    type: Number,
    required: true
  }
  description: {
    type: String,
  }
  start: {
    type: Date,
    required: true
  }
  end: {
    type: Date,
    required: true
  }

  // YOUR CODE HERE

});

module.exports = {
  Project: Project
}
