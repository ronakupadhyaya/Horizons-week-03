"use strict";
var jsonfile = require('jsonfile')
var file = 'data.json'
var child_process = require('child_process');


describe("Test toDo.js", function() {

  beforeEach(function() {
    //resets data before all tests
    jsonfile.writeFileSync(file, []);
  });

  it("show with no tasks", function() {
    var cmd = 'node toDo.js show';
    var stdout = child_process.execSync(cmd, {encoding:'utf-8'});
    expect(stdout).toBe('')
  });

  it("creating new task from blank", function() {
    child_process.execSync('node toDo.js add Do the dishes');
    var stdout = runAndCleanStdout('node toDo.js show')
    console.log(stdout);
    expect(stdout.length).toBe(1);
  });


  function runAndCleanStdout(cmd){
    var stdout = child_process.execSync(cmd, {encoding:'utf-8'});
    stdout = stdout.split(/\r\n|\r|\n/);
    return stdout.splice(0, 1)
  }

});
