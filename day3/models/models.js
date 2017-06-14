// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {name: String, furColor: String})

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
var Crooks = new Cat({name: 'Crookshanks', furColor: 'Black'})
var Biggs = new Cat({name: 'Mr. Bigglesworth', furColor: 'White'})
var Empurr = new Cat({name: 'Empurress', furColor: 'Calico'})
// Crooks.save(function(err){
//   if(err) {
//     console.log('could not save', err);
//   } else {
//     console.log('success');
//   }
// });
// Biggs.save(function(err){
//   if(err) {
//     console.log('could not save', err);
//   } else {
//     console.log('success');
//   }
// });
// Empurr.save(function(err){
//   if(err) {
//     console.log('could not save', err);
//   } else {
//     console.log('success');
//   }
// });

Cat.find({
  name: 'Crookshanks'
}, function(err, cats){
    console.log('we got him!', cats);
  });
