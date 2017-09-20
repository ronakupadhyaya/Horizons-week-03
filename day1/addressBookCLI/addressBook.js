"use strict";
// The node builtin filesystem library.
var fs = require('fs');
var validator = require('validator')
var columnify = require('columnify')
//require columnify here


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
  if (argv.length === 0){
    return "";
  }else{
    return (argv[0]);
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

  var output = columnify(data, {
    dataTransform: function(contactData){
      if (parseInt(contactData) === -1){
        return '-None-';
      }
      return contactData;
    },
    config: {
      name:{
        headingTransform: function(heading){
          return "CONTACT_NAME";
        }
      },
      number: {
        headingTransform: function(heading){
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
  // YOUR CODE HERE
  var name = argv[1];
  var number = argv[2];

  console.log(argv);
  if(!name || !/^[a-zA-Z]+$/.test(name) || (number && !/^[0-9]+$/.test(number))){
    console.log("Invalid contact format");
    return false;
  }
  var nameFound = false;
  data.forEach(function(contact){
    if(contact.name===name){
      console.log(`${name} already in Address Book`);
      nameFound = true;
    }
  });
  if(nameFound){
    return false;
  }
  var newContact = {};
  newContact.name = name;
  if(number){
    newContact.number = Number(number);
  }
  else {
    newContact.number = -1;
  }
  data.push(newContact);
  console.log(`Added contact ${name}`);
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
  var name = argv[1];
  var name_number = argv[2];
  var is_present = false;

  for (var i = 0; i < data.length; i++){
    if (data[i].name === name){
      is_present = true;
      if (isNaN(name_number)){
        data[i].name = name_number;
      }else{
        data[i].number = Number(name_number);
      }
    }
  }
  if (!is_present){
    console.log('No contact found')
  }

}


//BONUS Implement deleteContact
function deleteContact(){
    //YOUR CODE HERE
    var name = argv[1];
    var name_number = argv[2];
    var is_present = false;

    for (var i = 0; i < data.length; i++){
      if (data[i].name === name){
        is_present = true;
        data.splice(i, 1);
        break
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
