"use strict";
/* eslint-env jasmine */

var jsonfile = require('jsonfile');
// ar app = require('./addressBook.js')
var file = 'data.json';
var child_process = require('child_process');


describe("Getting Commands", function() {
    beforeEach(function() {
        // app = require('./addressBook.js')
        // jsonfile.writeFileSync(file, []);
    });

    it('Returns the command provided in stdin', function() {
        //
        // spyOn(app, 'displayContacts')
        // var stdout = runAndCleanStdout('node addressBook.js display');

        // expect(app.displayContacts).toHaveBeenCalled()//toEqual('add')
    })

    it('Returns empty string when no command provided', function() {
        // var app = require('./addressBook.js')
        // spyOn(app, 'parseCommand')
        // var stdout = runAndCleanStdout('node addressBook.js');
        // // child_process.execSync('node addressBook.js update John 456');
        // var command = app.parseCommand()
        // expect(command).toEqual('')
    })
})

describe("Displaying Contacts", function() {
    beforeEach(function() {
      //resets data before all tests
      jsonfile.writeFileSync(file, []);
    });

    it("displays all contacts in the correct format when contacts exist", function(){
        jsonfile.writeFileSync(file, [
          {
            "name": "Moose",
            "number": 123
          },
          {
            "name": "Ricky",
            "number": 456
          }
        ]);
        var stdout = runAndCleanStdout('node addressBook.js display');
        expect(stdout.length).toBe(3);

        var moose = stdout[1].split(/[ ]+/)
        var ricky = stdout[2].split(/[ ]+/)
        expect(moose[0]).toEqual('Moose')
        expect(ricky[0]).toEqual('Ricky')
        expect(moose[1]).toEqual('123')
        expect(ricky[1]).toEqual('456')


    })

    it('displays the correct headers', function() {
        jsonfile.writeFileSync(file, [
          {
            "name": "Moose",
            "number": 123
          },
          {
            "name": "Ricky",
            "number": -1
          }
        ]);
        var stdout = runAndCleanStdout('node addressBook.js display');
        var header = stdout[0].trim().split(/[ ]+/)
        expect(header[0]).toEqual("CONTACT_NAME")
        expect(header[1]).toEqual("PHONE_NUMBER")
    })

    it("displays '-None-' for the number field when contact does not have a phone number", function(){
        jsonfile.writeFileSync(file, [
          {
            "name": "Moose",
            "number": 123
          },
          {
            "name": "Ricky",
            "number": -1
          }
        ]);
        var stdout = runAndCleanStdout('node addressBook.js display');
        var moose = stdout[1].split(/[ ]+/)
        var ricky = stdout[2].split(/[ ]+/)
        expect(moose[0]).toEqual('Moose')
        expect(ricky[0]).toEqual('Ricky')
        expect(moose[1]).toEqual('123')
        expect(ricky[1]).toEqual('-None-')
    })
})
describe("Adding Contacts", function() {
    beforeEach(function() {
      //resets data before all tests
      jsonfile.writeFileSync(file, []);
    });

    it("Adds contacts when a name and valid number(or no number) is provided", function() {
        child_process.execSync('node addressBook.js add Pam 516');
        child_process.execSync('node addressBook.js add Frankie 123');
        child_process.execSync('node addressBook.js add Bob');
        var data = jsonfile.readFileSync(file)
        expect(data.length).toBe(3)
        expect(data[0]).toEqual({"name": "Pam", "number": 516})
        expect(data[1]).toEqual({"name": "Frankie", "number": 123})
        expect(data[2]).toEqual({"name": "Bob", "number": -1})

    });

    it("Does not add contact when name or number is invalid", function() {
        child_process.execSync('node addressBook.js add Pam 516');
        child_process.execSync('node addressBook.js add Frankie a123');
        child_process.execSync('node addressBook.js add 123 123');
        child_process.execSync('node addressBook.js add abc123 123');
        var data = jsonfile.readFileSync(file)
        expect(data.length).toBe(1)
        expect(data[0]).toEqual({"name": "Pam", "number": 516})
        // expect(data[1]).toEqual({"name": "Frankie", "number": 123})
        // expect(data[2]).toEqual({"name": "Bob", "number": -1})

    });

    it("Does not add contacts when no name is provided", function() {
        child_process.execSync('node addressBook.js add 516');
        child_process.execSync('node addressBook.js add');
        child_process.execSync('node addressBook.js add Frankie 123');
        child_process.execSync('node addressBook.js add Bob');
        var data = jsonfile.readFileSync(file)
        expect(data.length).toBe(2)
        expect(data[0]).toEqual({"name": "Frankie", "number": 123})
        expect(data[1]).toEqual({"name": "Bob", "number": -1})

    });


})



