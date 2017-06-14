// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {name: String, furColor: String});

// var



var crookshanks = new Cat({name: 'Crookshanks', furColor: 'Black'});
var big = new Cat({name: 'Mr. Bigglesworth', furColor: 'White'});
var emp = new Cat({name: 'Empurress', furColor: 'Calico'});

// crookshanks.save(function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("success");
//   }
// });
// big.save(function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("success");
//   }
// });
// emp.save(function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("success");
//   }
// });

//console.log(Cat.findOne({name: 'Mr. Bigglesworth'}));

Cat.findOne({ 'name': 'Mr. Bigglesworth' }, 'name furColor', function (err, cat) {
  if (err) console.log(err);
  console.log('%s has %s fur.', cat.name, cat.furColor);
});
