"use strict";

var mongoose = require("mongoose");

var Person = mongoose.model("Person", {
	title: {
		type: String,
		required: true
	}
})