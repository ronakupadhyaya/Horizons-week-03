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
    expect(stdout.length).toBe(1);
    expect(stdout[0]).toEqual("Task #1 Priority 1: Do the dishes")
  });

  it("creating many tasks, with priority flags", function() {
    child_process.execSync('node toDo.js add Do the dishes');
    child_process.execSync('node toDo.js add Fix tv --priority 2');
    child_process.execSync('node toDo.js add Call the internet guy -p 3');
    var stdout = runAndCleanStdout('node toDo.js show')
    expect(stdout.length).toBe(3);
    expect(stdout[0]).toEqual("Task #1 Priority 1: Do the dishes")
    expect(stdout[1]).toEqual("Task #2 Priority 2: Fix tv")
    expect(stdout[2]).toEqual("Task #3 Priority 3: Call the internet guy")
  });

});


function runAndCleanStdout(cmd){
  var stdout = child_process.execSync(cmd, {encoding:'utf-8'});
  stdout = stdout.split(/\r\n|\r|\n/);
  stdout.splice(-1, 1)
  return stdout
}
