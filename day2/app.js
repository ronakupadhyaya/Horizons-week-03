var express = require('express');
var handlebars = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.text());
