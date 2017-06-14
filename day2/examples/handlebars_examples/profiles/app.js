var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/:gender', function(req, res){
  //reading JSON
  var fs = require('fs');
  var json = fs.readFileSync('data.json', 'utf8');
  var obj = JSON.parse(json);


  var outputStudents = [];
  console.log(req.params.gender);

    if(req.params.gender==='male'){
      //display male students
      obj.forEach(function(student){
        if(student.gender==='Male'){
          outputStudents.push(student);
        }
      });
    }
    else if(req.params.gender==='female'){
      //display female students
      obj.forEach(function(student){
        if(student.gender==='Female'){
          outputStudents.push(student);
        }
      });
    }


  //console.log(outputStudents);
  //display ALL students
  res.render('index', {
    students: outputStudents
  });
})

app.get('/', function(req, res){
  var fs = require('fs');
  var json = fs.readFileSync('data.json', 'utf8');
  var obj = JSON.parse(json);
  res.render('index', {
    students: obj
  })
})

app.listen(3000);
