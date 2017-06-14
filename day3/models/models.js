// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
	name: {type: String, 
		   required: true
		},
	furColor: String},
	age: Number, 
	newProperty: String)

var Crookshanks = new Cat({name: "Crookshanks", furColor: "Black"})
var Bigglesworth = new Cat({name: "Mr. Bigglesworth", furColor: "White"})
var Empurress = new Cat({name: "Empurress", furColor: "Calico"})

// Crookshanks.save(function(err) {
//     if (err) {
//         console.log("Could not save", err)
//     } else {
//         console.log("Success")
//     }
// })

// Bigglesworth.save(function(err) {
//     if (err) {
//         console.log("Could not save", err)
//     } else {
//         console.log("Success")
//     }
// })

// Empurress.save(function(err) {
//     if (err) {
//         console.log("Could not save", err)
//     } else {
//         console.log("Success")
//     }
// })


Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
console.log(Cat.find({name: 'Crookshanks'}));

