"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat; // YOUR CODE HERE - define the cat model
Cat = mongoose.model('Cat', {
  name: String,
  furColor: String
});

var one = new Cat ({
  name: 'Crookshanks',
  furColor: 'Black'
});

var two = new Cat ({
  name: 'Mr. Bigglesworth',
  furColor: 'White'
});

var three = new Cat ({
  name: 'Empurress',
  furColor: 'Calico'
});

one.save(function(err) {
  // if (err) {
  //   console.log('could not save', err);
  // }
  // else {
  //   console.log('success');
  // }
  Cat.find(function(error, cats) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', cats);
    }
  });
});

two.save(function(err) {
  // if (err) {
  //   console.log('could not save', err);
  // }
  // else {
  //   console.log('success');
  // }
  Cat.find(function(error, cats) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', cats);
    }
  });
});

three.save(function(err) {
  // if (err) {
  //   console.log('could not save', err);
  // }
  // else {
  //   console.log('success');
  // }
  Cat.find(function(error, cats) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', cats);
    }
  });
});


// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });

Cat.findOne({name: 'Mr. Bigglesworth'}, function(error, ans) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', ans);
  }
});
