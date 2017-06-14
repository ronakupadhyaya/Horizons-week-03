console.log(process.env.Cat);

if (! process.env.MONGODB_URI) {
  console.error('dude error');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})

var Crookshanks = new Cat({Name: 'Crookshanks', Color: 'Black'}).save()
var bigs = new Cat({Name: 'Mr. Bigglesworth', Color: 'White'}).save()
var Empurress = Cat({Name: 'Empurress', Color: 'Calico'}).save()

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

// Cat.findOne({name: 'Crookshanks'}, function(error, students) {
//   if (error) {
//     console.log('Error', error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
