// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})
var cats = []
cats.push(new Cat({name: 'Crookshanks', furColor: 'black'}))
cats.push(new Cat({name: 'Mr. Bigglesworth', furColor: 'white'}))
cats.push(new Cat({name: 'Empurress', furColor:'calico'}))
// for (var i = 0; i < cats.length; i++) {
// 	cats[i].save(function(error, cat) {
// 		if (error) {
// 			console.log('Error: ',error)
// 		} else {
// 			console.log(cat)
// 		}
// 	})
// }

Cat.find({name: 'Mr. Bigglesworth'},function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
