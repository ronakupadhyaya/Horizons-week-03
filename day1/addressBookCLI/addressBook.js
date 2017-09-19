"use strict";

var fs = require('fs'); // The node builtin filesystem library.
var validator = require('validator')
var columnify = require('columnify') //require columnify here

// If data.json file doesn't exist, create an empty one
var JSON_FILE = 'data.json'
ensureFileExists();
var data = JSON.parse(fs.readFileSync(JSON_FILE)); // This is where our Address Book is stored.

//the message that will be displayed  If no arguments are specified or if user types help
var helpString = "\n\tUsage: addressBook [options] [command]\n\n\n" +
                  "\tOptions:\n" + "\t\thelp   Show this help message and quit"+
                  "\n\n\n\tCommands:\n" + "\t\tadd       Create Contact\n" +
                  "\t\tdisplay   Display all contacts in directory\n" +
                  "\t\tupdate    Update existing contact\n"

var argv = process.argv
argv.splice(0,2); //remove 'node' and path from args,
//NOTE: splicing modifies process.argv, so you will not need to do this again!


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
  var args = process.argv;
  if (args.length > 0){
    return args[0];
  }
  return "";
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
    //console.log(columnify(data)); //UNCOMMENT
    var output = columnify(data, {
        dataTransform: function(contactData){
          if (contactData == -1){
            return "-None-";
          }
          return contactData;
        },
        config: {
          name: {
            headingTransform: function(heading){
              return "CONTACT_NAME";
            }
          },
          phone: {
            headingTransform: function(heading){
              return "PHONE_NUMBER";
            }
          }
        }
      });
    console.log(output);
}

//----------------- PART 3 'add' command---------------------//
/**
* Implement addContacts()
* This is a function that is called to create a new contact.
* Calling `node add contactName contactNumber ` must call our function addContact.

*  (no duplicate contacts)
* andand the number consists of only numbers
* name: string, number: number
* if no number is provided, store -1 as their number
*/
function addContact(){
  //it should get the name and number of the Contact from process.argv
  var args = process.argv;
  //You should only create a new contact if a name is provided that doesnt already
  // exist inside your address book
  if (data[0].name === args[1]){
    console.log("Contact already exists.");
    return false;
  } else {
    // if the name consists of only letters
    if (isAlphabetic(args[1])){
      if (args[2]){ // does the number exist?
        // is it a complete integer?
        var numAsString = args[2].toString();
        if (isNumeric(numAsString)){
            var contact = {"name": args[1], "phone": args[2]};
            console.log("Added ", args[1], ": ", args[2], " to phone book.");
            data.push(contact);
          } else {
            console.log("Phone number must be an integer.")
          }
      } else {
          // if there is no number
          var contact = {"name": args[1], "phone": -1};
          console.log("Added ", args[1], " to phone book.");
          data.push(contact);
      }
    }
  }
}

function isAlphabetic(string){
  for (var i = 0; i < string.length; i++){
    if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(string[i]) === -1){
      console.log("Contact must be composed of only letters");
      return false;
    }
    return true;
  }
}

function isNumeric(string){
  for (var i = 0; i < string.length; i++){
    if (parseInt(string[i]) === NaN){
      console.log("Phone number must be an integer.")
      return false;
    }
    return true;
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
// YOUR CODE HERE
}


//BONUS Implement deleteContact
function deleteContact(){
    //YOUR CODE HERE
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
