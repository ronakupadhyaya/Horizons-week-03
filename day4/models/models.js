// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})
var cat1 = new Cat({name: "Crookshanks", furColor: "Black"})
var cat2 = new Cat({name: "MrBigglesworth", furColor: "White"})
var cat3 = new Cat({name: "Empurress", furColor: "Calico"})
Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
Cat.findOne(function(cats) {
	if ({name: "MrBigglesworth"}) {
		console.log(cats);
	}
	else {
		console.log("Can't find Mr.Bigglesworth")
	}
});

cat1.save();
cat2.save();
cat3.save();