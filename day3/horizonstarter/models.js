"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
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
  contribution: {
    type: [{name: String, amount: Number}]
  },
  category: {
    type: String,
    enum: ["Famous Muppet Frogs",
            "Current Black Presidents",
            "The Pen Is Mightier",
            "Famous Mothers",
            "Drummers Named Ringo",
            "1-Letter Words",
            'Months That Start With "Feb"',
            'How Many Fingers Am I Holding Up',
            'Potent Potables']
  }
});

module.exports = {
  Project: Project
}
