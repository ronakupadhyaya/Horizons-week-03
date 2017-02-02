"use strict";

var apiUrl = '/api/project/' + projectId + '/contribution';



function renderNewContribution(newContribution, doAlert) {
  // Construct the new contribution.
  var wrapper = $('<div class="well"></div>');
  var title = $('<h4>' + newContribution.name + ' contributed $' + newContribution.amount + '</h4>');
  wrapper.append(title);

  // Add it to the DOM. Boom.
  $('#contributionsAnchor').append(wrapper);

  // Add the success alert.
  if (doAlert) {
    var alert = $('<div class="alert alert-success">Thanks for your contribution! You rock!</div>');
    $('#alertAnchor').empty();
    $('#alertAnchor').append(alert);
  }
}

/**
* Sends a contribution object to backend via AJAX. Displays error if not
* successful. Calls next callback on success, logs error otherwise.
*/
function sendContribution(newContribution, next) {
  // projectId is a global, inserted inside the template.
  $.ajax(apiUrl, {
    method: "POST",
    data: newContribution,
    success: function(result) {
      console.log("POST successful, got: " + JSON.stringify(result));
      next(result);
    },
    error: function(err) {
      alert('An unknown error occurred. Please try your request again later.');
      console.error(err);
    }
  });
}

/**
* Reads new contribution from form, sends it to backend and, if successful,
* renders it to the DOM. Performs only basic validation.
*/
function newContribution() {

  var nameField = $('#name');
  var amountField = $('#amount');
  var nameGroup = $('#name-group');
  var amountGroup = $('#amount-group');
  var nameLabel = $('#name-label');
  var amountLabel = $('#amount-label');
  // Clear existing errors
  $('.form-group').removeClass('has-error');
  $('.control-label').text('');

  // Construct the new contribution object from the form data.
  var newContribution = {
    name: nameField.val(),
    amount: amountField.val()
  };
  // Call sendContribution to make the AJAX call, and pass a callback to
  // display the new contribution locally.
  sendContribution(newContribution, function() {
    console.log("AJAX send successful, mounting new contribution in DOM");
    // Clear form
    nameField.val('');
    amountField.val('');
    // Mount new
    renderNewContribution(newContribution, true);
  });
}

/**
* Poll for new contributions via AJAX and update dynamically.
*/
function pollContributions() {
  $.ajax(apiUrl, {
    success: function(data) {
      console.log("Successfully received " + data.length + " data elements.");

      // Ideally we should show an animated wait icon here or something, but in
      // practice this will happen really fast so it's no big deal.

      // Clear existing data.
      $('#contributionsAnchor').empty();

      // Render new data.
      data.forEach(function (el) {
        renderNewContribution(el);
      });
    },
    error: function(err) {
      // No need to alert user actively
      console.error(err);
    }
  });
}


$(function() {
  // Listener for submitting a contribution.
  $('#submit').click(function(event) {
    event.preventDefault();
    newContribution();
  });

  setInterval(pollContributions, 10000);
});
