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

Program should output configuration as Json.

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
`bash node myProgram.js --cookies` is calling your program with the flag cookies
= true and the flag milk = false because it is not present

**Arguments** these can be string or number values like
`bash node myProgram.js --cookies --amount 3 --for Samuel` in here, Samuel and 3
are arguments that can be anything the user wants.

We are going to build a ToDo list. ToDo lists are the main example when working on
front end development frameworks in js, but we are going to do it on the command line.

Our list is going to take the following commands:
`node toDo.js` is going to display the help section of our application.
`node toDo.js --add Laundry` is going to add a new item to the list
`node toDo.js --task 3 --p 5` is going to set the priority for the item
`node toDo.js --task 2 --toggleCompleted` is going to mark the task as done.
`node toDo.js --task 1 --delete`
`node toDo.js --showAll`


To start our application we are going to run the following commands.
`npm install --save commmander` remember the package dependency manager? We are installing
this: https://www.npmjs.com/package/commander library to handle all the flags and
command line values. That is the module we are going to use to help us handle all
the options. Take a look at it and come back to start developing!
