"use strict"

console.log("mongo uri", process.env.MONGODB_URI);

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

var Cats = mongoose.model("Whatever", {
	name: {
		type: String,
		required: true
	},
	furColor: String,
	age: Number
})

var prady = new Cats({
	age: 3
})

prady.save(function(err) {
	if (err) {
		console.log("err", err)
	}
});

Cats.find({name: "prady"}, function(err, cats) {
	console.log(cats);
});
