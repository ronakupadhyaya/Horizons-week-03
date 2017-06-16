"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model("Cat", {
  name: String,
  furColor: String
}); // YOUR CODE HERE - define the cat model

var cat1 = new Cat({name: "Crookshanks", furColor: 'Black'});
var cat2 = new Cat({name:"Mr. Biggle", furColor: 'White'});
var cat3 = new Cat({name:'Empuress', furColor: 'Calico'});
cat1.save();
cat2.save();
cat3.save();

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
