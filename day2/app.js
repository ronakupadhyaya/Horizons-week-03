var express=require('express');
var app=express();
app.get('/',function(req, res){
  res.send('Reading you loud and clear');
});
app.get('/second', function(req, res){
  res.send('This is the second');
});
app.post('/', function(req, res){
  res.send('I got a POST.');
})
app.put('/',function(req,res){
  res.send('I got a PUT.');
})
app.delete('/',function(req,res){
  res.send('I got a DELETE.');
})
app.listen(3001);
console.log('started');
