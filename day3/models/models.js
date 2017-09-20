"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// YOUR CODE HERE - define the cat model generally
var Cat = mongoose.model('Cat', {
  name: { // using the object notation, can set a property named require
    type: String,
    required: required // check mongoose validation for other options
  },
  furColor: String
});

// to create a specific cats

var newCat = new Cat ({
  name: "Crookshanks",
  furColor: "black"
});

newCat.save(function(err){
  if (err) {
    console.log("Couldn't save Crookshanks");
  } else {
    Cat.find(function(error,cats) {
      if (error) {
        console.log("Can't find cats", error);
      } else {
        console.log ("Cats", cats);
      }
    });
  }
});

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
