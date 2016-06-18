"use strict";
// -----------------------------
//   TRY NOT TO LOOK AT THESE
// -----------------------------

var solvableMazes = [];
solvableMazes.push([["S", "E"]]);
solvableMazes.push([["S"],
["E"]]);
solvableMazes.push([["X", "S", "E", "X"]]);
solvableMazes.push([["S", "X"],
["E", "X"]]);

solvableMazes.push([["X", "S", " ", " ", " ", " ", " "],
[" ", "X", " ", " ", " ", " ", " "],
[" ", " ", "X", " ", " ", " ", "E"],
[" ", " ", " ", "X", " ", " ", " "]]);

solvableMazes.push([[" ", "S", " ", "X", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", "X", " ", " ", "E"],
[" ", " ", " ", "X", " ", " ", " "]]);

solvableMazes.push([[" ", "E", " ", "X", " ", " ", " "],
[" ", " ", " ", " ", " ", " ", " "],
[" ", " ", " ", "X", " ", " ", "S"],
[" ", " ", " ", "X", " ", " ", " "]]);

var unsolvableMazes = [];
unsolvableMazes.push([["S", "X", "E"]]);
unsolvableMazes.push([["S"],
["X"],
["E"]]);
unsolvableMazes.push([["S", "X"],
["X", " "],
["E", " "]]);
unsolvableMazes.push([["X", " ", " ", " ", " ", " ", " "],
[" ", "X", " ", " ", " ", " ", " "],
["S", " ", "X", " ", " ", " ", "E"],
[" ", " ", " ", "X", " ", " ", " "]]);

unsolvableMazes.push([[" ", "S", " ", "X", " ", " ", " "],
[" ", " ", " ", " ", "X", " ", " "],
[" ", " ", " ", "X", " ", " ", "E"],
[" ", " ", " ", "X", " ", " ", " "]]);

unsolvableMazes.push([[" ", "E", " ", "X", " ", " ", " "],
[" ", " ", " ", " ", "X", " ", " "],
[" ", " ", " ", "X", " ", " ", "S"],
[" ", " ", " ", "X", " ", " ", " "]]);

var onePathMazes = [];
onePathMazes.push([["X", "S", "X", " ", " ", " ", " "],
[" ", " ", "X", " ", "X", "X", " "],
[" ", "X", "X", " ", "X", " ", "E"],
[" ", " ", " ", " ", "X", " ", " "]]);
onePathMazes.push([["X", "S", " ", " ", "X", " ", " "],
[" ", " ", "X", " ", "X", "X", " "],
[" ", "X", "X", " ", "X", " ", "E"],
[" ", " ", "X", " ", " ", " ", "X"]]);

var allMazes = solvableMazes.concat(unsolvableMazes);

describe("Maze.isSolvable()", function() {

  solvableMazes.forEach(function(maze) {
    var m = new Graph(maze);
    it("Maze should be solvable: " + JSON.stringify(maze), function() {
      expect(m.isSolvable()).toBe(true);
    });
  });

  unsolvableMazes.forEach(function(maze) {
    var m = new Graph(maze);
    it("Maze should not be solvable: " + JSON.stringify(maze), function() {
      expect(m.isSolvable()).toBe(false);
    });
  });

  it("Should return correct path, with DFS & BFS if there is only one path", function() {
    var m = new Graph(onePathMazes[0]);
    expect(m.searchDFS()).toEqual([2, 9, 8, 15, 22, 23, 24, 25, 18, 11, 4, 5, 6, 7, 14, 21]);
    expect(m.searchBFS()).toEqual([2, 9, 8, 15, 22, 23, 24, 25, 18, 11, 4, 5, 6, 7, 14, 21]);
    m = new Graph(onePathMazes[1]);
    expect(m.searchDFS()).toEqual([2, 3, 4, 11, 18, 25, 26, 27, 20, 21]);
    expect(m.searchBFS()).toEqual([2, 3, 4, 11, 18, 25, 26, 27, 20, 21]);
});
})
