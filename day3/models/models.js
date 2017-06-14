"use strict";

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: String,
  furColor: String
});

var crookshanks = new Cat({
  name: 'Crookshanks',
  furColor: 'Black'
});

var bigglesworth = new Cat({
  name: 'Mr. Bigglesworth',
  furColor: 'White'
});

var empurress = new Cat({
  name: 'Empurress',
  furColor: 'Calico'
});

// crookshanks.save(function(err) {
//   if (err) {
//     console.log('Oh no');
//   } else {
//     console.log('success');
//   }
// });

// bigglesworth.save(function(err) {
//   if (err) {
//     console.log('Oh no');
//   } else {
//     console.log('success');
//   }
// });
//
// empurress.save(function(err) {
//   if (err) {
//     console.log('Oh no');
//   } else {
//     console.log('success');
//   }
// });
//
//
// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });


// Cat.findOne({
//   name: 'Mr. Bigglesworth'
// }, function(err, cat) {
//   if (err) {
//     console.log('Can\'t find Mr. Bigglesworth', err);
//   } else {
//     console.log(cat);
//   }
// })

bigglesworth.save(function() {
  crookshanks.save(function() {
    empurress.save(function() {
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
