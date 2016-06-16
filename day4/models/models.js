// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})

var cat1 = new Cat({name: 'Crookshanks', furColor: 'black'});
console.log(cat1);
cat1.save(function(error) {
	if (error) {
		console.log('nope');
	}
	else {
		console.log('good');
	}
});

// Cat.find(function(error, cats) {
// 	console.log('h');
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
