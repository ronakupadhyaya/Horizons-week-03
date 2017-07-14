"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('cat', {
  name: String,
  furColor: String
}); // YOUR CODE HERE - define the cat model

// you can't use while loops with async code

new Cat({
  name: 'Mr. Bigglesworth',
  furColor: 'Calico'
}).save(function(err) {
  if (err) {
    console.log('ERROR', err);
  } else {
    new Cat({
      name: 'Crookshanks',
      furColor: 'Black'
    }).save(function(err) {
      if (err) {
        console.log('ERROR', err);
      } else {
        console.log('SAVED!');
        Cat.find(function(err, cats) {
          console.log('ALL CATS', cats);
        });
      }
    });
  }
});

//
// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
