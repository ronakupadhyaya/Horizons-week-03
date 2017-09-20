"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: {
    type: String,
    required: true
  },
  furColor: String
});

var newCat = new Cat({
  name: 'Crookshanks',
  furColor: 'black'
});

var newCat2 = new Cat();

newCat2.save(function(err){
  if (err){
    console.log("Couldn't save, " + err);
  } else {
    console.log("Saved Cat")
  }
  Cat.find(function(error, cats) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', cats);
    }
  });
})
