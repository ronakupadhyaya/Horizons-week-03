"use strict";
// The node builtin filesystem library.
var fs = require('fs');
var validator = require('validator')
//require columnify here
var columnify = require('columnify')


var JSON_FILE = 'data.json'
// If data.json file doesn't exist, create an empty one
ensureFileExists();
// This is where our Address Book is stored.
var data = JSON.parse(fs.readFileSync(JSON_FILE));




//the message that will be displayed  If no arguments are specified or if user types help
var helpString = "\n\tUsage: addressBook [options] [command]\n\n\n" + "\tOptions:\n" + "\t\thelp   Show this help message and quit" + "\n\n\n\tCommands:\n" + "\t\tadd       Create Contact\n" + "\t\tdisplay   Display all contacts in directory\n" + "\t\tupdate    Update existing contact\n"


var argv = process.argv
//console.log(process.argv) //UNCOMMENT TO SEE WHAT PROCESS.ARGV IS BEFORE WE SPLICE
argv.splice(0, 2); //remove 'node' and path from args, NOTE: splicing modifies process.argv, so you will not need to do this again!


//------------PART1: PARSING COMMAND LINE ARGUMENTS------------------------

/**
 * Implement parseCommand()
 * Using process.argv, find and return the command. If there was no command return "".
 * The command will be the first argument the user types. The possible commands are add, update, display, delete, help
 * $ node addressBook.js add Moose 123   ----> 'add'
 * $ node addressBook.js                ----> ''
 */
function parseCommand() {
  // YOUR CODE HERE
  return argv[0];
}

//store the command and execute its corresponding function
var input = parseCommand()
switch (input) {
  case "add":
    addContact();
    break;
  case "update":
    updateContact();
    break;
  case "delete":
    deleteContact()
    break;
  case "display":
    displayContacts();
    break;
  default:
    console.log(helpString); //if command = 'help' or invalid command, print help
}

//----------------- PART 2 'display' command---------------------//

/**
 *
 * Implement displayContacts()
 * Display the contacts in the address book in the format specified in the readme (HERE IS WHERE WE USE COLUMNIFY NPM MODULE)
 * If the contact does not have a phone number listed, you should display "-None-" in the PHONE_NUMBER fIELD
 *
 * Do not return anything, console.log() the contacts
 *
 */
function displayContacts() {
  //YOUR CODE HERE
  // data.forEach(function(element) {
  //   if (element.number.length === 0 || element.number === "-1") {
  //     element.number = "-None-"
  //   }
  // })
  var columns = columnify(data, {
    dataTransform: function(data) {
      if (data === "-1")
        return "-None-"
      else
        return data
    },
    config: {
      name: {
        headingTransform: function(heading) {
          return 'CONTACT_NAME'
        }
      },
      number: {
        headingTransform: function(heading) {
          return 'PHONE_NUMBER'
        }
      }
    }
  })
  console.log(columns); //UNCOMMENT
}



//----------------- PART 3 'add' command---------------------//
/**
 * Implement addContacts()
 * This is a function that is called to create a new contact.
 * Calling `node add contactName contactNumber ` must call our function addContact.
 * it should get the name and number of the Contact from process.argv
 * You should only create a new contact if a name is provided that doesnt already exist inside your address book (no duplicate contacts)
 * and if the name consists of only letters and the number consists of only numbers
 * name: string, number: number
 * if no number is provided, store -1 as their number
 */
function addContact() {
  // YOUR CODE HERE
  var newName = argv[1];
  var newNumber = argv[2];
  var nameExists = false;
  var numberProvided = true;
  if (argv.length < 2) {
    console.log("Please enter a name and a number");
    return
  }
  if (argv.length < 3) {
    numberProvided = false
    newNumber = "-1"
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i].name === newName)
      nameExists = true
  }
  if (newName.length === 0 || !validateName(newName) || (numberProvided && !validateNumber((newNumber)))) {
    console.log('Invalid contact format.')
    return
  }
  if (nameExists) {
    console.log(newName, 'already in AddressBook');
    return;
  }

  data.push({
    "name": newName,
    "number": parseInt(newNumber)
  })
  console.log("Added contact", newName)
}


//----------------- PART 4 'update' command---------------------//
/**
 * Implement updateContact()
 * This is a function that is called to update an existing contact.
 * Calling `node addressBook.js update contactName newContactNumber ` updates the number of contact with name contactName to be newContactNumber.
 * Calling `node addressBook.js update contactName newContactName ` updates the name of contact with name contactName to be newContactName.
 * it should get the name and update field of the Contact from process.argv
 * You should only update a contact if it exists inside your address book and the new name or number is valid
 *
 */
function updateContact() {
  // YOUR CODE HERE
  var contactToUpdate = argv[1]
  var updatedInfo = argv[2]
  if (argv.length < 3) {
    console.log('Please enter a contact name and new info');
    return;
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i].name === contactToUpdate) {
      if (parseInt(updatedInfo)) {
        if (!validateNumber(updatedInfo)) {
          console.log('Invalid number');
          return;
        }
        data[i].number = parseInt(updatedInfo)
        console.log('Number updated for', data[i].name)
      } else {
        if (!validateName(updatedInfo)) {
          console.log('Invalid name');
          return;
        }
        console.log('Name updated for', data[i].name)
        data[i].name = updatedInfo;
      }
      return;
    }
  }
  console.log('No contact found')
}

//BONUS Implement deleteContact
function deleteContact() {
  //YOUR CODE HERE
  var contactToDelete = argv[1];
  for (var i = 0; i < data.length; i++) {
    if (data[i].name === contactToDelete) {
      console.log('Contact', contactToDelete, 'deleted')
      return data.splice(i, 1);
    }
  }
  console.log('No contact found')
}



// ---Utility functions---

// We use these functions to read and modify our JSON file.
function writeFile(data) {
  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2));
}

function ensureFileExists() {
  if (!fs.existsSync(JSON_FILE)) {
    writeFile([]);
  }
}

function validateName(name) {
  for (var i = 0; i < name.length; i++) {
    if (!isNaN(name[i]))
      return false;
  }
  return true;
}

function validateNumber(number) {
  for (var i = 0; i < number.length; i++) {
    if (isNaN(number[i])) {
      return false;
    }
  }
  return true;
}

// This command writes  our tasks to the disk
writeFile(data);
