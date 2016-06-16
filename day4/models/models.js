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

var crookshanks = new Cat({name: "Crookshanks",furColor: "black"});
var bigglesworth = new Cat({name: "Mr.Bigglesworth",furColor: "white"});
var empurress = new Cat({name: "Empurress",furColor: "calico"});
crookshanks.save();
bigglesworth.save();
empurress.save();

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.findOne({
	name: "Mr.Bigglesworth"
},
	function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});