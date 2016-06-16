var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({extname:'hbs'}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('index.hbs');
});


app.listen(3000);
//connects everything
///models talk to databases (mongoose, views render data to user (handlebar)
///controller (express) gets data and puts it out

//can add in mongoose connection in app.js (just copy and
//paste it over)... merge cats with success and failure
//to connect to mongoose: ned require, connect and variable

//to request by parameter: req.query.input to search for
//something specific in a group