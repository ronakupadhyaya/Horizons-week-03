var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('index', {
        user: data
    })
})


app.get('/male', function(req, res) {
    var male = []
    data.forEach(function(person) {
        if (person.gender === "Male") {
            male.push(person)
        }
    })
    res.render('index', {
        user: male
    })
})

app.get('/female', function(req, res) {
    var female = []
    data.forEach(function(person) {
        if (person.gender === "Female") {
            female.push(person)
        }
    })
    res.render('index', {
        user: female
    })
})

app.listen(3000);
