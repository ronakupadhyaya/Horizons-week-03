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
  contributions: {
    type: Array
  },
  categories: {
    type: String,
    enum: ['Famous MuppetFrogs, Current Black Presidents', 'The pen is mightier',' Famous mothers', 'Drummers Named Ringo', '1 Letter words', 'Months that start with february', 'How many fingers am I holding up', 'Potent potables']
  }
});


module.exports = {
  Project: Project
}
