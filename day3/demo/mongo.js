var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("OPEN!");
});
var Student = mongoose.model('Student',{
  name:String
});


Student.find(function(err,students){
  if(err){
    console.log('Something went wrong',err);
  }
})
