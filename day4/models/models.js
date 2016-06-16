// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));


var Cat = mongoose.model('Cat', {name: String, furColor: String})

var crookshanks = new Cat({name: 'Crookshanks', color: 'black'})
crookshanks.save(function(error){
	if(error){
		console.log('could not save', error)
	}
	else{
		console.log('meow') ////checking mechanism to verify whether it saved to mLab or 
		//had an error
	}
})
//need to type INDIVIDUAL cats to save!!!!
var biggles = new Cat({name: 'Mr. Bigglesworth', color: 'white'})
biggles.save()
var empur = new Cat({name: 'Empurress', color: 'calico'})
empur.save()

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });

Cat.findOne({name: 'Mr. Bigglesworth'},function(err, cats){
	if(err){
		console.log(err)
	}
	else{
		console.log(cats)
	}
})
