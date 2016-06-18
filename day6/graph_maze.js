// Write a function that takes a maze represented by a two-dimensional array of
// strings and returns a graph representing it.
//
// Each grid cell in the maze should be a node in the graph, and the nodes
// should only have edges between them if and only if they are adjacent in
// the maze and not a wall.
//
// id Matrix
// Give nodes numerical ids using row-major ordering:
// [[1, 2, 3],
//  [4, 5, 6],
//  [6, 7, 8]]
//
// Example maze:
// [["X", "S", " ", " ", " ", " ", " "],
//  [" ", "X", " ", " ", " ", " ", " "],
//  [" ", " ", "X", " ", " ", " ", "E"],
//  [" ", " ", " ", "X", " ", " ", " "]]
//
// Legend:
// 'X': a wall
// 'S': starting location
// 'E': ending location
// ' ': empty space

// Let's start by building the graph. The idea is to convert the maze that is stored
// in arrays to a graph.  One possible way to do this is using an Adjacency List.
// An adjacency list is an object or array that has an element for all the vertices
// in the graph. In these cases the verices are each cell in the maze. For each vertice,
// we store an array of the other vertices they are connected to.

// In the case of the maze, each vertice is represented by its id. For Example:
// The starting cell "S", has the id '2', and is connected to cell with id '3'.
// This would be represented as { '2': [ 3 ] }
// on the example matrix, this is that the first rows would look like
// { '2': [ 3 ], '3': [ 2, 4, 10 ], '4': [ 3, 5, 11 ], '5': [ 4, 6, 12 ] }
// This way, we know we can go from cell 2 to 3, to 4, to 5. But not from 2 to 1.
// *Note: This data structure is only a recommendation and can be done in many other
// ways such as Node objects, adjacency matrixes and so on.


// Graph constructor. This function takes a maze in the form of arrays, and builds
// the graph, using the mazeToGraph(maze), that is where you'll implement all your
// code to store the matrix on this.edges.

// *Note: this.edges=[] is s suggested data structure, feel free to change it to
// object or whatever you may need.
// Remember to set the startID and endID with the ids of the cells that contain
// "S" and "E".

function Graph(maze) {
  this.edges=[];
  this.mazeToGraph(maze);
  this.startID;
  this.endID;
}

// Write a function that adds an edge between two nodes in the graph.
// If nodes are not already in the graph, add them to the graph first.
// Remember to add edges in in both ways because it is not a directed graph, meaning
// users should be able to go forward and backwards through edges.
Graph.prototype.addEdge = function(nodeId1, nodeId2) {
  // YOUR CODE HERE
}

// The function should iterate over the maze  it using addEdge function for every
// step in the maze the user can go through. Remember the user can go through blank,
// " ", start "S" and end "E" cells.
// This may be a good place to store the startID and endID.

Graph.prototype.mazeToGraph = function(maze) {
  // YOUR CODE HERE
}

// Write a function that checks if two given nodes in the graph are
// connected and returns true if they are connected, returns false
// otherwise.
Graph.prototype.isConnected = function(nodeId1, nodeId2) {
  // YOUR CODE HERE
}

// Search the graph using breadth-first-search. Use the properties this.startID
// and this.endID to find a path through the maze.
// If a path is found, return the sequence of node ids walked to reach the end in
// an array
// If no path is found, return false.
Graph.prototype.searchBFS = function (){
  // YOUR CODE HERE
}

// Search the graph using depth-first-search. Use the properties this.startID
// and this.endID to find a path through the maze.
// If a path is found, return the sequence of node ids walked to reach the end in
// an array
// If no path is found, return false.
Graph.prototype.searchDFS = function (){
  // YOUR CODE HERE
}

// Write a function that returns true if the maze is solvable (meaning you can go
// from "S" to "E"). If not, return false.
Graph.prototype.isSolvable = function(){
  // YOUR CODE HERE
}
