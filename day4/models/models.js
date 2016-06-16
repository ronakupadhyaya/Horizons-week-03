// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})

// var c1 = new Cat({name: 'Crookshanks', furColor: 'Black'});
// var c2 = new Cat({name: 'Mr. Bigglesworth', furColor: 'White'});
// var c3 = new Cat({name: 'Empurress', furColor: 'Calico'});

// c1.save(function(err) {
//   if (err) {
//     console.log('*hiss*');
//   }
// });

// c2.save(function(err) {
//   if (err) {
//     console.log('*hiss*');
//   }
// });

// c3.save(function(err) {
//   if (err) {
//     console.log('*hiss*');
//   }
// });

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
    mongoose.disconnect(function() {console.log('we out');});
  }
});
