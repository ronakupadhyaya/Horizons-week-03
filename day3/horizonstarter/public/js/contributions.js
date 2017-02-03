"use strict";

var newContribution

var sendContribution = function() {
  $.ajax({
    url: '/api/project/' + projectId + '/contribution',
    method: 'POST',
    success: function(data) {
      $('#alertBox').empty();
      showFlashMessage("Thanks for your contribution! You rock!", 'success');
      renderNewContribution(newContribution);
    },
    error: function(response) {
      $('#alertBox').empty();
      var error = response.responseJSON
      for (var i = 0; i < error.length; i++) {
        showFlashMessage(error[i].msg, 'danger');
      }
    },
    data: newContribution
  });
};

var renderNewContribution = function(newContribution) {
  var contributionHTML = `<p>${newContribution.name}: ${newContribution.amount}</p>`
  $('#contributorList').append(contributionHTML)
};

var showFlashMessage = function(message, indicator) {
  var htmlTextFlash = `
      <div class="alert alert-${indicator}">
        <strong>${indicator}!</strong> ${message}
      </div>`;
    $('#alertBox').append(htmlTextFlash)
};

$(document).ready(function() {
  $('#send-contribution').click(function() {
    newContribution = {
      name: $('#contributorName').val(),
      amount: $('#contributorAmount').val()
    };
    sendContribution();
  });
});
