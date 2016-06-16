// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})

var cat1 = new Cat({name: 'Crookshanks', furColor: "black"});
var cat2 = new Cat({name: 'Mr. Bigglesworth', furColor: "white"});
var cat3 = new Cat({name: 'Empurress', furColor: "calico"});

//cat1.save();
//cat2.save();
//cat3.save();

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
