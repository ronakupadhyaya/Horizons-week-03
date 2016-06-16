// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})

var kitty = new Cat({name: 'Mr Whiskers', furColor: 'calico'});
var tiny = new Cat({name: 'Tiny', furColor: 'orange'});
var tom = new Cat({name: 'Tom', furColor: 'grey'});

kitty.save(function(error){
	if(error) {
		console.log(error);
	} else {
		console.log("MeowK");
	}
})

tiny.save(function(error){
	if(error) {
		console.log(error);
	} else {
		console.log("MeowT");
	}
})

tom.save(function(error){
	if(error) {
		console.log(error);
	} else {
		console.log("MeowJ");
	}
})

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
