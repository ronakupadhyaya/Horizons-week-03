"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true
  },
  goal: {
    type: Number,
    requierd: true
  },
  description: {
    type: String,
    requierd: false
  },
  start: {
    type: Date,
    requierd: true
  },
  end: {
    type: Date,
    requierd: true
  },
  contributions: [{
    name: String,
    amount: Number
  }]
});


module.exports = {
  Project: Project
}
