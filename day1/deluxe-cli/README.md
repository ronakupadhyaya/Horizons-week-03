# Pair Programming Exercise: Deluxe command line arguments

## Goal

The goal of this exercise is to learn how to use command line tools with [the NPM package `commander`](https://www.npmjs.com/package/commander).

## Intro to the command line

Almost everything you do with a graphical user interface can be done through the command line. Since node runs on the command line, it's important to get comfortable
using command line based tools.

In this exercise we will build a command line tool. A command line tool is an application that is intended to run on the command line. Our command line tool will be written in javascript so we will need NodeJS to run it. Similar to other command line tools we have been using ,think git or npm, we can change the behavior of our application by passing in arguments or flags (`npm install` compared to `npm install --save`). In the `npm install --save` we call `install` an argument to the npm command and `--save` a flag. Notice how the save flag changes the behavior of the `npm install` command. We will use flags and arguments to specify behavior in our application as well. 

### Flags and Arguments

For example: `node myProgram.js` calls the program without any flags or args.  

**Flags** are boolean values that are set by being included when calling the program.
`node myProgram.js --cookies` is calling `myProgram.js` with the flag cookies
= true and the flag milk = false because it is not present.

Flags normally have shortened versions, so --cookies is -c.
`node myProgram.js -c`

**Commands**  commands are the verbs of software. You can run:
`node myProgram.js doSomething` doSomething is not a flag, since it doesn't begin with --
It is a sub-command inside our main app, for example if we have a
calculator, our command line application could receive commands like:
`node myProgram.js add`
`node myProgram.js delete`

**Arguments** We can pass also pass strings or numbers into our program to be used as arguments or parameters. 
`node myProgram.js square 4` prints 16
`node myProgram.js --add 2 3 2` here, add takes all the remaining args, to add them up
and print 7

## Instructions

We are going to build a ToDo list app that runs on the command line.

Our list is going to take the following commands:

- `node toDo.js` is going to display the help section of our application.
- `node toDo.js add Do the dishes` is going to run the command 'Add', with the name "Do the dishes" as arguments
- `node toDo.js add Do the dishes -p 3`  is going to run the command 'Add', with the name "Do the dishes" as arguments with flag :priority 3 (default)
- `node toDo.js show` runs the command show with the default value of all!
- `node toDo.js show -i 5` runs the command show with flag id equal to 5. Only displays one element.
- `node toDo.js delete --id 3` deletes the item number 3

Bonus tasks:

- `node toDo.js toggleCompleted --id 3` is going to mark the task with id of `--id` as done.
- `node toDo.js show --completed`
- `node toDo.js show -c`

To start our application we are going to run the following commands.

### Steps

1. Open this folder `week03/day1/deluxe-cli` and install npm packages

  ```bash
  npm install
  ```

1. Implement the `--priority` (or `-p`) flag.
1. Implement the `show` command along with the `--completed` (or `-c`) flag.
1. Implement the `delete` command.
1. Run tests to verify your code.

  ```bash
  npm test
  ```

1. Implement the `toggleCompleted` command.
1. Implement the `-c` or `--completed` flag.
1. Add tests and verify your new command and flag.
