"use strict";

// Project model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
  title: String,
  goal: Number,
  raised: Number,
  category: {
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
  description: String,
  start: Date,
  end: Date
});
module.exports = mongoose.model('Project', ProjectSchema);
