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
  category: {
    type: String,
    required: true,
    enum: ['Famous Muppet Frogs',
      'Current Black Presidents',
      'The Pen Is Mightier',
      'Famous Mothers',
      'Drummers Named Ringo',
      '1-Letter Words',
      'Months That Start With "Feb"',
      'How Many Fingers Am I Holding Up',
      'Potent Potables'
    ]
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
