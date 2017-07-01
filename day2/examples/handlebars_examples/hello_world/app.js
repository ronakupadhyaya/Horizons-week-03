var express = require('express');
var app = express();
var handlebars = require('express-handlebars')

// HBS CONFIGURATION
app.engine('hbs', handlebars({
    extname: '.hbs'
}))

app.set('view engine', 'hbs')

//METHODS
app.get('/greet', function (req, res) {
    res.render('hello')
})

app.get('/:error', function (req, res) {
    var error = req.params.error || error;
    res.render('error', {
        error: error
    })
})

app.listen('3000')
