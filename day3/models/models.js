"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

 // YOUR CODE HERE - define the cat model
// app.get('/')
var Cat = mongoose.model('Cats',{name: String, furColor: String});

var newCat = new Cat({name: "Crookshanks", furColor: "Black"});
newCat.save(function(err){
  if(err){
    console.log("Can't add")
  }else{Cat.find(function(error, cats) {
    if (error) {
      console.log("Can't find cats", error);
    } else {
      console.log('Cats', cats);
    }})
}})
// var crook = new Cats({})


;
