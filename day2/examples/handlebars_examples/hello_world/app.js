var handlebars = require('express-handlebars');
var express = require('express')
var app = express();

console.log("I've started running")


// when express tries to render a file with extension hbs,
// it should use library from handlebars

app.engine('hbs',handlebars({
  extname: '.hbs' // this is a configuration obj,
}));


app.set('view engine', 'hbs'); // whenever render a template, default ext is hbs

app.get('/', function(req,res){
  res.render('hey-world')
})

app.get('/:error', function(req,res){
  res.render('errorFile', {
    errorName: req.params.error
  })
});

app.listen(3000);
