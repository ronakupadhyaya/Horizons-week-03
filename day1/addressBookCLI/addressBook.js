"use strict";
// The node builtin filesystem library.
var fs = require('fs');
var validator = require('validator')
//require columnify here
var columnify = require('columnify')
// var columns = columnify(data, options)
// console.log(columns)

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
  if(argv[0] === undefined){
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
  var output = columnify(data, {
    dataTransform: function(contactData){
      if(contactData === ''){
        return '-None-';
      }
      return contactData;
    },
    config:{
      name: {
        headingTransform: function(){
          return 'CONTACT_NAME';
        }
      },
      number:{
        headingTransform: function(){
          return 'PHONE_NUMBER';
        }
      }
    }
  })

  console.log(output);

//UNCOMMENT

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
  var nullNum =-1;
  data.forEach(function(contact){
    if(contact.name === argv[1]){
      throw "Same name exists.";
    }
  });

  if(argv[2] === undefined){
    data.push({'name': argv[1],'number':nullNum});

  }else{
    data.push({'name': argv[1],'number':argv[2]});
  }

  console.log('Added Contact ' + argv[1] +', and number: '+argv[2]);

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
  var exists = false;

  if(parseInt(argv[2])){
    data.forEach(function(contact){
      if(contact.name === argv[1]){
        contact.number = argv[2];
        exists = true;
      }
    });
    if(!exists){
      console.log('No contact found');
    }else{
      console.log("Updated number for " + argv[1]);
    }
  }else{
    data.forEach(function(contact){
      if(contact.name === argv[1]){
        contact.name = argv[2];
        exists = true;
      }
    });
    if(!exists){
      console.log('No contact found');
    }

    console.log("Updated name for " + argv[1]);
  }

}


//BONUS Implement deleteContact
function deleteContact(){
  var exists = false;
  var newData = [];
  data.forEach(function(contact){
    if(contact.name === argv[1]){
      exists = true;
    }else{
      newData.push(contact);
    }
  });
  if(!exists){
    console.log('No contact found');
  }else{
    data = newData;
    console.log("Deleted contact info of " + argv[1]);
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
