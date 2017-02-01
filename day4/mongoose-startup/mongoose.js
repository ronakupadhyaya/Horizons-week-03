var mongoose = require('mongoose');
mongoose.connect('mongodb://user:password@ds139979.mlab.com:39979/priyanka-horizons');

app.get('\cats', function(req, res){
        Cat.find(Cat,function(err,cats){
          res.send(Cat)
        })
    })


var Cat = mongoose.model('Cat', {name:String, furcolor: String})
var nameCat = mongoose.model('namedCat', {
  name: {
    type: String
    required: true
  },
  furColor: String
});

var namelessCat = new nameCat();
namelessCat.save(function(err) {
  if (err) {
    console.log('hiss');
  }
});
