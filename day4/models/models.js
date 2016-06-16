// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})
// var crookshanks = new Cat({name: "Crookshanks", furColor:"Black"});
// crookshanks.save(function(error) {
// if (error) {
// console.log(error) ;
// }
// });
// var bigglesworth = new Cat({name: "Mr. Bigglesworth", furColor:"White"});
// bigglesworth.save(function(error) {
// if (error) {
// console.log(error) ;
// }
// });
// var empurress = new Cat({name: "Empurress", furColor:"Calico"});
// empurress.save(function(error) {
// if (error) {
// console.log(error) ;
// }
// });

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });

Cat.findOne({name:"Mr. Bigglesworth"}, function(error, cats)
	{
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
