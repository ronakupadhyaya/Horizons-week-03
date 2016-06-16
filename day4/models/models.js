// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {
	name: {
		type: String,
		required: true
		}, 
	furColor: String
}); 

var crookshanks = new Cat({name: "Crookshanks", furColor:"Black"});
var mr_bigglesworth = new Cat ({name: "Mr. Bigglesworth", furColor: "White"}); 
var empurress = new Cat ({name: "Empurress", furColor: "Calico"});
var purrfect = new Cat({ name: "purrfect", furColor: "white"}); 

crookshanks.save(); 
mr_bigglesworth.save(); 
empurress.save();
purrfect.save();  

var namelessCat = new Cat(); 

namelessCat.save(function(error){ 
if(error){
		console.log("could not save", error);
		}
		else {
			console.log("meow");
		} 
	});










// crookshanks.save(function(error){
// 	if(error){
// 		console.log("could not save", error);
// 		}
// 		else {
// 			console.log("meow");
// 		} 
	// });  

// Cat.findOne( {
// 	"name": "purrfect" 
// },
// 	function(error, cats){
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });

