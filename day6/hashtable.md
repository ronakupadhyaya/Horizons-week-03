# Pair programming exercise: Hashtables

A simple hash table is a collection of (key, value) pairs, such that each possible
key appears just once in the collection. As a structure that stores data, it
should be able to:

- Add a pair to the collection
- Remove a pair from the collection
- Modify an existing pair
- Lookup value associated with a particular key
- Lookup a key associated to a value
- Get the count of items in the store.
- Iterate through all the elements, calling a function with the keys
- Iterate through all the elements, calling a function with the values
- Iterate through all the elements, calling a function with the keys and values.

## Why do we want hash tables?
There are two main reasons why we'd want them. So, we'll divide its implementation
into 2 parts:

1. KeyValueStore: To save any type associated to a string. like "name" -> "Daniel"
The goal on this exercise is to be able to create a data structure that can save
and retrieve (key, value) pairs.
2. HashTable: To save items and have fast search times.
The goal of this exercise is to expand the keyValueStore into using real hashes
and storing data to make searches faster.

#Exercises

To start, we will develop a simplified version of the HashTable that will use
Javascript objects, and will implement all the methods needed to handle data correctly.
The second part will dive into hashing and storing with arrays, using the same methods
as Part 1.

1. Part 1: KeyValueStore <br>
   Files: `week02/day6/keyvaluestore.js` and `week02/day6/keyvaluestore.html`
1. Part 2: HashTable <br>
   Files: `week02/day6/hashtable.js` and `week02/day6/hashtable.html`
