// var getGreeting = require('./script1.js').getGreeting;
// var getGreeting2 = require('./script1.js').getGreeting2;
// function sayGreeting() {
//   console.log(getGreeting());
// }
// sayGreeting();

var getGreetings = require('./script1.js');
function sayGreeting() {
  console.log(getGreetings.getGreeting());
  console.log(getGreetings.getGreeting2());
}
sayGreeting();
