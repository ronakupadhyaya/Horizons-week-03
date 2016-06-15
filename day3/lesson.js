"use strict";

var express = require("express");

var app = express();
var port = 3000;

app.get('', function(request,require){
	response.send("Hello, there I'm express");
});

app.listen(port);
	console.log("Express started on port" + port);