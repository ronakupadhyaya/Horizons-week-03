"use strict";

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)

var Student = mongoose.model('student', {
  name:String,
  age:String
}) //student is a collection

var max = new Student({name:'Max',age:"18"}) //new Document
// max.save(function(err) {
//   if (err) {
//     console.log("could not save",err)
//   } else {
//     console.log("success")
//   }
// })

Student.find({name:'Max'},function(err,students) {
  if (err) {
    console.log('Something went wrong',err)
  } else {
    console.log(students)
  }
})
