"use strict";
// The node builtin filesystem library.
var fs = require('fs');
var validator = require('validator')
var columnify = require('columnify');


var JSON_FILE = 'data.json'
// If data.json file doesn't exist, create an empty one
ensureFileExists();
// This is where our Address Book is stored.
var data = JSON.parse(fs.readFileSync(JSON_FILE));




//the message that will be displayed  If no arguments are specified or if user types help
var helpString = "\n\tUsage: addressBook [options] [command]\n\n\n" +"\tOptions:\n" + "\t\thelp   Show this help message and quit"+"\n\n\n\tCommands:\n" + "\t\tadd       Create Contact\n" + "\t\tdisplay   Display all contacts in directory\n" + "\t\tupdate    Update existing contact\n"


var argv = process.argv
// console.log(process.argv) //UNCOMMENT TO SEE WHAT PROCESS.ARGV IS BEFORE WE SPLICE
argv.splice(0,2); //remove 'node' and path from args, NOTE: splicing modifies process.argv, so you will not need to do this again!
// console.log(argv);

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
  var output = columnify(data, {
    minWidth: 20,
    dataTransform: function(contactData) {
      if(parseInt(contactData)===-1) {
        return'-None-'
      }
      return contactData;
    },
    config: {
      name: {
        headingTransform: function(heading) {
          return "CONTACT_NAME";
        }
      },
      number: {
        headingTransform: function(heading) {
          return "PHONE_NUMBER";
        }
      }
    }
  })
  console.log(output);
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
  var args = process.argv.slice(1, process.argv.length);
  if(args) {
    var name = args[0];
    var number = args[1] || "-1";
    if(name && isValidName(name) && isValidNumber(number)) {
      var exists = data.find(function(contact){
        return contact.name === name
      })
      if(exists){
        console.log('error. contact ' + name + ' already exists.');
      }else{
        data.push({
          name: name,
          number: parseInt(number)
        });
        console.log("added contact " + name + " with the number: " + number);
      }

    }else {
      console.log('invalid contact info');
    }
  }
}

//helper function
function isValidName(name) {
  var alphabetSet = new Set(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);
  var lowerCaseName = name.toLowerCase();
  for (var i = 0; i < lowerCaseName.length; i++) {
    var letter = lowerCaseName[i];
    if(!alphabetSet.has(letter)) {
      return false;
    }
  }
  return true;
}

function isValidNumber(number) {
  if(!isNaN(number)) {
    return number;
  }
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
  var args = process.argv.slice(1, process.argv.length);
  var contactName = args[0];
  var updateThis = args[1];
  if (contactName && updateThis) {
    var foundContact = data.find(function(contact){
      return contact.name === contactName;
    })
    if (!foundContact) {
      console.log('No contact found');
    } else if (isValidName(updateThis)){
      console.log('Updated name for ' + contactName);
      foundContact.name = updateThis;
    } else if(isValidNumber(updateThis)){
      foundContact.number = parseInt(updateThis);
      console.log('Updated number for ' + contactName);
    } else {
      console.log('Invald contact format ');
    }
  }
}


//BONUS Implement deleteContact
function deleteContact(){
  var args = process.argv.slice(1, process.argv.length);
  var deleteMe = args[0];
  if (deleteMe) {
    var modifiedData = data.filter(function(contact){
      return contact.name !== deleteMe
    })
    if(modifiedData.length+1 === data.length){
      data = modifiedData
      console.log('Removed', deleteMe);
    } else {
      console.log('No contact found');
    }

  }
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
