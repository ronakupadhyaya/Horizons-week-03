"use strict";
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
// console.log('mongo uri', process.env.MONGODB_URI);

var Student = mongoose.model('Student', {
  name: String
});

var max = new Student({name: 'Max'});
max.save(function(err){
  if(err){
    console.log('could not save');
  } else {
    console.log('success!');
  }
});
