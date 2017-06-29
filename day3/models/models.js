"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

 // YOUR CODE HERE - define the cat model
var Cat = mongoose.model('Cat', {
  name: String,
  furColor: String
});

/*new Cat({
  name: "Crookshanks",
  furColor: "Black"
}).save(function(err) {
  if (err) {
    console.log("ERROR", err);
  } else {
    console.log("SAVED!");
  }
});

new Cat({
  name: "Mr. Bigglesworth",
  furColor: "White"
}).save(function(err) {
  if (err) {
    console.log("ERROR", err);
  } else {
    console.log("SAVED!");
  }
});

new Cat({
  name: "Empurress",
  furColor: "Calico"
}).save(function(err) {
  if (err) {
    console.log("ERROR", err);
  } else {
    console.log("SAVED!");
  }
});*/

Cat.findOne({name: "Mr. Bigglesworth"}, function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
