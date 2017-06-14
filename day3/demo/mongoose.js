'use strict'

// console.log('mongo url',process.env.MONGODB_URI);

var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

 //creates collection, which name is the 1st argument for model
var Student = mongoose.model('Student',{
  name:String
})

 //creates document
var max = new Student({name:'Max'})
//saves document
max.save(function(err){
  if (err){
    console.log('couldnt save',err);
  }
  else{
    console.log('success');
  }
})

//finds students
Student.find(function(err,students){
  if (err){
    console.log('somethin went wrong',err);
  }
  else{
    console.log('students',students);
  }
})
