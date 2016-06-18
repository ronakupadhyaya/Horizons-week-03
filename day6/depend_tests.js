"use strict";

describe("Test installing on dependency manager", function() {
  var tracker;
  beforeEach(function() {
    //set basic dependencies
    tracker = new Tracker();
    tracker.depend('a', 'b')
    tracker.depend('a', 'd')
    tracker.depend('b', 'c')
    tracker.depend('b', 'e')
    tracker.depend('c', 'd')
    tracker.depend('c', 'e')
    tracker.depend('x', 'z')
  });

  it("should install element without dependendencies", function() {
    tracker.install('w');
    expect(tracker.getUserInstalled()).toEqual(['w']);
    expect(tracker.getAllInstalledComponents()).toEqual(['w']);
  });

  it("should install element with a dependendency", function() {
    tracker.install('x');
    expect(tracker.getUserInstalled()).toEqual(['x']);
    expect(tracker.getAllInstalledComponents()).toEqual(['z', 'x']);
  });

  it("Should install element with more than one dependent.", function() {
    tracker.install('c');
    expect(tracker.getAllInstalledComponents()).toEqual(['d', 'e', 'c']);
  });

  it("Should install with complex tree", function() {
    tracker.install('a');
    expect(tracker.getAllInstalledComponents()).toEqual(["d", "e", "c", "b", "a"]);
  });
  it("Should raise an exception when adding circular dependencies", function() {
    tracker.depend('e', 'c')
    expect( function(){
      tracker.install('e')
    }).toThrow(new Error('Circular dependency Error'));
  });
});

describe("Test uninstalling on dependency manager", function() {
  var tracker;
  beforeEach(function() {
    //set basic dependencies
    tracker = new Tracker();
    tracker.depend('a', 'b')
    tracker.depend('a', 'd')
    tracker.depend('b', 'c')
    tracker.depend('b', 'e')
    tracker.depend('c', 'd')
    tracker.depend('c', 'e')
    tracker.depend('x', 'z')
  });

  it("should uninstall element without dependendencies", function() {
    tracker.install('w');
    tracker.uninstall('w');
    expect(tracker.getAllInstalledComponents()).toEqual([]);
    expect(tracker.getUserInstalled()).toEqual([]);
  });

  it("should uninstall element with a dependendency", function() {
    tracker.install('x');
    tracker.uninstall('x');
    expect(tracker.getAllInstalledComponents()).toEqual([]);
    expect(tracker.getUserInstalled()).toEqual([]);
  });

  it("Should only uninstall installed components, not dependencies of others", function() {
    tracker.install('a');
    tracker.install('c');
    tracker.uninstall('a');
    expect(tracker.getUserInstalled()).toEqual(['c']);
    expect(tracker.getAllInstalledComponents()).toEqual(['d', 'e', 'c']);
  });

  it("Should raise an exception when uninstalling components that aren't installed", function() {
    tracker.install('a');
    expect(function(){
      tracker.uninstall('c')
    }).toThrow(new Error('Component not installed Error'));
  });
});
