"use strict";

//configuration options. These make up the exercicse.
var fs = require('fs');
// This is the NPM module commander, we use it to interpret
// command line commands, arguments and flags.
var program = require('commander');

// TODO: require the mongoose package

// YOUR CODE HERE

// TODO: connect to your Mongo Database

// YOUR CODE HERE

// TODO: check if the connection was successful

// YOUR CODE HERE

// Everything in Mongoose starts with a Schema. Each schema
// maps to a MongoDB collection and defines the shape of
// the documents within that collection.
//
// TODO: create a schema for the toDoItem. Your schema should
//    look like the following:
//    {
//      name: String,
//      priority: String,
//      completed: Boolean
//    }

// YOUR CODE HERE

// A model is a class with which we construct documents.
// Now using mongoose.model turn your schema into a model in Mongo.
// TODO: Compile schema into model called toDo
// YOUR CODE HERE

// Time to start defining our Commands. What are we going to do with our program?
// We want to be able to add, show and delete tasks.
// Syntax: lets say you want your program to go to sleep. You would define it like:
// program.command('goToSleep')
// .description("Make our program go to sleep")
// .action(goToSleep);

// Remeber to declare function goToSleep() so it is called when
// "node Program.js goToSleep" is called.

// THIS PART IS DONE FOR YOU. BE SURE TO READ THROUGH IT AND UNDERSTAND
// THE CODE.

program.command('add')
.description("Create Tasks")
.action(addTask);
program.command('show')
.description("Show Tasks")
.action(showTasks);
program.command('delete')
.description("Delete Tasks")
.action(deleteTask);

// Flags
// We will need two flags on our program. These will take values and convert them
// to numbers.
// First one wil be '--priority' or '-p', that will specify a priority for our task.

// The way to define these flags is the following.
// program
// .option('-got, --gameOfThrones <n>', 'watches GoT before sleeping', parseInt)
// So, here if we call our program `node program.js goToSleep --gameOfThrones 8`
// we can use it to know that we have to watch it before sleeping. The bool value
// of the flag will be stored on program.gameOfThrones

// The <n> part specifies that an argument can be passed to that flag, and that it
// will be parsed with parseInt. Here we can specify the number of the episode that
// we want to watch.

// TODO: add flags for "-t and --task" (do not use parseInt as the
//    task name should be kept a string)
program
.option('-p, --priority <p>', 'Specify priority for task', parseInt)
// YOUR CODE HERE

// Arguments
// These line is part of the 'Commander' module. It tells them to process all the
// other arguments that are sent to our program with no specific name.
program.parse(process.argv);
if (process.argv.length === 2) {
  program.help();
}

// All the arguments that are not specified as flags are stored on an array called
// program.args
// Calling our program with unkown args like 'node program.js No One'  means nothing
// to our program. It is not a flag or command. It is an extra argument, so our
// programs.args contain -> ['No', 'One', {}].
// 'No One' is the name of the GoT episode. and the last item is an object that contains
// many other more advanced arguments that are not going to be used now

// The function parseArgs eliminates the last element on the array and joins
// it in a string so: ['No', 'One', {}] -> ['No', 'One'] -> "No One"
function parseArgs () {
  var args = program.args.splice(0, (program.args.length-1));
  return args.join(" ");
}

// Example: This is a function that is called to create a new task.
// Calling `node to_do.js add Do the dishes -p 3` must all our function addTask.
// it should get the name of the task by calling parseArgs() and the priority
// for the tast from program.priority.
// Remember to set priority to some default if the command is called without '-p'
// `node to_do.js add Do the dishes`
function addTask(){
  var priority = program.priority || 1;
  var name = parseArgs();

  // TODO: create new instance of your toDo model (call it task) and
  //    set name, priority, and completed.

  // YOUR CODE HERE

  // TODO: Use mongoose's save function to save task (the new instance of
  //    your model that you created above). In the callback function
  //    you should close the mongoose connection to the database at the end
  //    using "mongoose.connection.close();"

  // YOUR CODE HERE
}

// Write function showTasks(). It is be called when the program is called like
// 'node to_do.js show' and 'node to_do.js show -t laundry'
// if there is a flag value for name, the program should only display that task
// it there is no flag task, the program should return all tasks.
// data = [{name: "Do Laundry"}, {name: "Clean dishes"}, {name:"Call mark"}]
// Here,  'node to_do.js show -t Clean dishes' will show "Clean dishes"
// use console.log to write to the command line.
// Tasks must be logged in the following way:
//    Task: [task.name], Priority: [task.priority], Completed: [task.completed]
function showTasks() {
  // Hint: Use the .find function on your model to get the tasks
  //    .find({key: value}, function(err, task) { // do things } ) - only finds tasks where {key: value} matches
  //    .find(function (err, task) { // do things } ) - finds all tasks

  // YOUR CODE HERE
}

// Write a function that is called when the command `node to_do.js delete -t laundry`
// is run. Take the name from program.task and delete that element from the database.
function deleteTask(){
  // TODO: IF program.task exists you should use mongoose's .remove function
  //    on the model to remove the task with {name: program.task}

  // YOUR CODE HERE
}
