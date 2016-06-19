"use strict";

// Backend routes go here, with inline controllers for each route.

var express = require('express');
var validator = require('express-validator');
var router = express.Router();
var Project = require('../model/project');
var strftime = require('strftime');

module.exports = router;
