"use strict";

// Project model
var mongoose = require('mongoose');

var Total = mongoose.model('Total', {
  totalAmount: {
    type: Number,
    required: true
  }
}, "projects");



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
  totalContributions: {
    type: Number,
    required: true
  },
  percentFunded: {
    type: Number,
    required: true
  },
  contributions: {
    type: [{
      name: String,
      amount: Number
    }]
  },
  category: {
    type: String,
    enum: ['Famous Muppet Frogs',
    'Current Black Presidents',
    'The Pen Is Mightier',
    'Famous Mothers',
    'Drummers Named Ringo',
    '1-Letter Words',
    'Months That Start With "Feb"',
    'How Many Fingers Am I Holding Up',
    'Potent Potables']
  }
});

module.exports = {
  Project: Project,
  Total: Total
}
