"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// YOUR CODE HERE - define the cat model

var Cat = mongoose.model("Cat", {
  name: String,
  furColor: String,
  age: Number,
  newProperty: String
});

var c = new Cat({name: "Crookshanks", furColor: "black"});
var b = new Cat({name: "Mr. Bigglesworth", furColor: "white"});
var e = new Cat({name: "Empurress", furColor: "calico"});

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });

//
// c.save(function(err) {
//   if (err) {
//     console.log("Student could not save", err)
//   } else {
//     console.log("success");
//   }
// })


// var pradyut = new Cat({name: "Pradyut"});
// var sarah = new Cat({name: "Sarah"})
//
// pradyut.save(function() {
//   Cat.find(function(err, cats) {
//     if (err) {
//       console.log("cant find")
//     } else {
//       console.log("Cats, cats")
//     }
//   })
// })

//
// Cat.find({
//   name: "Mr. Bigglesworth"
// }, function (err, cats) {
//   console.log("cats", cats)
// });

Cat.findOne({
  name: "Mr. Bigglesworth"
}, function (err, cats) {
  console.log("cats", cats)
});

new Cat().save(function(err) {
  if (err) {
    console.log("err", err);
  } else {
    console.log("cats", cats)
  }
})
