"use strict";

// This module allows you to save data using JSON files.
var fs = require('fs');
var jsonfile = require('jsonfile');
var file = 'data.json';

module.exports = {
  read: function() {
    if (!fs.existsSync(file)) {
      return [];
    }
    return jsonfile.readFileSync(file);
  },
  save: function(data) {
    if (! data) {
      throw new Error("Data is missing, can't save.");
    }
    jsonfile.writeFileSync(file, data);
  }
};
