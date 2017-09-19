"use strict";
// The node builtin filesystem library.
var fs = require('fs');
var columnify  = require('columnify')
var validator = require('validator')
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
  //console.log(argv[0]);
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

  // for(var i = 0; i < data.length; i++){
  //   if(data[i]['number'] <= -1){
  //     data[i]['number'] = '-none-'
  //   }
  // }
  // console.log(data);
  console.log(columnify(data, {
    dataTransform: function(data) {
      //console.log(data);
      if(data === '-1'){
        return '-None-'
      }
      return data
    },
    config: {
      name: {
        headingTransform: function(heading) {
          heading = "CONTACT_NAME"
          return heading
        }
      },
      number: {
        headingTransform: function(heading) {
          heading = "PHONE_NUMBER"
          return heading
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
  if(argv[1] === undefined){
    console.log("Invalid contact format");
  }
  var Name = argv[1];
  var number = argv[2];
  for(var i = 0; i < data.length; i++){
    if(data[i].name === Name){
      console.log(Name + ' already in Address Book.')
      return;
    }
  }
  if(number === undefined){
    number = -1;
  }
  //console.log({'name': name, 'number': number});
  data.push({'name': Name, 'number': parseInt(number)});
  console.log("Added contact " + Name);
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
  for(var i = 0; i < data.length; i++){
    if(data[i].name === argv[1]){
      if(!isNaN(argv[2])){
        data[i].number = parseInt(argv[2]);
        console.log("Updated number for " + argv[1]);
      } else {
        data[i].name = argv[2];
        console.log("Updated name for " + argv[2]);
      }
      return;
    }
  }
  console.log("No contact found");
}


//BONUS Implement deleteContact
function deleteContact(){
    //YOUR CODE HERE
  for(var i = 0; i < data.length; i++){
    if(data[i].name === argv[1]){
      data.splice(i,1);
      console.log("Deleted " + argv[1]);
      return;
    }
  }
  console.log("No contact found");
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
