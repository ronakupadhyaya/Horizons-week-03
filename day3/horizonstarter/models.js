"use strict";

// Project model
var mongoose = require('mongoose');


var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true
  },
  goal:{
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  start:{
    type: Date,
    required: true
  },
  end:{
    type: Date,
    required: true
  },
  contributions:{
    type: [{name: String, amount: String}]
  },
  progressStr:{
    type: String
  },
  category:{
    type: String,
    enum : ['Famous Muppet Frogs', 'Current Black Presidents', 'The Pen Is Mightier', 'Famous Mothers',
            'Drummers Named Ringo', '1-Letter Words', 'Months That STart with "Feb"', 'How Many Fingers Am I Holding Up',
          'Potent Potables'],
  },
});

module.exports = {
  Project: Project
}
