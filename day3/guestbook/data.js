// This module allows you to save data using JSON files.
var jsonfile = require('jsonfile');
var file = 'data.json';

module.exports = {
  read: function(ordering) {
  	if(ordering === 0) {
    	return jsonfile.readFileSync(file);
	} else if( ordering === 1) {
		return jsonfile.readFileSync(file).reverse();
	}
  },
  save: function(data) {
    if (! data) {
      throw new Error("Data is missing, can't save.");
    }

    var allPosts = jsonfile.readFileSync(file);
    

    allPosts.unshift(data);

    console.log(allPosts);
    jsonfile.writeFileSync(file, allPosts);
  }
};
