var mongoose = require('mongoose');
var config = require('./config.js')

console.log(config.MONGO_URI)
mongoose.connect(config.MONGO_URI);

var Student = mongoose.model("Student", {
  name: String
});

var Cat = mongoose.model("Child", {
  name: {
    type: String,
    required: true
  },
  breed: String,
  color: String,
  age: Number
})

var kritty = new Cat({
  name: "Kritty",
  breed: "human",
  color: "brown",
  age: 3
});

var catty = new Cat({
  breed: "Siamese",
  color: "brown",
  age: 2560
});

kritty.save();
catty.save();



// Cat.find({name: "Kritty"})
