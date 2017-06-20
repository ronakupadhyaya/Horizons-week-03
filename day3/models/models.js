"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var catSchema = mongoose.Schema({
  name: String,
  furColor: String
});
var Cat = mongoose.model('Cat', catSchema);

var crookshanks = new Cat (
  {
    name:"Crookshanks",
    furColor:"Black"
  }
);

var bigglesworth = new Cat (
  {
    name:"Mr.Bigglesworth",
    furColor:"White"
  }
);
var empurress = new Cat (
  {
    name:"Empurress",
    furColor:"Calico"
  }
);
empurress.save()

var namelesscat = new Cat();
namelesscat.save(function(err) {
  if(err){
    console.log("oops");
  }
  else {
    console.log("success");
  }
});
Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

// Cat.findOne({name:"Mr.Bigglesworth"},function(error,m){
//   if (error) {
//     console.log("Can't find this one",error);
//   } else {
//     console.log("Bigglesworth: ",m);
//   }
// });
