"use strict";
// The node builtin filesystem library.
var fs = require('fs');

// This is the file where we're storing our data.
// It's in this directory you can open it and check out the contents.
var JSON_FILE = 'data.json'

// If file doesn't exist, create an empty one
ensureFileExists();

// This is where our TO-DO List data is stored.
// It's an array of objects.
//
// Each object represents a TO-DO item and has three properties
// - name: a string, name of the task
// - prirority: a number, the priority of the task
// - completed: a boolean, true if task is completed, false otherwise
//
// We're going to be modifying data with our commands.
var data = JSON.parse(fs.readFileSync(JSON_FILE));

// This is the NPM module commander, we use it to interpret
// command line commands, arguments and flags.
var program = require('commander');

// ---Commands---
// Time to start defining our Commands. What are we going to do with our program?
// We want to be able to add, show and delete tasks.
//
// For example, this creates a command called 'sleep':
// program.command('sleep')
//    .description("Make our program go to sleep")
//    .action(sleep);
// Where 'goToSleep' is function.

// Example. Create the 'add' command.
program.command('add')
  .description("Create Tasks")
  .action(addTask);

// YOUR CODE HERE for "Show" its action must call showTasks
program.command('show')
  .description("Show Tasks")
  .action(showTasks);

// YOUR CODE HERE for "Delete" its action must call deleteTask
program.command('delete')
  .description("Delete Tasks")
  .action(deleteTask);

// CODE HERE FOR TOGGLE completed
program.command('toggleCompleted')
  .description("Toggle Completed")
  .action(toggleCompleted);



// ---Flags---
// We will need two flags on our program. These will take values and convert them
// to numbers.

// Here's how you define flags:
// program.option('-g, --gameOfThrones <n>', 'watches GoT before sleeping', parseInt)
// This will define a flag that takes an integer argument.
// So, here if we call our program `node program.js goToSleep --gameOfThrones 8`
// we can use it to know that we have to watch it before sleeping. The bool value
// of the flag will be stored on program.gameOfThrones.

// The <n> part specifies that an integer can be passed to that flag, and that it
// will be parsed with parseInt. Here we can specify the number of the episode that
// we want to watch.

// Example: first flag: --id or -i. This one will specify which task commands
// like 'show' or 'delete' are called on.
program
  .option('-i, --id <n>', 'Specify id of task', parseInt)

// Second one will be '--priority' or '-p', that will specify a priority for our task.
// YOUR CODE HERE for "--priority and -p"
  .option('-p, --priority <n>', 'Specify priority of task', parseInt)
  // .option('-n, --name <n>', 'Specify name')
  // .option('-x, --bool', 'Specify bool');

  .option('-c, --completed', 'Specify priority of task');



// Arguments
// This line is part of the 'Commander' module. It tells them (Commander) to process all the
// other arguments that are sent to our program with no specific name.
program.parse(process.argv);

// If no arguments are specified print help.
if (process.argv.length === 2) {
  program.help();
}

// function sayHello(){
//   console.log(program.id)
// }

// This is a function that converts remaining unprocessed arguments into a string
// so we can create tasks using it.
function getRemainingArgs () {
  var args = program.args.splice(0, (program.args.length-1));
  return args.join(" ");
}

// Example: This is a function that is called to create a new task.
// Calling `node toDo.js add Do the dishes -p 3` must call our function addTask.
// it should get the name of the task by calling getRemainingArgs() and the priority
// for the task from program.priority.
// Remember to set priority to some default if the command is called without '-p'
// `node toDo.js add Do the dishes`
function addTask() {
  var priority = program.priority || 1;
  var name = getRemainingArgs();
  data.push({
    name: name,
    priority: priority,
    completed: false
  });
  console.log("Added task named: "+ name + ", with id: " + data.length +", and priority: " + priority);
}


// Write function showTasks(). It is be called when the program is called like
// 'node toDo.js show' or 'node toDo.js show -i 3'
// This function should output the appropriate TO-Do tasks using console.log().
// The format of the output should be exactly:
// Task #ID Priority PRIORITY: NAME
//
// Note:
// - if there is a flag value for id, the program should only display that task
// - it there is no flag id, the program should return all tasks.
// - the id of a task is its index in 'data' + 1, we count ids up from 1.
//
// ex.
//  data = [{name: "Do Laundry"}, {name: "Clean dishes"}, {name:"Call mark"}]
//  node toDo.js show -i 2 -> "Clean Dishes"
// ex.
//  data = [{name: "Do Laundry", priority: 2}]
//  node toDo.js show -> Task #1 Priority 2: Do Laundry
function showTasks(){
  if(!program.id) {
    for(var i = 0; i < data.length; i++) {
      console.log("Task #" + parseInt(i+1) + " Priority " + parseInt(data[i].priority) + ": " + data[i].name);
    }
  } else {
    // if(data[program.id - 1].completed) {
    //   console.log("Task #" + parseInt(i+1) + " Priority " + parseInt(data[i].priority) + ": " + data[i].name + " Completed");
    // }
    console.log("Task #" + program.id + " Priority " + data[program.id - 1].priority + ": " + data[program.id - 1].name);
  }
  // if(process.argv.indexOf()] )
  // for(var i = 1; i < data.length; i++) {
  //   console.log(data[i]);
  // }
}

function toggleCompleted() {
  data[program.id - 1].completed = true;
}

// Write a function that is called when the command `node toDo.js add delete -i 3`
// is run. Take the id from program.id and delete the element with that index from 'data'.
// Hint: use splice() here too!
function deleteTask(){
  data.splice(program.id-1, 1);
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
