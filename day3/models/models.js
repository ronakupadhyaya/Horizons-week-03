"use strict";
var MONGODB_URI = require("./env.sh")
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

// new Cat({
//   name: "Crookshanks",
//   color: "Black"
// }).save(function(err) {
//   if (err) {
//     console.log('ERROR', err)
//   } else {
//     console.log('SAVED!')
//   }
// })
//
// new Cat({
//   name: "Mr. Bigglesworth",
//   color: "White"
// }).save(function(err) {
//   if (err) {
//     console.log('ERROR', err)
//   } else {
//     console.log('SAVED!')
//   }
// })
//
// new Cat({
//   name: "Empurress",
//   color: "Calico"
// }).save(function(err) {
//   if (err) {
//     console.log('ERROR', err)
//   } else {
//     console.log('SAVED!')
//   }
// })



Cat.find({
  name: "Empurress"
}, function(error, cat) {
  if (error) {
    console.log("Can't find cat", error);
  } else {
    console.log(cat);
  }
});
