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
  furColor: String
}); // YOUR CODE HERE - define the cat model

var crookshanks = new Cat ({
  name: 'Crookshanks',
  furColor: 'Black'
})



var mrBigglesworth = new Cat ({
  name: 'Mr. Bigglesworth',
  furColor: 'White'
})




var empurress = new Cat ({
  name: 'Empurress',
  furColor: 'Calico'
})

empurress.save(function(err){
  mrBigglesworth.save(function(err){
    crookshanks.save(function(err){
      Cat.findOne({name: 'Mr. Bigglesworth'}, function(error, cats) {
        if (error) {
          console.log("Can't find cats", error);
        } else {
          console.log('Cats', cats);
        }
      });
    })
  })
});

// Cat.findOne = Cat.find.bind(null, {name: 'Mr. Bigglesworth'}, function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
//
// Cat.findOne();
