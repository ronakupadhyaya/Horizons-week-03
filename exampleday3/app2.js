var mongoose = require('mongoose');
mongoose.connect('mongodb://danielkwak7:Midos_18750@ds139959.mlab.com:39959/kwak-horizons');
var express = require('express');

var app = express();
var Cat = mongoose.model('Cat', {
  name: {
    type: String,
    required: true
  },
  furColor: String
});
var namelessCat = new Cat();
namelessCat.save(function(err) {
  if (err) {
    console.log('*hiss*');
  }
});

app.get('/cats', function(req, res) {
	
})