describe("Updating Contacts", function() {
    beforeEach(function() {
        //resets data before all tests
        jsonfile.writeFileSync(file, [
            {
                "name": "Moose",
                "number": 123
            },
            {
                "name": "Ricky",
                "number": 456
            },
            {
                "name": "Graham",
                "number": 789
            }
        ]);
    });

    it("Updates the contact's number when only number argument is passed", function() {
        child_process.execSync('node addressBook.js update Moose 999');
        var data = jsonfile.readFileSync(file)
        expect(data.length).toBe(3)
        expect(data[0]).toEqual({"name": "Moose", "number": 999})

    });

    it("Updates the contact's name when only name argument is passed", function() {
        child_process.execSync('node addressBook.js update Moose Moooose');
        var data = jsonfile.readFileSync(file)
        expect(data.length).toBe(3)
        expect(data[0]).toEqual({"name": "Moooose", "number": 123})
    });

    it("Does not make any changes when contact does not exist", function() {
        child_process.execSync('node addressBook.js update Pam 516');
        var data = jsonfile.readFileSync(file)
        expect(data.length).toBe(3)
        expect(data[0]).toEqual({"name": "Moose", "number": 123})
        expect(data[1]).toEqual({"name": "Ricky", "number": 456})
        expect(data[2]).toEqual({"name": "Graham", "number": 789})
    });

    it("Console logs a message when contact does not exist", function() {
        var stdout = runAndCleanStdout('node addressBook.js update Pam 516');
        expect(stdout.length).toBe(1);
        expect(stdout[0]).toEqual("No contact found");
    });



})


describe("Test addressBook.js", function() {

  // beforeEach(function() {
  //   //resets data before all tests
  //   jsonfile.writeFileSync(file, []);
  // });


  // it("Show with no tasks on model", function() {
  //   var cmd = 'node addressBook.js show';
  //   var stdout = child_process.execSync(cmd, {encoding:'utf-8'});
  //   expect(stdout).toBe('');
  // });
  //
  // it("Creating new task from blank", function() {
  //   child_process.execSync('node addressBook.js add Do the dishes');
  //   var stdout = runAndCleanStdout('node addressBook.js show');
  //   expect(stdout.length).toBe(1);
  //   expect(stdout[0]).toEqual("Task #1 Priority 1: Do the dishes");
  // });
  //
  // it("creating many tasks, with priority flags", function() {
  //   generateTasks();
  //   var stdout = runAndCleanStdout('node addressBook.js show');
  //   expect(stdout.length).toBe(3);
  //   expect(stdout[0]).toEqual("Task #1 Priority 1: Do the dishes");
  //   expect(stdout[1]).toEqual("Task #2 Priority 2: Fix tv");
  //   expect(stdout[2]).toEqual("Task #3 Priority 3: Call the internet guy");
  // });
  //
  // it("Show task with id", function() {
  //   generateTasks();
  //   var stdout = runAndCleanStdout('node addressBook.js show -i 2');
  //   expect(stdout[0]).toEqual("Task #2 Priority 2: Fix tv");
  // });
  //
  // it("Delete task with id", function() {
  //   generateTasks();
  //   child_process.execSync('node addressBook.js delete -i 2');
  //   var stdout = runAndCleanStdout('node addressBook.js show');
  //   expect(stdout.length).toBe(2);
  //   expect(stdout[0]).toEqual("Task #1 Priority 1: Do the dishes");
  //   expect(stdout[1]).toEqual("Task #2 Priority 3: Call the internet guy");
  // });
});

function runAndCleanStdout(cmd){
  var stdout = child_process.execSync(cmd, {encoding:'utf-8'});
  stdout = stdout.split(/\r\n|\r|\n/);
  stdout.splice(-1, 1);
  return stdout;
}

function generateTasks(){
  child_process.execSync('node addressBook.js add Pam 123');
  child_process.execSync('node addressBook.js add Frankie 123');
  // child_process.execSync('node addressBook.js add Call the internet guy -p 3');
}
