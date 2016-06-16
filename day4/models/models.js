// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

var crookshanks = new Cat({name: 'Crookshanks', furColor:'Black'})
var bigglesworth = new Cat({name:'Mr. Bigglesworth', furColor:'White'})
var empurress = new Cat({name:'Empurress', furColor:'Calico'})

crookshanks.save();
bigglesworth.save();
empurress.save();