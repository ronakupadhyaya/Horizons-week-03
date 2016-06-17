var mongoose = require('mongoose');

var PageSchema = new Mongoose.schema({
	title: String,
	Category: String,
	Fundraising Goal: Number,
	Start Date: Date,
	End Date: Date,
	About: String
});

var Page = mongoose.model('mypage', PageSchema);

var firstPage = new Page({title: "Project 1", Category: "test", Fundraising Goal: 10000000, Start Date: "06/17/16", End Date: "06/18/16", About: "Hope this works"})