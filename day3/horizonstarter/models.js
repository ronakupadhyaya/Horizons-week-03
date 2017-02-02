"use strict";
// Project model
//ctrl+shift+p -> auto indent
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
     type: String,
   },
   start: {
     type: Date,
     required: true
   },
   end: {
     type: Date,
     required: true
   }
}),

  contribution: {
    type: [{
      name: String,
      amount: Number
    }]

    //Array, contains an array of objects with name and amount properties.

  }
module.exports = {
  Project: Project
}
