"use strict";
var columnify = require('columnify')
// The node builtin filesystem library.
var fs = require('fs');
var validator = require('validator')
var _ = require("underscore")
//require columnify here


var JSON_FILE = 'data.json'
// If data.json file doesn't exist, create an empty one
ensureFileExists();
// This is where our Address Book is stored.
var data = JSON.parse(fs.readFileSync(JSON_FILE));




//the message that will be displayed  If no arguments are specified or if user types help
var helpString = "\n\tUsage: addressBook [options] [command]\n\n\n" +"\tOptions:\n" + "\t\thelp   Show this help message and quit"+"\n\n\n\tCommands:\n" + "\t\tadd       Create Contact\n" + "\t\tdisplay   Display all contacts in directory\n" + "\t\tupdate    Update existing contact\n"


var argv = process.argv
// console.log(process.argv +"fghjfghjgf") //UNCOMMENT TO SEE WHAT PROCESS.ARGV IS BEFORE WE SPLICE
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
  if (process.argv.length === 0){
    return ("")
  } else {
    return process.argv[0]
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
   var output = columnify (data, {
   dataTransform: function(contactData){
     if (parseInt(contactData) === -1){
       return ("-None-")
     } else {

       //console.log(contactData[0])
       return (contactData)
     }
   },
     config: {
      name:{
        headingTransform: function(heading) {
          return "CONTACT_NAME";
        }
      },
      number:{
        headingTransform: function(heading){
          return "PHONE_NUMBER"
        }
      }
    }
  })
  console.log(output)
}




    //YOUR CODE HERE
  //  console.log(columnify(data), {columns: ["CONTACT_NAME", "PHONE_NUMBER"]})
    //console.log(columnify(data, {columns: ["CONTACT_NAME", "PHONE_NUMBER"]})); //UNCOMMENT
    //console.log(data)
    //console.log(columnify(data, {columns: ['MODULE', 'COUNT']}))


// var columns = columnify([{
//     name: 'mod1',
//     description: 'SOME DESCRIPTION TEXT.'
// }, {
//     name: 'module-two',
//     description: 'SOME SLIGHTLY LONGER DESCRIPTION TEXT.'
// }], {
//     dataTransform: function(data) {
//         return data.toLowerCase()
//     },
//     config: {
//         name: {
//             headingTransform: function(heading) {
//               heading = "module " + heading
//               return "*" +  heading.toUpperCase() + "*"
//             }
//         }
//     }
// })



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
function addContact(){
  var name = process.argv[1]
  var number = process.argv[2]

for (var i = 0; i<data.length; i++){
  if (name  === data[i].name) {
    console.log ("That name already exists!")
    return false;
  }
}
console.log(validateName(name))
if (validateName(name) && validateNumber(number)) {
      data.push({
        name: name,
        number: parseInt(number)
    });
    console.log("Added contact " + name + " and number " + number);
  } else {
    console.log ("invalid format")
  }
}

// YOUR CODE HERE

function validateName(name) {
  // var name = process.argv[1]
  // var number = process.argv[2]
  var allowedLetters = new Set([ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l","m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"])
  var lowerCaseName = name.toLowerCase()
  for (var i=0; i<lowerCaseName.length; i++){
    if (!allowedLetters.has(lowerCaseName[i])){
      console.log("false")
      return false;
    }
  };
  return true
};

function validateNumber(number) {
  if (isNaN(number)) {
    return false
  } else {
    return true
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
  var name = process.argv[1]
  var number = process.argv[2]

  for (var i = 0; i<data.length; i++){
    //console.log(data)
    if (name === data[i].name){
      if (validateName(name) && validateNumber(number)) {
        _.mapObject(data, function(){
          data[i].number = number
        })
        console.log("Updated contact " + name + " with number " + number)
        return false
      }
    //  console.log(data[i].name)
    //  console.log(number)
    }
  }
    console.log("no contact found")
}

  // 1. check if name is in data
  // 2. if yes in data, update with valid new name/number
  // 3. if not in data, console.log("no contact found")



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
