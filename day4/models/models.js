// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})

var crookshanks = new Cat({name: "Cookshanks", furColor: "Black"})
var biggles = new Cat({name: "Mr. Bigglesworth", furColor: "White"})
var empurress = new Cat({name: "Empurress", furColor: "Calico"})

crookshanks.save(function(error) {
  if (error) { console.log('cannot save', error) }
    else { console.log('meow') }
})

biggles.save(function(error) {
  if (error) { console.log('cannot save', error) }
    else { console.log('meme') }
})

empurress.save(function(error) {
  if (error) { console.log('cannot save', error) }
    else { console.log('meaaowww') }
})

Cat.find({
  name: 'Mr. Bigglesworth' // Similar to findOne if specifying the search query
},
  function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
