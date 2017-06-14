"use strict";

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)

// var Student = mongoose.model('Student', {
//   name: String
// })
//
// var max = new Student({name: 'Max'})
// max.save(function(err) {
//   if(err) {
//     console.log('could not save', err);
//   }
//   else {
//     console.log('success');
//   }
// });



var Cat = mongoose.model('Cat', {
  name: String,
  furColor: String
})

// var silah = new Cat ({name: 'Silah', furColor: 'brown'})
// silah.save(function(err) {
//   if(err) {
//     console.log('could not save', err);
//   }
//   else {
//     console.log('success');
//   }
// })
//
var crookshanks = new Cat ({name: 'Crookshanks', furColor: 'Black'});
var biggle = new Cat ({name: 'Mr. Bigglesworth', furColor: 'White'});

crookshanks.save(function() {



biggle.save(function() {


Cat.find(function(error, cats) {
  if(error) {
    console.log("Can't find cats", error);
  }
  else {
    console.log('Cats', cats)
  }
})

  })
})


// Cat.findOne(function(error,cat) {
//
//   if(error) {
//     console.log("sorry, there was an error", error);
//   }
//     else {
//         var Name = null
//         if(cat.name === "Mr.Bigglesworth") {
//           Name = cat.name
//           console.log("The cats name", Name)
//         }
//     }
// })
