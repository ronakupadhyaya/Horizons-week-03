"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: String,
  furcolor: String
}) // YOUR CODE HERE - define the cat model

var newCat = new Cat({
  name: 'Crooksshanks',
  furcolor: 'black'
})
newCat.save(function(err) {
  if(err) {
    console.log("couldn't save bruah");
  } else {
    console.log("SUCCESS");
  }
})
Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
