// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})

var crook = new Cat({name: 'Crookshanks', furColor: 'Black' })
var biggle = new Cat({name: 'Bigglesworth', furColor: 'White' })
var empurr = new Cat({name: 'Empurress', furColor: 'Calico' })

crook.save();
biggle.save();
empurr.save();

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.find({name: 'Bigglesworth'}, function(error, biggle){
	if (error) {
		console.log("error")
	} else {
		console.log(biggle);
	}
})
