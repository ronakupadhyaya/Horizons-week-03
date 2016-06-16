// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));
var conn = mongoose.connection;

var Cat = mongoose.model('Cat', {name: String, furColor: String});

conn.once('open', function() {
	var mrWhiskers = new Cat({name: "Crookshanks", furColor: "black"});

	mrWhiskers.save(function(error, cat){
		console.log(error);
		if(error){
			console.log(error);
		} else {
			console.log("meow");
		}
	});

});


// var Cat = mongoose.model('Cat', {name: String, furColor: String})

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });



