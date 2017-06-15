// First let's set up our MongoDb connection
var mongoose = require('mongoose');
//mongoose.connect(require('./connect'));
mongoose.connect(process.env.MONGODB_URI)
//create cat model, require that give a name
var Cat = mongoose.model('cat', {
  name: {
    type: String,
    required: true
  },
  furColor: String})
// //declare & intialize cats
// var cat1 = new Cat({name: 'Crookshanks', furColor: 'Tabby'})
// var cat2 = new Cat({name: 'Mr. Bigglesworth', furColor: 'White'})
// var cat3 = new Cat({name: 'Empurress', furColor: 'Calico'})
// var cat4 = new Cat({name: 'Ian', furColor: 'Blue'})
// //save cats
// cat1.save(function(err) {
//   if (err) {
//     console.log('could not save', err);
//   } else {
//     console.log('success');
//   }
// })
// cat2.save(function(err) {
//   if (err) {
//     console.log('could not save', err);
//   } else {
//     console.log('success');
//   }
// })
// cat3.save(function(err) {
//   if (err) {
//     console.log('could not save', err);
//   } else {
//     console.log('success');
//   }
// })
// cat4.save(function(err) {
//   if (err) {
//     console.log('could not save', err);
//   } else {
//     console.log('success');
//   }
// })

// //find one cat
// Cat.findOne(function(error, cat) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     var foundCat = null
//     if (cat.name === 'Mr. Bigglesworth') {
//       foundCat = cat;
//     }
//     console.log('found one', foundCat);
//   }
//
// });

// alternate find cat:
// Cat.find({
//   name: 'Crookshanks'
// }, function(err, cats) {
//   console.log('cats', cats);
// })
//
// // alternate2 find cat:
// Cat.findOne({
//   name: 'Ian'
// }, function(err, cats) {
//   console.log('cats', cats);
// })
//
// //find cats
// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
