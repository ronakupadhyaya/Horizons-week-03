"use strict";

// console.log('mongo uri',process.env.MONGODB_URI);

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Student = mongoose.model('Student', {
  name: String
});

var max = new Student({name: 'Pam'});
max.save(function(err){
  if(err){
    console.log('could not save', err);

  }else{
    console.log('success');
  }
})
