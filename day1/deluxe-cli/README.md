# Pair Programming Exercise: Deluxe command line arguments

## Goal

The goal of this exercise is to learn how to use command line arguments and flags.

## Instructions

1. Single char flags `-t`
1. String flags `--true`
1. Boolean flags
1. Default values for flags
1. String valued flags
1. Integer valued flags

Program should output configuration as JSON.

## Part 1
Almost everything you do on a user interface can be done through the command line.
It may seem a bit harder at first, but as you get more comfortable with the command
line you will be able to do things you didn't know were possible, and a lot faster
too!

The purpose of this exercise is to build your first application that works completely
on the command line. For this you will need 2 things: node to run your JavaScript
program from the command line and a way to give options to your program, otherwise
it would always do the same thing. For this, we use flags and args:

For example: `node myProgram.js` calls the program without any flags or args.  

**Flags** are boolean values that are set by being included when calling the program.
`node myProgram.js --cookies` is calling your program with the flag cookies
= true and the flag milk = false because it is not present.

Flags have a simplified version of their commands, so --cookies is also -c. This helps
users access our command line utilities faster.
`node myProgram.js -c`

**Commands**  commands are the verbs of software. Yo can say:
`node myProgram.js doSomething` doSomething is not a flag, thus it doesn't begin with --
It is a sub-program inside our main app, for example a function. So if we are doing a
calculator, our command line could receive commands like:
`node myProgram.js add`
`node myProgram.js delete`

**Arguments** Arguments are the last piece of the software. We can pass strings or
numbers into our program. To do things like
`node myProgram.js square 4` and it would have to print 16
`node myProgram.js --add 2 3 2` here, add takes all the remaining args, to add them up
and print 7


We are going to build a ToDo list. ToDo lists are the main example when working on
front end development frameworks in JS, but we are going to do it on the command line.

Our list is going to take the following commands:
`node to_do.js` is going to display the help section of our application.
`node to_do.js add Do the dishes` is going to run the command 'Add', with the
name "Do the dishes" as arguments
`node to_do.js add Do the dishes -p 3`  is going to run the command 'Add', with the
name "Do the dishes" as arguments with flag :priority 3 (default)
`node to_do.js show` runs the command show with the default value of all!
`node to_do.js show -i 5` runs the command show with flag id equal to 5. Only displays
one element.
`node to_do.js delete --id 3` deletes the item number 3
`node to_do.js toggleCompleted --id 3` is going to mark the task with id of --id
 as done.
`node to_do.js show --completed`
`node to_do.js show --c`


To start our application we are going to run the following commands.
`npm install commmander --save` and `npm install` We are installing this:
 https://www.npmjs.com/package/commander library to handle all the flags and
command line values. Take a look at its README and come back to start developing!


To run tests, use the command `npm test`
