"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {   //is what collection called in mLab. can be called whatever
  //mongoose pluralizes it. 'Cat inside is collection name and var Cat is model name
  name: String,
  furColor: String
}); // YOUR CODE HERE - define the cat model

//to validate
// name: {
  //type: String,
  //required: true
//}

var Cat1 = new Cat ({name: 'Crookshanks', furColor: 'black'});
var Cat2 = new Cat ({name: 'Mr. Bigglesworth', furColor: 'white'});
var Cat3 = new Cat ({name: 'Empurress', furColor: 'Calico'});
  Cat1.save( function() { //make sure on happen after another
  Cat2.save( function() {
  Cat3.save( function() { // async so find occurs before save. Save first before find.
      Cat.find(function(error, cats) {
        if (error) {
          console.log("Can't find cats", error);
        } else {
          console.log('Cats', cats);
        }
      });
    });
  });
});

Cat.findOne({name: 'Mr. Bigglesworth'}, function(error, Cat) {
  if (error) {
    console.log('Error', error);
  } else {
    console.log('Cat', Cat);
  }
});
