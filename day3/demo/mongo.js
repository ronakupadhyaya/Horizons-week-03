"use strict";

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI); //access data in env.sh

var Student = mongoose.model("Student", {
  name : String
})

var max = new Student({name : 'max'});
max.save(function(err) {
  if (err) {
    console.log("err");
  } else {
    console.log("success");
  }
})
