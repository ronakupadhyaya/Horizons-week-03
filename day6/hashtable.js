"use strict";

// Part 2. Hash Table.

// The main benefit of hash tables is constant-time lookup for key, value pairs.
// This time we are going to store phone numbers. Ideally
// ["John smith"] -> "+593 9846 19872"

// Now let's say you have a million different people in an array, you would have
// to iterate the array to find the correct person up to a million times!
// Complexity is -> O(n)

// A hash table uses a different mechanism. It uses a hash function to transform
// "John Smith" into a number, say, "84" everytime the function is used. We can
// now use this as a key to store and get the value from the Collection in a faster
// way! (Because, when we search for him, we'll got to slot 84 and get it, instead
// of searching through the whole array). For example:
// hashCode("John Smith") -> "84"
// ["84"] -> ["John smith", "+593 9846 19872"];

// Because of this, the average cost (number of instructions) for each lookup is
// independent of the number of elements stored in the table. Lookup times for a
// structure with a million items is, on average, the same as a thousand items
// We hash the key, and go to that exact position. So, how does a hash work?


// The Hash function
// Ideally, a hash function will get each key and generate a unique number, but it
// is possible that two keys will generate an identical number.
// This causes "Collisions" (causing both keys to point to the same place"which
// we will study a bit later.

// A very basic idea of hashing would be getting letter values by their positions
// on the alphabet A=1 B=2 C=3 … Z=26 and then adding them up to generate the hash
// number. Lets implement this function that adds letters by their value!
// Have in mind that this will only allow us to have strings in our HashTable

// The downside of this approach is that "Sara Zhmiu" would have the same hash
// value: "84" as "John Smith" and storing our phone number data with that value
// could mean a nymber would get lost! That is a collision.

function simpleHashCode(str) {
  var sum = 0;
  str.toUpperCase().split('').forEach(function(alphabet) {
    sum += alphabet.charCodeAt(0) - 64;
  });
  return(sum);
}


// Collisions
// Instead of relying on the function not to generate two keys, we will accomodate
// collisions in a new way. If there are two People that have a same hash, we would
// want to store both numbers. So now, if we put these values:
// put("John Smith", "+593 9846 19872")
// put("Sara Zhmiu", "+593 6274 93957")

//That happen to generate the same keys
// hashCode("John Smith") -> "84"
// simpleHashCode("Sara Zhmiu") -> "84"

// We would want phoneNumbers.get(84) to return an array of both items!
//[ ["John Smith", "+593 9846 19872"], ["Sara Zhmiu", "+593 6274 93957"] ]


// Part 2. HashTable
// This time we are going to implement a real HashTable.
// The approach is simple: We get a (key, value) pair to store on the Hash.
// We use the simpleHashCode function we implemented before to hash the key.
// var hash = this.hashCode(key)
// and we store the (key, value) pair on the pairs array using this as a new
// index! pairs[84] -> ["John Smith", "+593 9846 19872"]
// All (key, value) pairs will be stored as arrays.
// We need to have a sense of the size of the array we will use. It is different
// to save memory for an array of 10 elements than it is for an array of 10000
// elements.
function HashTable() {
  // The size of your hashtable is independent of how many keys we storing
  this.tableSize = 10000;
  // This is an array full of nulls, we're going to store our keys and values here
  this.table = _.range(this.tableSize).map(_.constant(null));
  // YOUR CODE HERE
}

// Our implementation of a hash was good! But, the longer the word, the larger it's
// indices will be. So if we have "a" it's hash would be 1, but if we have "zzzzzz"
// the hashValue would quickly overflow the HashTables's tableSize.
// Write a function that calls the simpleHashCode() function and transforms its return value
// into a number between 0 and this.tableSize.
// *Hint: use the modulo operator.
HashTable.prototype.hashCode = function (str){
  // YOUR CODE HERE
  var hash = simpleHashCode(str);
  hash = hash % this.tableSize;
  return hash; 
}

// Write a function that adds new (key,value) pairs to the store using hashes!
// You should be able to pass anything you want: numbers, strings and objects.
// After calling:
// h.put("John Smith", "+593 9846 19872");
// h.put("Sara Zhmiu", "+593 6274 93957");
// h.put("Sam Smith", "+593 2442 93957");

// Then the store kvs.pairs should have ->  [
//      70: ['Sam Smith': '+593 2442 93957'],
//      84: ['John Smith': '+593 9846 19872'], ['Sara Zhmiu': '+593 6274 93957']
// ]
// We have both John and Sara on '84' because their hashes are the same. We  avoid
// collisions by appending both arrays to the hash 84.
// The function returns true if key is already set, false otherwise

// *Note: have in mind that it we already have 'Sam Smith' stored, and we put sam
// smith with the same value, it shouldn't be added twice.
// Also, if we put 'Sam Smith' with a new value: '+593 2442 93957', it's value must
// be updated
HashTable.prototype.put = function(key, value) {
  // YOUR CODE HERE
  if (!this.table[key]) {
    return false;
  }
  this.table[key] = value;
  return true;
}

// Write a function that gets the values for a given key.
// It should receive the value of key as an argument
// And return either the key, or undefined if it is not on the store.
// Note: Have in mind that if this.pairs[hash] has more than one (key, value)
// pair inside of it, you will have to go through the array to find its values!
HashTable.prototype.get = function(key){
  // YOUR CODE HERE
};

// Write a function that returns how many items we have in store.
// It shouldn't take arguments, and it should return a number.
HashTable.prototype.getSize = function() {
  // YOUR CODE HERE
}

// Implement a function that deletes a certain (key,value) pair.
// The function receives the key and completely deletes the pair.
// It should return true if the object was found and deleted, false if not.
// *Note: have in mind that you should decrease the length property of the array
// if you are able to delete a value
// *Note 2: Don't forget that this.pairs[hash] may have many [key, value] elements
// and you have to iterate through them to delete!
HashTable.prototype.delete  = function(key){
  // YOUR CODE HERE
};

// Write a function that checks if the store contains a specific key;
// It should receive a key of any type: object, number, string
// And return true or false if the object has the key.
HashTable.prototype.containsKey = function(key) {
  // YOUR CODE HERE
};

// Write a function that checks if the store contains a specific value;
// It should receive a key of any type: object, number, string
// And return true or false if the object has the value.
HashTable.prototype.containsValue = function(value) {
  // YOUR CODE HERE
}

// Write a forEach style iterator for all values in the HashTable
// that takes a function fn and calls it.
// fn will be called with each key -> fn(key)
HashTable.prototype.keys = function(fn) {
  // YOUR CODE HERE
}


// Write a forEach style iterator for all values in the HashTable
// that takes a function fn and calls it with each value: fn(value);
HashTable.prototype.values = function(fn) {
  // YOUR CODE HERE
}

// Write a forEach style iterator for all keys & values in the
// HashTable that takes a function 'fn'.
// fn will be called with [key, value], a two item array where
// first item is the key and the second item is the value: fn([key, value])
HashTable.prototype.keysValues = function(fn) {
  // YOUR CODE HERE
}


// To avoid collissions as much as possible, we are overriding the last function
// with a more professional hashing function! It is a bit complicated because it
// calculates using bytes, but it allows you to use objects, strings, numbers in
// your hashes.
// Bonus: Change and understand the implementation!

var superHashCode = function(str) {
  var hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
