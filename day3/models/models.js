// First let's set up our MongoDb connection
var mongoose = require('mongoose');

if(!process.env.MONGODB_URI){
  console.log("no");
  exit(1);
}

mongoose.connect(process.env.MONGODB_URI);

var Dog = mongoose.model('Dog', {name: String, furColor: String})

var Cooper = new Dog({name: 'Cooper', furColor: 'Black and White'});
var Murphy = new Dog({name: 'Murphy', furColor: 'Brown and White'});

//Cooper.save(function(){
  //Murphy.save(function(){
    Dog.find({name: 'Cooper'}, function(error, dogs) {
      if (error) {
        console.log("Can't find dogs", error);
      } else {
        console.log('dogs', dogs);
      }
    });
  //});
//});
