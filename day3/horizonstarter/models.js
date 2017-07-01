"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: [true, 'Title required']
  },
  goal: {
    type: Number,
    required: [true, 'Goal required']
  },
  description: String,
  start: {
    type: Date,
    required: [true, 'Start date required']
  },
  end: {
    type: Date,
    required: [true, 'End date required']
  },
  contributions: [{
    name: String,
    amount: Number
    }],
  category: {
    type: String,
    enum: ['frogs','presidents', 'pen', 'mothers', 'ringo', 'words', 'feb', 'fingers', 'potables']
    }
});

module.exports = {
  Project: Project
}
