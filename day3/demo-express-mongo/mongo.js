// use strict - just makes JS a little more strict so 
//if you do nonsensical things, it's more likely that JS will throw an error
"use strict";

var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

var Student = mongoose.model("Student", {
    name: String
});

var james = new Student({name: "James"});

james.save(function(err) {
    if (err) {
        console.log("Could not save", err)
    } else {
        console.log("Success")
    }
})