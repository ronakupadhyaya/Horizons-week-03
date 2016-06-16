"use strict";

var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String});

Cat.find({
  name: {
    "$exists": true
  }
}, function(error, cats) {
    if (error) {
      console.log('Error', error);
    } else {
      console.log('meow', cats);
    }
});
//
// var mrWhiskers = new Cat({name: 'Mr Whiskers', furColor: 'calico'});
//
// mrWhiskers.save(function(error) {
//   if (error) {
//     console.log('Error', error);
//   } else {
//     console.log('meow');
//   }
// });

// var kitty = new Cat({name: 'Kitty', furColor: 'blue'});
// kitty.save(function(error) {
//   if (error) {
//     console.log(error);
//   }
// });

// var Cat = mongoose.model('Cat', {name: String, furColor: String})
//
// var mrWhiskers = new Cat({name: 'Mr Whiskers', furColor: 'calico'});

// mrWhiskers.save(function(error) {
//   if (error) {
//     console.log('Error', error);
//   } else {
//     console.log('meow');
//   }
// });

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log('Error', error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
//
// Cat.find({name: 'Crookshanks'}, function(error, cats) {
//   if (error) {
//     console.log('Error', error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
