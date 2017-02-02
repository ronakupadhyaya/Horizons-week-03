"use strict";

//configuration options. These make up the exercicse.
var fs = require('fs');
// This is the NPM module commander, we use it to interpret
// command line commands, arguments and flags.
var program = require('commander');

// EXERCISE 0: Create a config.js file that should export the MONGODB_URI (use module.exports)

var config = require('./config');

// require the mongoose package
var mongoose = require('mongoose');

// connect to your Mongo Database
mongoose.connect(config.MONGODB_URI);
mongoose.Promise = global.Promise;

// check if the connection was successful
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error. did you remember to create a config file? '));
db.once('open', function() {

  console.log('connected!')
  // connected!

});

// EXERCISE 1: Create the Model

// Everything in Mongoose starts with a Schema. Each schema
// maps to a MongoDB collection and defines the shape of
// the documents within that collection.
//
// A model is a class with which we construct documents.
// Now using mongoose.model turn your schema into a model in Mongo.
//
// TOD0: create a model (called ToDoItem) with a "name" property that
//    is a String, a "priority" property that is a String, and a
//    "completed" property that is a Boolean.



var ToDoItem = mongoose.model( 'ToDoItem', { name: 'string', priority:'string', completed: Boolean });
// YOUR CODE HERE

// Time to start defining our Commands. What are we going to do with our program?
// We want to be able to add, show and delete tasks.
// Syntax: lets say you want your program to add a task. You would define it like:
// program.command('add')
// .description("Create Tasks")
// .action(addTask);
//
// addTask is a function that should be defined somewhere in your code. The
// function will be called when the add command is run.

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

// add flags for "-t and --task" (do not use parseInt as the
//    task name should be kept a string)
program
.option('-p, --priority <p>', 'Specify priority for task', parseInt)
.option('-t, --task <n>', 'specify a task' )

// YOUR CODE HERE

// Arguments
// These lines are part of the 'Commander' module. They tell it to process all the
// other arguments that are sent to our program with no specific name.
program.parse(process.argv);
if (process.argv.length === 2) {
  program.help();
}

// All the arguments that are not specified as flags are stored on an array called program.args
// Calling our program with unkown args like 'node program.js No One'  means nothing
// to our program. It is not a flag or command. It is an extra argument, so our
// programs.args contain -> ['No', 'One', {}].
// 'No One' is the name of the Game of Thrones episode. and the last item is an object that contains
// many other more advanced arguments that are not going to be used now

// The function parseArgs eliminates the last element on the array and joins
// it in a string so: ['No', 'One', {}] -> ['No', 'One'] -> "No One"
function parseArgs () {
  var args = program.args.splice(0, (program.args.length-1));
  return args.join(" ");
}

// EXERCISE 2: Add task

// Example: This is a function that is called to create a new task.
// Calling `node toDo.js add Do the dishes -p 3` must all our function addTask.
// it should get the name of the task by calling parseArgs() and the priority
// for the tast from program.priority.
// Remember to set priority to some default if the command is called without '-p'
// `node toDo.js add Do the dishes`
function addTask(){
  var priority = program.priority || 1;
  var name = parseArgs();

  //  create new instance of your toDo model (call it task) and
  //    set name, priority, and completed.
var task= new ToDoItem({name: name, priority: priority, completed:false})
  // YOUR CODE HERE

  // : Use mongoose's save function to save task (the new instance of
  //    your model that you created above). In the callback function
  //    you should close the mongoose connection to the database at the end
  //    using "mongoose.connection.close();"
    task.save(function(error) {
      if(error) {
        throw 'errorsilly'
      } else {
        console.log( name+' '+'saved_to_database')
      }

    })
  // YOUR CODE HERE
}

// EXERCISE 3: Show tasks

// Write function showTasks(). It is called when the program is run using the commands
// 'node toDo.js show' or 'node toDo.js show -t "Do Laundry"'

// Good Command Syntax (with quotes): node toDo.js show -t "Do Laundry"
// Bad Command Syntax (without quotes): node toDo.js show -t Do Laundry

// if there is a flag value for name, the program should only display the task with the specified name
// it there is no flag task, the program should return all tasks.
// data = [{name: "Do Laundry"}, {name: "Clean dishes"}, {name:"Call mark"}]
// Here,  'node toDo.js show -t "Clean dishes"' will show "Task: Clean dishes, Priority: 1, Completed: false"
// use console.log to write to the command line.
// Tasks must be logged in the following way:
//    Task: [task.name], Priority: [task.priority], Completed: [task.completed]
function showTasks() {
  var name=parseArgs();

  if(program.task) {
    ToDoItem.find({name:program.task},function(err,task) {

      if(err) {
        throw 'error'
      } else {
        console.log('task:'+task[0].name+ ' '+'Priority:'+task[0].priority+' '+'status:'+task[0].completed)
      }
    })
  } else {


    ToDoItem.find(function(err,task){
      if(err) {
        console.log('nope')
      } else {
        task.forEach(function(item){
          console.log('task:'+item.name+ ' '+'Priority:'+item.priority+' '+'status:'+item.completed);
        })
      }

    })
  }
}


  // Hint: Use the .find function on your model to get the tasks
  //    .find({name: "Do Laundry"}, function(err, task) { // do things } ) - only finds ToDoItems where name is "Do Laundry"
  //    .find(function (err, task) { // do things } ) - finds all tasks

  // YOUR CODE HERE


// EXERCISE 4: Delete tasks

// Write a function that is called when the command `node toDo.js delete -t "Do Laundry"`
// is run. Take the name from program.task and delete that element from the database.
function deleteTask(){
  // : If program.task exists you should use mongoose's .remove function
  //    on the model to remove the task with {name: program.task}

if(program.task) {
  ToDoItem.remove({name:program.task},function(err){

    if(err) {
      console.log('error!')
    } else {
      console.log( 'deleted'+program.task)
    }
  })
}






  // YOUR CODE HERE
}
