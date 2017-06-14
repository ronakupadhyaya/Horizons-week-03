"use strict";
console.log(process.env.MONGODB_URI);

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
//
var Student = mongoose.model("Student", {
  name: String
});

var max = new Student({name: "Max"});

max.save(function(err) {
  if (err) {
    console.log("Student could not save", err)
  } else {
    console.log("success");
  }
})


Student.find(function(err, students) {
  if (err) {
    console.log("something went wrong", err);
  } else {
    console.log("students", students)
  }
})
