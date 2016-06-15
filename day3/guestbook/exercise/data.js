// This module allows you to save data using JSON files.
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
