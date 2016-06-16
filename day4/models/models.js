// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {
	name: {
		type: String,
		required: true
	},
	furColor: String
})

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });

Cat.findOne({
	"name": "Mr. Bigglesworth"
},
	function(error, cats) {
		if(error) {
			console.log("Could not find" + cats);
		}
		else {
			console.log(cats);
		}
	}
);

var crookShanks = new Cat({name: "Crookshanks", furColor: "black"});
var biggles = new Cat({name: "Mr. Bigglesworth", furColor: "white"});
var empurress = new Cat({name: "Empurress", furColor: "calico"});
var nameless = new Cat({name: "not Nameless", furColor: "calico"});

// crookShanks.save(function (err) {if (err) {console.log("Error saving crookShanks")} else {console.log("successfully saved cat")} });
// biggles.save(function (err) {console.log("Error saving biggles")});
// empurress.save(function (err) {console.log("Error saving empurress")});
nameless.save(function (err) {if (err) {console.log("Error saving crookShanks")} else {console.log("successfully saved cat")} });