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
  fur_color: String
});

var crookshanks = new Cat({'name': 'Crookshanks', 'fur_color': 'black'});
var mr_bigglesworth = new Cat({'name': 'Mr. Bigglesworth', 'fur_color': 'white'});
var empurress = new Cat({'name': 'empurress', 'fur_color': 'calico'});

// crookshanks.save(function (err) {
//   if (err) {
//     console.log('error occured', err);
//   } else {
//     console.log('success');
//   }
// })

// mr_bigglesworth.save(function (err) {
//   if (err) {
//     console.log('error occured', err);
//   } else {
//     console.log('success');
//   }
// })

// empurress.save(function (err) {
//   if (err) {
//     console.log('error occured', err);
//   } else {
//     console.log('success');
//   }
// })

Cat.findOne({'name': 'Mr. Bigglesworth'}, function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
