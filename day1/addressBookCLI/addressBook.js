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
  // YOUR CODE HERE
  if(argv.length === 0){
    return '';
  }
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
    //YOUR CODE HERE
    for (var i=0; i<data.length; i++) {
      if(data[i].number === -1) {
        data[i].number = "-None-"
      }

    }


    var columns = columnify(
        data
    , {
        config: {
            name: {
                headingTransform: function(heading) {
                  return "CONTACT_NAME"
                }
            },
            number: {
              headingTransform: function(heading) {
                return "PHONE_NUMBER"
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
    //take name at position [1] in the array of argv and set = var name and position 2 = var number
    var name = argv[1];
    var number = argv[2] || '-1';
    if (name && isValidName(name) && !isNaN(number)) { // name checks that name is represented, name === letters makes sure there are only letters in name, and !isNaN(number) makes sure the number is just digits
      var exists = data.find(function(x) {
        return x.name === name;
      });
      if (exists) {
        console.log('Contact already exists');
      } else {
        data.push({
          name: name,
          number: Number(number)
        });
        console.log("Added contact "+ name +", and number: " + number);
    }
  } else {
    console.log('invalid contact format');
  }
}

function isValidName(name) {
  var alphabetSet = new Set(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
  var lowerCaseName = name.toLowerCase();
  for (var i = 0; i < lowerCaseName.length; i++) {
    var letter = lowerCaseName[i];
    if(!alphabetSet.has(letter)){
      return false;
    }
  }
  return true;
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
// YOUR CODE HERE
  var args = process.argv.slice(1,process.argv.length);
  var name = args[0];
  var updateField = args[1];
  if(name && updateField){
    var foundContact = data.find(function(contact){
      return contact.name === name
    })
    if(!foundContact){
      console.log('No contact found');
    } else if(isValidName(updateField)){
      console.log('Updated name for', name);
      foundContact.name = updateField;
    } else if(isValidNumber(updateField)){
      foundContact.number = parseInt(updateField)
      console.log('Updated number for', name);
    } else {
      console.log('Invalid contact format');
    }
  }
}


//BONUS Implement deleteContact
function deleteContact(){
    //YOUR CODE HERE
    var args = process.argv.slice(1,process.argv.length);
  


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
