var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

var Student = mongoose.model("Student", {
  name: String
});

var max = new Student({name: "Max"});

max.save(function(err){
  if (err){
    console.log("could not save", err);
  }
  else{
    console.log('success');
  }
})

Student.find(function(err, students){
  if (err){
    console.log("something went wrong", err);
  }
  else{
    console.log("found it!");
  }
})
