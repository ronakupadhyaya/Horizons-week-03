"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('whatever', {
  Name: String,
  furColor: String,
});

var Crookshanks = new Cat({
  Name: "Crookshanks",
  furColor: "Black"
});
Crookshanks.save(function(err){
  if (err) {
    console.log("Couldn't find Crookshanks");
  } else {
    Cat.find(function(error, cats) {
      if (error) {
        console.log("Can't find cats", error);
      } else {
        console.log('Cats', cats);
      }
    })
  }
})
//
// var MrB = new newCat({
//   Name: "Mr. Bigglesworth",
//   furColor: "White"
// });
//
// var Emprurress = new newCat({
//   Name: "Emprurress",
//   furColor: "Calico"
// });
