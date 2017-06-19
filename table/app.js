var express = require('express')
var app = express()

app.use('/static', express.static('public'))
app.use(function(req, res, next){// if you dont spefify a path here -
  console.log("1");
  res.send("hey from 1")
  //next(); // this will stop middleware for running if comment out
});



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/table.html')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
