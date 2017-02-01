var mongoose = require('mongoose');
mongoose.connect('mongodb://clairehuang:d72chc@ds139909.mlab.com:39909/claire-horizons');

var Cat = mongoose.model('Cat', {name: {type: String, required: true}, furColor: String})

var mrWhiskers = new Cat({name: 'Mr Whiskers', furColor: 'calico'});

mrWhiskers.save(function(error) {
  if (error) {
    console.log('Error', error);
  } else {
    console.log('meow');
  }
  console.log('inside callback');
});
console.log('after???');
