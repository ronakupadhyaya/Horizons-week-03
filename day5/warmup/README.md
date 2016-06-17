# Week 3 Day 5: Warmup exercise

## Time limit: 15 minutes

## Instructions

In this exercise we're going to build a simple counter using HTML forms and express.

Our server uses a simple variable `count` to keep count.

1. Implement the `POST /increment` endpoint (aka route). This route should:
  1. Increase `count` by one
  1. Redirect to `/`
1. Run your server and click on the `Increase` button, the count should go up.
1. Implement the `POST /decrement` endpoint (aka route). This route should:
  1. Decrease `count` by one
  1. Redirect to `/`
1. Add a form to `views/index.hbs` that contains a single button that
  1. `POST`s to `/decrement` when clicked
  1. Has the label `Decrease`
