"use strict";

// Project model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
           'Potent Potables'
          ]
  },
  contributions: [{
    type: Schema.ObjectId,
    ref: 'Contribution'
  }]
});

var Contribution = mongoose.model('Contribution', {
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

module.exports = {
  Project: Project,
  Contribution: Contribution
}
