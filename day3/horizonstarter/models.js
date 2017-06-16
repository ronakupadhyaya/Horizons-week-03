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
    required: true
  },
  description: {
    type: String
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  contributions:{
    type: [{name: String, amount: Number}]
  },
  total: Number,
  category: {
    type: String,
    required: true,
    enum: ['Famous Muppet Frogs', 'Current Black Presidents', 'The Pen Is Mightier',
            'Famous Mothers', 'Drummers Named Ringo', '1-Letter Words', 'Months that Start with "Feb"',
            'How Many Fingers Am I Holding Up', 'Potent Potables']
  }
  // YOUR CODE HERE
});

module.exports = {
  Project: Project
}
