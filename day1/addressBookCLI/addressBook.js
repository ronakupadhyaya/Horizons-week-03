"use strict";
// The node builtin filesystem library.
var fs = require('fs');
var validator = require('validator')
//require columnify here
var columnify = require('columnify');

var JSON_FILE = 'data.json'
// If data.json file doesn't exist, create an empty one
ensureFileExists();
// This is where our Address Book is stored.
var data = JSON.parse(fs.readFileSync(JSON_FILE));




//the message that will be displayed  If no arguments are specified or if user types help
var helpString = "\n\tUsage: addressBook [options] [command]\n\n\n" +"\tOptions:\n" + "\t\thelp   Show this help message and quit"+"\n\n\n\tCommands:\n" + "\t\tadd       Create Contact\n" + "\t\tdisplay   Display all contacts in directory\n" + "\t\tupdate    Update existing contact\n"


var argv = process.argv
//console.log(process.argv) //UNCOMMENT TO SEE WHAT PROCESS.ARGV IS BEFORE WE SPLICE
argv.splice(0,2); //remove 'node' and path from args, NOTE: splicing modifies process.argv, so you will not need to do this again!


//------------PART1: PARSING COMMAND LINE ARGUMENTS------------------------

/**
* Implement parseCommand()
* Using process.argv, find and return the command. If there was no command return "".
* The command will be the first argument the user types. The possible commands are add, update, display, delete, help
* $ node addressBook.js add Moose 123   ----> 'add'
* $ node addressBook.js                ----> ''
*/
function parseCommand() {
  if(!process.argv[0]) { //if there is no 3rd argument
    return '';
  } else {
    return process.argv[0];
  }
}

//store the command and execute its corresponding function
var input = parseCommand()
switch(input){
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
function displayContacts(){
  //YOUR CODE HERE

  console.log(columnify(data, {
    config: {
      name: {
        headingTransform: function(heading) {
          heading = "CONTACT_" + heading.toUpperCase();
          return heading;
        }
      },
      number: {
        headingTransform: function(heading) {
          heading = "PHONE_" + heading.toUpperCase();
          return heading;
        },
        dataTransform: function(data) {
          if(data === '-1') {
            data = "-None-";
          }
          return data;
        }
      }
    }
  }));

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
  var validInput = true;
  var name = process.argv[1];
  if(!name) { //no name passed in
    console.log('Invalid contact format');
    return;
  }

  var num = process.argv[2];
  if(!num) { //no number passed in
    num = -1;
  }

  //checking if name is only composed of letters
  for(var i = 0; i < name.length; i++) {
    if(!name[i].match(/[a-z]/i)) {
      validInput = false;
    }
  }

  //checking is num is a number
  if(isNaN(parseInt(num))) {
    validInput = false;
  }

  if(!validInput) {
    console.log('Invalid contact format');
    return;
  }

  //setting string num to number num
  num = parseInt(num);

  //check if that contact name already exists
  for(i = 0; i < data.length; i++) {
    if(data[i].name === name) {
      console.log(name + ' already in Address Book');
      return;
    }
  }

  var newContact = {
    name: name,
    number: num
  }

  data.push(newContact);
  console.log('Added contact ' + name);
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
function updateContact(){
  var validInput = true;
  var setNum = false; //updating number or name
  var name = process.argv[1];
  var change = process.argv[2];

  if(!name) { //no name passed in
    console.log('Invalid update format');
    return;
  }

  //checking if name is only composed of letters
  for(var i = 0; i < name.length; i++) {
    if(!name[i].match(/[a-z]/i)) {
      validInput = false;
    }
  }

  //check if change is a number
  if(!isNaN(parseInt(change))) {
    setNum = true; //updating number
    change = parseInt(change);
  } else { // since change is not a number it must be a name
    for(i = 0; i < change.length; i++) {
      if(!change[i].match(/[a-z]/i)) {
        validInput = false;
      }
    }
  }

  if(!validInput) {
    console.log('Invalid update format');
    return;
  }

  var foundContact; // will store reference to the desired contact

  //looking to see if the name exists in contacts already
  for(i = 0; i < data.length; i++) {
    if(data[i].name === name) {
      foundContact = data[i]; // found it
      break;
    }
  }

  if(!foundContact) { //if still undefined, contact doesn't exist
    console.log('No contact found');
    return;
  }

  if(setNum) { //updating the contact's number
    foundContact.number = change;
    console.log('Updated number for ' + name);
  } else { //updating the contact's name
    foundContact.name = change;
    console.log('Updated name for ' + name);
  }
}


//BONUS Implement deleteContact
function deleteContact(){
  var validInput = true;

  var nameToDelete = process.argv[1];
  if(!nameToDelete) { //no name given
    console.log('Invalid input for delete');
    return;
  }
  //checking if name is only composed of letters
  for(var i = 0; i < nameToDelete.length; i++) {
    if(!nameToDelete[i].match(/[a-z]/i)) {
      validInput = false;
    }
  }
  if(!validInput) {
    console.log('Invalid name of contact to delete');
    return;
  }
  var indexOfContact = -1;
  for(i = 0; i < data.length; i++) {
    if(data[i].name === nameToDelete) {
      indexOfContact = i;
    }
  }

  if(indexOfContact === -1) {
    console.log('No contact found');
    return;
  }

  data.splice(indexOfContact, 1);
  console.log("Deleted " + nameToDelete);
}



// ---Utility functions---

// We use these functions to read and modify our JSON file.
function writeFile(data) {
  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2));
}

function ensureFileExists() {
  if (! fs.existsSync(JSON_FILE)) {
    writeFile([]);
  }
}


// This command writes  our tasks to the disk
writeFile(data);
