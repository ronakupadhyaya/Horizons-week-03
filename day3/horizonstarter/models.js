"use strict";

// Project model
var mongoose = require('mongoose');

// Define instance of project schema
var Project = mongoose.model('Project', {
  title: {
    type : String,
    required: true
  },
  goal : {
    type: String,
    required: true
  },
  description : {
    type: String,
  },
  start : {
    type: String,
    required: true
  },
  end : {
    type: String,
    required: true
  },
  contributions : {
    type: Array
  },
  category : {
    type: String,
    enum: [
      'Famous Muppet Frogs',
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
});

module.exports = {
  Project: Project
}
