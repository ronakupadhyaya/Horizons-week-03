"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {name: String, furColor: String})
 // YOUR CODE HERE - define the cat model
var cat1 = new Cat({
  name: "Crookshanks",
   furColor: "Black"
});

var cat2 = new Cat({
  name: "Mr. Bigglesworth",
   furColor: "White"
})

var cat3 = new Cat({
  name: "Empurress",
   furColor: "Calico"
})

//callback HELL?!

// cat1.save(function(err){
//   if(err){
//     console.log("FAILED", err);
//   } else{
//     cat2.save(function(err){
//       if(err){
//         console.log("failed", err);
//       } else{
//         cat3.save(function(err){
//           if(err){
//             console.log("failed", err);
//           } else{
//             Cat.find(function(error, cats) {
//               if (error) {
//                 console.log("Can't find cats", error);
//               } else {
//                 console.log('Cats', cats);
//               }
//             });
//           }
//         })
//       }
//     })
//   }
// })

Cat.findOne({name: "Mr. Bigglesworth"}, function(error, cat){
  console.log("FOUND ", cat );
})
