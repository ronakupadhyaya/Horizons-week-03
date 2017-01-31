var express = require('express')
var app = express();
var port = process.env.PORT || 3000

app.get('/', function(request, response, next) {
	response.type('text/plain')
	response.send('hello world'+ (request.query.name || 'nysterious stranger'));

	response.format({
		'text/plain' : function(){
			response.send("hello there!");
		},
		'text/plain' : function(){

		}
	})
});

app.get('/hello/:name', function(request, response, next){
	response.type('text/plain');
	response.send('hellow there ' + (request.params.name || "m"));
})

app.listen(port);
console.log("hey im running on port %", port)

app.use(express.static('public'))

var echo = require("./echo");
app.use('/echo', echo);

var status = require("./status");
app.use("/status", status);