"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model("Cat", {name:String, Color: String, age: Number})

 // YOUR CODE HERE - define the cat model
var one = new Cat({name:"Crookshanks", Color:"black"})
var two = new Cat({name: "Mr. Bigglesworth", Color: "white"})
var three = new Cat({name: "Empurress", Color: "calico"})

one.save()
two.save()
three.save(
  Cat.find(function(error, cats) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', cats);
    }
  })
)
