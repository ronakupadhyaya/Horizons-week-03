"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
} 

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat',{
  name: {
    type: String,
    required: true
  },
  furColor: {
    type: String,
    required: true
  }
});

var catOne = new Cat({name: "Crookshanks", furColor: "black"});
var catTwo = new Cat({name: "Mr. Bigglesworth", furColor: "white"});
var catThree = new Cat({name: "Empurress", furColor: "calico"});

catOne.save(function() {
  catTwo.save(function() {
    catThree.save(function() {
      Cat.find(function(error, cats) {
        if (error) {
          console.log("Can't find cats", error);
        } else {
          console.log('Cats', cats);
        }
      })
    })
  })
})



// catTwo.save(function(err) {
//   if (err) {
//     console.log('oh no');
//   } else {
//     console.log('success');
//   }
// });
//
// catThree.save(function(err) {
//   if (err) {
//     console.log('oh no');
//   } else {
//     console.log('success');
//   }
// });



Cat.findOne({name: "Mr. Bigglesworth"}, function(error, cat) {
  if (error) {
    console.log("Can't find cat", error);
  } else {
    console.log("Found cat", cat);
  }
})
