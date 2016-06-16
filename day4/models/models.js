// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(require('./connect'));

var Cat = mongoose.model('Cat', {name: String, furColor: String})

var callback = function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log(success);
    }
};

var Cat1 = new Cat({name: "Crookshanks", furColor: "Black"}).save(callback);
var Cat2 = new Cat({name: "Mr. Bigglesworth", furColor: "White"}).save(callback);
var Cat3 = new Cat({name: "Empuress", furColor: "Calico"}).save(callback);

// Cat.find(function(error, cats) {
//   if (error) {
//     console.log("Can't find cats", error);
//   } else {
//     console.log('Cats', cats);
//   }
// });
