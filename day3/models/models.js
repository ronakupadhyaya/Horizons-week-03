"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat; // YOUR CODE HERE - define the cat model

var c = new Cat({name: "Crookshanks", furColor: "grey"});
var m = new Cat({name: "Mr. Biggles", furColor: "Blue"});
var e = new Cat({name: "Empurrur", furColor: "gold"});

m.save(function(err){
  Cat.find(function(error, cats) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', cats);
    }
  })
  if(err){
    console.log("something went wrong " + err);
  } else {
    console.log("all good");

  }
})
;
