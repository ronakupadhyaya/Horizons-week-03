// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String});

// var Crook = new Cat({
// 	name: "Crookshanks",
// 	furColor: "Black"
// });

// var Bigglesworth = new Cat({
// 	name: "Mr. Bigglesworth",
// 	furColor: "White"
// });

// var Empurress = new Cat({
// 	name: "Empurress",
// 	furColor: "Calico"
// });

// Crook.save();
// Bigglesworth.save();
// Empurress.save();

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });


Cat.findOne(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.findOne();
