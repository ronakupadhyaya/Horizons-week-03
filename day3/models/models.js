"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('cat', {
  name: {
    type: String,
    required: true //require that this key have a value for each cat
  },
  furColor: String
}, 'cat');

var crookshanks = new Cat({
  name: "Crookshanks",
  furColor: "Black"
});

var bigglesworth = new Cat({
  name: "Mr. Bigglesworth",
  furColor: "White"
});

var empurress = new Cat({
  name: "Empurress",
  furColor: "Calico"
});

// crookshanks.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Saved!');
//   }
// });
//
// bigglesworth.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Saved!');
//   }
// });
//
// empurress.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Saved!');
//   }
// });

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.findOne({name: "Mr. Bigglesworth"}, function(error, cat) {
  if(error) {
    console.log(error);
  } else {
    console.log(cat);
  }
})
