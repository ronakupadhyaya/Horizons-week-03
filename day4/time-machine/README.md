# Week 3 Day 4: Inline exercise: Time machine

## Instructions

In this exercise we're going to build a simple form that allows you to
add or subtract days, months or years from a given date

1. Open `app.js` and `views/index.hbs` in your editor.
1. Make the `<input type="date">`
  1. Pass
  1. Increase `count` by one
  1. Redirect to `/`
1. Run your server and click on the `Increase` button, the count should go up.
1. Implement the `POST /decrement` endpoint (aka route). This route should:
  1. Decrease `count` by one
  1. Redirect to `/`
1. Add a form to `views/index.hbs` that contains a single button that
  1. `POST`s to `/decrement` when clicked
  1. Has the label `Decrease`
