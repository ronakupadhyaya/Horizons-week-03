"use strict";

// Project model
var mongoose = require('mongoose');
//mongoose is a library, used to talk to the database

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
   },
   contributions: [
     {
       name: {type: String},
       amount: {type: Number}
     }
   ],

   category: {
     type: String,
     enum: ['Famous Muppet Frogs','Current Black Presidents','The Pen Is Mightier',
   'Famous Mothers','Drummers Named Ringo','1-Letter Words',
 'Months That Start With "Feb"','How Many Fingers Am I Holding Up',
'Potent Potables']
   }

   //put the name, which is the category here


 });

 module.exports = {
   Project: Project
 }
