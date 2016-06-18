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
  var arr = this.edges[nodeId1]
  this.edges[nodeId1] = this.edges[nodeId1] ? _.union(this.edges[nodeId1], [nodeId2]) : [nodeId2];
  this.edges[nodeId2] = this.edges[nodeId2] ? _.union(this.edges[nodeId2], [nodeId1]) : [nodeId1];
}

// The function should iterate over the maze  it using addEdge function for every
// step in the maze the user can go through. Remember the user can go through blank,
// " ", start "S" and end "E" cells.
// This may be a good place to store the startID and endID.

Graph.prototype.mazeToGraph = function(maze) {
  for (var vert= 0; vert<maze.length; vert++){
    for (var horiz = 0; horiz<maze[0].length; horiz++){
      if(maze[vert][horiz]!=="X"){
        var id = (vert*maze[0].length)+horiz+1;
        if(maze[vert][horiz]==="S"){this.startID=id}
        if(maze[vert][horiz]==="E"){this.endID=id}
        var right = false;
        var down = false;
        if(horiz+1<maze[0].length){
          right  = maze[vert][horiz+1] !== "X" ? true : false;
        }
        if (vert+1<maze.length){
          down = maze[vert+1][horiz] !== "X" ? true: false;
        }
        if (right) { this.addEdge(id, (id+1) )}
        if (down) {  this.addEdge(id, (id+maze[0].length) )}
      }
    }
  }
}

// Write a function that checks if two given nodes in the graph are
// connected and returns true if they are connected, returns false
// otherwise.
Graph.prototype.isConnected = function(nodeId1, nodeId2) {
  return _.contains(this.edges[nodeId1], nodeId2);
}

// Search the graph using breadth-first-search. Use the properties this.startID
// and this.endID to find a path through the maze.
// If a path is found, return the sequence of node ids walked to reach the end in
// an array
// If no path is found, return false.
Graph.prototype.searchBFS = function (){
  var queue = []; // push the first path into the queue of paths
  var visited = [];
  queue.unshift([this.startID])
  while (queue.length>0){
    var path = queue.pop(); // get the first path from the queue
    var node = path.slice(-1).pop() // get the last node from the path
    if (node === this.endID){return path;} // path found
    if (this.edges[node]){
      visited.push(node)
      for (var i=0; i<this.edges[node].length; i++) {   // enumerate all adjacent nodes, construct a new path and push it into the queue
        var adjacent =this.edges[node][i];
        if (!_.contains(visited,adjacent)){
          var new_path = _.map(path, _.clone);
          new_path.push(adjacent);
          queue.unshift(new_path);
        }
      }
    }
  }
  return false;
}

// Search the graph using depth-first-search. Use the properties this.startID
// and this.endID to find a path through the maze.
// If a path is found, return the sequence of node ids walked to reach the end in
// an array
// If no path is found, return false.
Graph.prototype.searchDFS = function (){
  var stack = []; // push the first path into the queue of paths
  var visited = [];
  stack.push([this.startID])
  while (stack.length>0){
    var path = stack.pop(); // get the first path from the queue
    var node = path.slice(-1).pop() // get the last node from the path
    if (node === this.endID){return path;} // path found
    if (this.edges[node]){
      visited.push(node)
      for (var i=0; i<this.edges[node].length; i++) {   // enumerate all adjacent nodes, construct a new path and push it into the queu
        var adjacent =this.edges[node][i];
        if (!_.contains(visited,adjacent)){
          var new_path = _.map(path, _.clone);   ;
          new_path.push(adjacent);
          stack.push(new_path);
        }
      }
    }
  }
  return false;
}

// Write a function that returns true if the maze is solvable (meaning you can go
// from "S" to "E"). If not, return false.
Graph.prototype.isSolvable = function(){
  return this.searchBFS()? true : false;
}
