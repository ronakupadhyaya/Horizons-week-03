"use strict";

// Project model
var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  title: String,
  goal: Number,
  description: String,
  start: Date,
  end: Date, 
  contributions: Array,
  category: {
    type: String,
    enum: ['Famous Muppet Frogs', 'Current Black Presidents', "The Pen Is Mightier"]
  }
})
var Project = mongoose.model('Project', projectSchema);

module.exports = {
  Project: Project
}
