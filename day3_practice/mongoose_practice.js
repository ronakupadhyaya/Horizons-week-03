var mongoose = require('mongoose');
mongoose.connect('mongodb://student:horizon@ds139899.mlab.com:39899/rick-test');

var Cat = mongoose.model('Cat', {name: String, furColor: String})

var namedCat = mongoose.model('namedCat', {
  name: {
    type: String,
    required: true
  },
  furColor: String
})

var mrWhiskers = new Cat({name: 'Mr Whiskers', furColor:'calico'});

mrWhiskers.save(function(error){
  if(error){
    console.log('Error', error);
  } else {
    console.log('meow');
  }
});
