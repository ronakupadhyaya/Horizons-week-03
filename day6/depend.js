"use strict";

/*
To start building our dependency manager, we first need a wey to store all of
our module's dependencies. We need to tell our Tracker (or Dependency manager) which
module depends on which. There are many ways of doing this, and you can pick the
one that feels the best. One good option is creating an object "module", that has
an array for all its dependencies. Another option is to store them by arrays. We
have decided to store them as key value pairs, where the key is the module and the
value are its dependencies. For example A depends on B and C; X on Z would be:

{
  'A': ['B', 'C'],
  'X': ['Z']
}

We also need to keep track of all the modules that the user has installed in their
programs using the install() function. These are the modules the user wants, and
that can be installed later on.

Finally, we need to have a way to keep track of all the components that our system
has. That is: The userInstalledComponents + their dependencies.
*/

function Tracker() {
  this.dependencies={};
  this.installedComponents=[];
  this.userRequiredComponents=[];
}

// Okay, now we need to start walking through the dependencies graph. We need to
// get a starting compontent, and then go through all the components it dependes on.
//For these dependencies we'll have to install their dependencies too! So, we need
// a recursive function that goes through all the nodes on the graph.

// Write a function that makes 'component' depend on 'anotherComponent'. It should
// take two strings as arguments and store the dependency relation in the Tracker.
// A component can depend on many other components, there should be no restrictions
// on here because components are just declaring their dependencies and not yet
// being installed.
Tracker.prototype.depend = function(component, dependsOn) {
  // YOUR CODE HERE
}

// It should return an array representing all components that need to be installed,
// in the order they need to be installed to add the dependencies for the module.
// A good way of going through the dependency tree is using recursion.

// The suggested arguments are (component, resolved, seen), where component is
// the module that needs to be installed, resolved is an array that is passed to the
// function to store all the modules that need to be installed, and seen, a blank
// array to store all the modules that have already been seen by the function (to
// detect cicrular dependendencies)
// Possible way of calling this function to install the module 'A':
// var neededModules = [];
// getDependenciesForModule('A', neededModules, []);
// This approach uses recurson to visit other nodes, and thus can't have one single
// return value, that is why we use the outside var neededModules to call the function.
Tracker.prototype.getDependenciesForModule = function(component, resolved, seen){
  // YOUR CODE HERE
}

// Write a function that takes a component and installs it. It should save this
// module to the Tracker as a module the user has requested.
// It also needs to add all the components to our system, meaning the installed
// module and all its dependencies using getDependenciesForModule();
//
// Bonus: Adding circular dependencies like A depends on B and B depends on A cannot
// be possible. Throw an exception when installing circular deps.
Tracker.prototype.install = function(component) {
  // YOUR CODE HERE
}

// Write a function that uninstalls the given component. The function should receive
// one string with the module that must be uninstalled.  If it has not been installed,
// throw an exception. The module has to be removed from the userInstalledComponents.

// Here comes the tricky part:
// If there were modules that the uninstalled component needed, and no other component
// needs them, they should be uninstalled too.
// Return an array of components that were uninstalled, in the order they
// were uninstalled.

Tracker.prototype.uninstall = function(component) {
  // YOUR CODE HERE
}

// Get an array representing all components that have been installed by the user
Tracker.prototype.getUserInstalled = function() {
  // YOUR CODE HERE
}
// Get an array representing all components that have been installed by the user
// plus their dependencies
Tracker.prototype.getAllInstalledComponents = function() {
  // YOUR CODE HERE
}
