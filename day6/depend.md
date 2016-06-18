# Pair programming exercise: Dependency resolver

As programmers add more and more features to their applications, codebases get very
large and unmanageable. That is why we divide it into modules that contain smaller
blocks of code that is easier to manage. This also increases maintainability and
encourages reusability. If you develop a module that loads tweets from a certain
users, you can easily share it so other people can use in the application.

Managing dependencies, though, is a more complex challenge. Certain modules need
other modules to work correctly. And these modules need other modules and so on,
creating a graph of dependencies, something like this one. Your task is to get a
module or component and list all its dependencies in the correct order.

    A
  ↙  ↘
  B    C
↙   ↘ ↗
E ← D

Here, A depends on B and C. B depends on E and D and so on.

## How does one find the right order of installing the packages?

To find the correct order for installing dependencies, we need to represent the data
on your program. To do this, we'll use Graphs with modules and edges that symbolize
dependencies.

## Exercise files

Files: `week01/day2/depend.js` and `week01/day2/depend.html`
