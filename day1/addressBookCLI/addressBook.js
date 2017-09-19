"use strict";
// The node builtin filesystem library.
var fs = require('fs');
var validator = require('validator');
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
	if(argv[0]){
		return argv[0];
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
	//YOUR CODE HERE
// var data = [
// 		{
// 		  "name": "Samuel",
// 		  "number": 76556776
// 		},
// 		{
// 		  "name": "Moose",
// 		  "number": 54356763
// 		}
// 		// "commander@0.6.1": 1,
// 		// "minimatch@0.2.14": 3,
// 		// "mkdirp@0.3.5": 2,
// 		// "sigmund@1.0.0": -1
// ];

	console.log(columnify(data, {

		dataTransform: function(x) {
			if (x === "-1") {
				x = "-None-"
			}
			return x;
		},
		config: {
			name:
				{
				  headingTransform: function(heading){
					  return 'CONTACT_NAME';
				  }
			  },
		   number:
		   {
			   headingTransform: function(heading){
				   return 'PHONE_NUMBER';
			   }
		   }
		}
}))
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
	var valid = true;
//	console.log("name: " + name);
	//console.log("number: " + number);

	// Test if passed name
	if(name == null || name in data){
		console.log("Invalid contact information.");
		valid = false;
	}

	else{

		// Test if there is non-letter in name.

			var nonLetters = /[^abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/g;
			var letterResult = name.match(nonLetters);
			if(letterResult !== null){
				console.log("Invalid contact information.");
				valid = false;
			}

			// Test if there is non-digit in number.
			else{

				// Test if passed number
				if(number == null){
					number = -1;
				}
				else{
				//	console.log("Number is " + number + "but we are here.");
					var nonNumbers = /[^0-9]/g;
					var numberResult = number.match(nonNumbers);
					//console.log("After match numberResult is " + numberResult);
					if(numberResult !== null){
						console.log("Invalid contact information.");
						valid = false;
					}
				}


			}
		}

		data[name] = number;
		if(valid){
			console.log(`Added contact ${name}, number: ${number}`);
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
	var name = argv[1];
	var change = argv[2];

// 	var testObj = [
// 	{
// 	  "name": "Samuel",
// 	  "number": 76556776
//     },
// 	{
// 	  "name": "Moose",
// 	  "number": 54356763
// 	}
// ];

	//testObj[0]["name"] = "Work!";

	// var myData = [
	// 		{
	// 		  "name": "Samuel",
	// 		  "number": 76556776
	// 		},
	// 		{
	// 		  "name": "Moose",
	// 		  "number": 54356763
	// 		}
	// ];
	var index = -1;
	for(var i = 0; i < data.length; i++){
	   if(data[i]["name"] === name){
		   index = i;
		   break;
	   }
	}
	if(index === -1){
		console.log("No contact found.");
	}

	else{
		if(isNaN(parseInt(change))){
			// string

			//console.log("data[name] " + testObj[0]["name"]);
			//console.log("This is a string.");

			data[index]["name"] = change;


		//	myData[index][name] = change;

			console.log("Updated name for " + name);
		}

		else{
		//	console.log("This is not a string.");
			var changeNew = parseInt(change);

			if((changeNew.toString()).length < (change.toString()).length){ // not a valid number
				console.log("Invalid format.");
			}

			//This is a number

			data[index]["number"] = parseInt(change);

			//myData[index]["number"] = change;

			console.log("Updated number for " + name);
		}
	}
}


//BONUS Implement deleteContact
function deleteContact(){
	//YOUR CODE HERE
	var name = argv[1];
	var index = -1;
	for(var i = 0; i < data.length; i++){
	   if(data[i]["name"] === name){
		   index = i;
		   break;
	   }
	}
	if(index === -1){
		console.log("No contact found.");
	}

	else{
		data.splice(index, 1);
		console.log(name + " removed!");
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
