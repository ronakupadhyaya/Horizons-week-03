var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

/* app.get('/', function(req, res) {
    //res.send('hello there');
    res.render('page');
}) */

app.get('/:error', function(req, res) {
    //res.send('hello there');
    var name = req.params.error;
    res.render('page', {
        errorName: name
    });
})

app.listen(3000);
console.log('started');