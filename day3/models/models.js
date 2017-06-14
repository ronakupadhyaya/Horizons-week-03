"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
// console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI);

// var Cat; // YOUR CODE HERE - define the cat model

var Cat = mongoose.model('Cat', { //'Cat' here is name of collection
  name: String,
  furcolor: String,
  age: Number
})

// var cat1 = new Cat({name: 'Crookshanks', furcolor: 'black'})
// // console.log(cat)
//
// var cat2 = new Cat({name: 'Mr. Bigglesworth', furcolor: 'white'})

// var cat = new Cat({name: 'doraAmon', furcolor: 'blue', age:2})

// cat.save(function(err) {
//   // if (err) {
//   //   console.log('cannot save', err )
//   // } else {console.log('success')}
//   Cat.find(function(error, cats) {
//     if (error) {
//       console.log("Can't find cats", error);
//     } else {
//       console.log('Cats', cats);
//     }
//   });

// });
Cat.find({name: 'pradyut'}, function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cat', cats);
  }
});

//
// cat2.save(function(err) {
//   if (err) {
//     console.log(err )
//   } else {console.log('success')}
// });
// cat3.save(function(err) {
//   if (err) {
//     console.log(err )
//   } else {console.log('success')}
// });


// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
