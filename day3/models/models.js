"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model("cat", {
  name: String,
  furColor: String
});// YOUR CODE HERE - define the cat model

var Crookshanks = new Cat ({
  name: "Crookshanks",
  furColor: "Black"
});

var Bigglesworth = new Cat ({
  name: "Mr. Bigglesworth",
  furColor: "White"
});

var Empurress = new Cat ({
  name: "Empurress",
  furColor: "Calico"
});

Crookshanks.save();
Bigglesworth.save();
Empurress.save();

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
