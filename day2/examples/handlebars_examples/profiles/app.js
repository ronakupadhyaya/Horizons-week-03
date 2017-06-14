var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// var fs = require('fs');
// var students = fs.readFileSync('./data.json', 'utf8');
// YOUR CODE HERE

app.get('/', function(req,res){
  // res.send(students)
  res.render('index', {
    students: data
  })
})

var malestudents = data.filter(function(student){
  return student.gender=="Male";
})

var femalestudents = data.filter(function(student){
  return student.gender=="Female";
})

// <ul>
//   {{#each students}}
//     {{#if {{this.gender}} =="Female"}}
//       <li>{{this.first_name}} {{this.last_name}} {{this.email}}</li>
//     {{/if}}
//   {{/each}}
// </ul>

app.get('/male', function(req,res){
  // res.send(students)
  res.render('male', {
    students: malestudents
  })
})


app.get('/female', function(req,res){
  // res.send(students)
  res.render('female', {
    students: femalestudents
  })
})

app.listen(3000);
