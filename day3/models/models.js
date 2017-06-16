"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model("Cat", {
  name:String,
  funColor:String
});
// var crookshanks = new Cat({
//   name: "Crookshanks",
//    funColor: "black"
// }).save();
// var biggleswort = new Cat({
//   name: "Mr. Biggleswort",
//    funColor: "white"
// }).save();
// var empurress = new Cat({
//   name: "Empurress",
//    funColor: "calico"
// }).save();



Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.findOne({name:'Mr. Biggleswort'},function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
