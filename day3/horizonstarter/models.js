"use strict";

// Project model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
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
    type: [{
      name : String,
      amount: Number
    }]
  },
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
  img_url: {
    type: String
  }

})
ProjectSchema.index({name: 'text', 'title': 'text'});
var Project = mongoose.model('Project', ProjectSchema);


module.exports = {
  Project: Project
}
