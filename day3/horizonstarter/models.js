"use strict";
// title: make this field required
// goal: Type: Number, required
// description: Type: String
// start: Type: Date, required
// end: Type: Date, required

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true
  },
  goal: {
    type: Number,
    required: true
  },
  description: String,
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  contributions: [{
    name: String,
    amount: Number
  }],
  totalAmount: Number,
  percentage: Number,
});

module.exports = {
  Project: Project
}
