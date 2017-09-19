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
    //YOUR CODE HERE
    console.log(columnify(data, {
      dataTransform: function(data){
        if (parseInt(data) === -1){
          return '-None-';
        }
        return data;
      },
        config: {
        name: {
          headingTransform: function(heading){
            return 'CONTACT_NAME';
          }
        },
        number: {
          headingTransform: function(heading){
            return 'PHONE_NUMBER';
          }
        }
      }
        })); //UNCOMMENT
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
  var counter = 0;
  var valid = true;
  if (argv.length < 2){
    valid = false;
  }
  else{
    for (var i = 0; i < argv[1].length; i++){
      if (!isNaN(parseInt(argv[1].charAt(i)))){
        console.log('Invalid name');
        valid = false;
      }
    }
    for (var k = 0; k < data.length; k++){
      if (argv[1] === data[k].name){
          console.log(argv[1] + ' already in Address Book');
          counter = 1;
          valid = false;
        }
      }
      if (counter !== 1){
        var length = data.push();
        data[length-1]['name'] = argv[1];
      }
      for (var j = 0; j < argv[2].length; j++){
        if (isNaN(parseInt(argv[2].charAt(j)))){
            console.log('Invalid number');
            valid = false;
          }
        }
      }
    if (valid === true){
      if (argv.length === 2){
        data[length-1]['number'] = -1;
      }
      else{
        data[length-1]['number'] = argv[2];
      }
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
  var valid = false;
  var num = false;
  var name = false;
  var pos = 0;
  if (argv.length < 3){
    valid = false;
  }
  else{
    for (var i = 0; i < argv[1].length; i++){
      if (!isNaN(parseInt(argv[1].charAt(i)))){
        console.log('Invalid contact format');
        valid = false;
        break;
      }
    }
    for (var j = 0; j < data.length; j++){
      if (argv[1] === data[j].name){
        valid = true;
        pos = j;
        break;
      }
    }
    if (isNaN(parseInt(argv[2]))){
      for (var o = 0; o < argv[2].length; o++){
        if (!isNaN(parseInt(argv[2].charAt(o)))){
          console.log('Invalid contact format');
          valid = false;
          break;
        }
      }
      name = true;
    }
    if (!isNaN(parseInt(argv[2]))){
      for (var l = 0; l < argv[2].length; l++){
        if (isNaN(parseInt(argv[2].charAt(l)))){
            console.log('Invalid contact format');
            valid = false;
            break;
          }
        }
        num = true;
    }
  }
  if (valid === true){
    if (name === true){
      data[pos].name = argv[2];
    }
    if (num === true){
      data[pos].number = parseInt(argv[2]);
    }
  }
  if (valid === false){
    console.log('No contact found');
  }
}


//BONUS Implement deleteContact
function deleteContact(){
    //YOUR CODE HERE
    var valid = false;
    for (var j = 0; j < data.length; j++){
      if (argv[1] === data[j].name){
        data.splice(j, 1);
        valid = true;
        break;
      }
    }
    if (valid === false){
      console.log('No contact found')
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
