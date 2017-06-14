var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('display', {
        students: data
    });
});

app.get('/male', function(req, res) {
    var mStudents = [];
    data.forEach(function(student) {
        if (student.gender === "Male"){
            mStudents.push(student);
        }
        
    }, this);
    res.render('display', {
        students: mStudents
    });
});

app.get('/female', function(req, res) {
    var fStudents = [];
    data.forEach(function(student) {
        if (student.gender === "Female"){
            fStudents.push(student);
        }
        
    }, this);
    res.render('display', {
        students: fStudents
    });
});

app.listen(3000);



