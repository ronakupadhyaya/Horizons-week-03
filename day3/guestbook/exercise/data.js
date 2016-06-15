// This module allows us to work with json based persistance.
var jsonfile = require('jsonfile');
var file = 'data.json';

module.exports = {
  read: function() {
    return jsonfile.readFileSync(file);
  },
  save: function(data) {
    if (! data) {
      throw new Error("Data is missing, can't save.");
    }
    jsonfile.writeFileSync(file, data);
  }
};
