"use strict";

// Part 1. KeyValueStore

// In this exercise we're going to build a KeyValueStore, something that allows us
// to associate string keys with values of any type. JavaScript objects already work
// this way! Data structures that allow us to associate keys with values are called
// Associative Arrays.
// The goal of this exercise is to create a KeyValueStore by using a JavaScript object.


// var numberOfEmployees = {};
// numberOfEmployees['McDonalds'] = 11;
// numberOfEmployees.BurgerKing = 22;
// numberOfEmployees[53] = 9;
// numberOfEmployees.first = function(){ return 3; }

// Printing the numberOfEmployees object we get:
// Restaurant: 53 has: 9 employees
// Restaurant: McDonalds has: 11 employees
// Restaurant: BurgerKing has: 22 employees
// Restaurant: first has: 22 function (){ return 3; }
// We get all functions as properties too! So we wouldn't be able to define a function
// like count

// Also, console.log(numberOfEmployees.length); -> its length is 1!
// When the key is numeric, we are assigning elements to the array. Otherwise, we
// are assigning members to the object.



// Add a 'length' property to the KeyValueStore with a value of 0,
// And add a 'pairs' property and give it a blank object as value
function KeyValueStore() {
  // YOUR CODE HERE
  this.length =  0;
  this.pairs = {};
}

// Write a function that adds new (key,value) pairs to the store.
// If the the store is empty -> kvs.pairs = {}
// You should be able to pass anything you want as keys and values: numbers, strings
// and even objects! After calling:
// kvs.put("McDonalds", 12)
// kvs.put("Subway", 2)
// kvs.put('53', 3)
// kvs.put('Other key', 'Other Value')
// Then the store kvs.pairs should have -> { '53': 3, McDonalds: 12, Subway: 2, 'Other key': 'Other Value' }
KeyValueStore.prototype.put = function(key, value) {
  // YOUR CODE HERE
  var kvs = new KeyValueStore();
  if (!value) {
    kvs.pairs = {};
  }
  else {
    kvs.pairs[key] = value;
  }

}

// Write a function that checks if the store contains a specific key;
// It should receive a key of any type: object, number, string
// And return true or false if the object has the key.
KeyValueStore.prototype.containsKey = function(key) {
  // YOUR CODE HERE
  if (this.pairs.i)
}

// Write a function that gets the values for a given key.
// It should receive the value of key as an argument
// And return either the key, or undefined if it is not on the store.
KeyValueStore.prototype.get = function(key) {
  // YOUR CODE HERE
}

// Write a function that returns how many items we have in store.
// It shouldn't take arguments, and it should return a number.
KeyValueStore.prototype.getSize = function() {
  // YOUR CODE HERE
}

// This function is very similar to containsKey(key), but this time the other way
// around. It should receive a value, and search for the key that is associated with
// that value and return it.
KeyValueStore.prototype.containsValue = function(value) {
  // YOUR CODE HERE
}

// Implement a function that deletes a certain (key,value) pair.
// The function receives the key and completely deletes the pair.
// It should return true if the object was found and deleted, false if not.
// *Note: have in mind that you should decrease the length of the array too if you
// are able to delete a value
KeyValueStore.prototype.delete = function(key) {
  // YOUR CODE HERE
}

// Write a forEach style iterator for all keys in the HashTable
// that takes a function fn and calls it with each key: fn(key);
KeyValueStore.prototype.keys = function(fn) {
  // YOUR CODE HERE
}

// Write a forEach style iterator for all values in the HashTable
// that takes a function fn and calls it with each value: fn(value);
KeyValueStore.prototype.values = function(fn) {
  // YOUR CODE HERE
}

// Write a forEach style iterator for all keys & values in the
// HashTable that takes a function 'fn'.
// fn will be called with [key, value], a two item array where
// first item is the key and the second item is the value: fn([key, value])
KeyValueStore.prototype.keysValues = function(fn) {
  // YOUR CODE HERE
}
