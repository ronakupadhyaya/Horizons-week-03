# Pair Programming Exercise

## Goal

The goal of this exercise is to familiarize yourself with the command line and
node.js debugging.

## Instructions

1. Install `node-inspector`

  ```bash
  npm install --global node-inspector
  ```
  
1. Open this directory in your terminal and install npm dependencies:

Note: debugging is a folder in the Horizons week03/ directory

  ```
  cd /path/to/debugging/ 
  npm install
  ```

1. Run tests and note that they are failing:

  ```bash
  npm test
  ```

1. Run your code in the debugger to find out what's wrong:

  ```bash
  node-debug debugging.js
  ```

1. Repeat until tests are passing!
