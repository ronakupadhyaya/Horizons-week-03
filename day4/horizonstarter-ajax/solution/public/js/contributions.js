"use strict";

var apiUrl = '/api/project/' + projectId + '/contribution';


function renderNewContribution(newContribution) {
  // Construct the new contribution.
  var wrapper = $('<div class="well"></div>');
  var title = $('<h4>' + newContribution.name + ' contributed $' + newContribution.amount + '</h4>');
  wrapper.append(title);

  // Add it to the DOM. Boom.
  $('#contributionsAnchor').append(wrapper);
}

/**
* Sends a contribution object to backend via AJAX. Displays error if not
* successful. Calls next callback on success, logs error otherwise.
*/
function sendContribution(next) {
  // projectId is a global, inserted inside the template.

  var nameField = $('#name');
  var amountField = $('#amount');

  // Construct the new contribution object from the form data.
  var newContribution = {
    name: nameField.val(),
    amount: amountField.val()
  };

  $.ajax(apiUrl, {
    method: "POST",
    data: newContribution,
    success: function(result) {
      console.log("POST successful, got: " + JSON.stringify(result));
      nameField.val('');
      amountField.val('');
      renderNewContribution(newContribution);
      showFlashMessage("Thanks for your contribution! You rock!", 'success');
    },
    error: function(err) {
      showFlashMessage("An error ocurred", 'danger');
      console.error(err);
    }
  });
}

function showFlashMessage(message, status){
  var alert = $('<div class="alert alert-'+status+'">'+message+'</div>');
  $('#alertAnchor').empty();
  $('#alertAnchor').append(alert);
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
    $('#alertAnchor').empty(); // reset alerts
    sendContribution();
  });

  setInterval(pollContributions, 10000);
});
