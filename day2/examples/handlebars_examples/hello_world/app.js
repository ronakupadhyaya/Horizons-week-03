

var express=require('express')
var app=express();
var handlebars=require('express-handlebars');

app.engine('hbs',handlebars({
  extname:'.hbs'
}));

app.set('view engine','hbs');


app.get('/',function(req,res){
  res.render('template1');
})

app.get('/:error',function(req,res){
  res.send(req.params.error + 'page not found.')
})

app.listen(3000);
