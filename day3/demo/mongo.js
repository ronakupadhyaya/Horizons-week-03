"use strict"
var mongoose=require("mongoose");
mangoose.connect(process.env.MONGODB_URI);

var Student = mongoose.model("Student", {
    name: String
});

var kevin = new Student({name: "Kevin"});

kevin.save(function(err) {
    if (err) {
        console.log("Could not save", err)
    } else {
        console.log("Success")
    }
})
