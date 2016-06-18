// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})




var cat1 = new Cat({name: 'Crookhanks', color: 'Black'})
var cat2 = new Cat({name: 'Mr. Bigglesworth', color: 'White'})
var cat3 = new Cat({name: 'Empurress', color: 'Calico'})

cat1.save(function(error){
	if (error) {
		console.log('could not save', error); 
	} else {
		console.log('meow');
	}
})



cat2.save();
cat3.save();

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
