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
})

 // YOUR CODE HERE - define the cat model
var cat0 = new Cat({name: "Crookshanks", furColor: "Black"});
var cat1 = new Cat({name: "Mr.Bigglesworth", furColor: "White"});
var cat2 = new Cat({name: "Empurress", furColor: "Calico"});

cat0.save(function(error) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats');
  }
});

cat1.save(function(error) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats');
  }
});

cat2.save(function(error) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats');
  }
});

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.findOne({ // Cat.find in this context would return an array whereas using findOne will just give back a singular object/ document
  name: "Empurress"
}, function(err, cats) {
  console.log('cats', cats);
});



// cat0.save(function() {
//   cat1.save(function() {
//     cat2.save(function() {
//       Cat.find(function(error, cats) {
//         if (error) {
//           console.log("Can't find cats", error);
//         } else {
//           console.log('Cats', cats);
//         }
//       });
//     })
//   })
// })
