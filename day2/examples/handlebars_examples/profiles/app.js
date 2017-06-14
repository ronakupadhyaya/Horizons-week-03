var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE

app.get('/', function(req, res){
  res.render('index', {
    students: data,
  })

});
var genderChecker = function(maleOrFemale, person){
  if(person.gender === maleOrFemale){
    return true
  }
  return false
}
// var isMale= function(person){
//   if(person.gender === "Male"){
//     return true
//   }
//   return false
// }
app.get('/male', function(req, res){
  var maleStudents = data.filter(genderChecker.bind(null,"Male"));
  //var maleStudents = data.filter(isMale);
  res.render('index', {
    students: maleStudents,
  })
});
app.get('/female', function(req, res){
  var femaleStudents = data.filter(genderChecker.bind(null,"Female"));
  //var maleStudents = data.filter(isMale);
  res.render('index', {
    students: femaleStudents,
  })
});

//console.log(data)
app.listen(3000);
