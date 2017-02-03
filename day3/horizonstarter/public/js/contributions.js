$('#send-contribution').on('click', function(e) {
  e.preventDefault();
  var newContribution = {
    'name': $('.contribution-text').val(),
    'amount': $('.contribution-amount').val()
  };
  var projectId = $('.project-id').text();

  sendContribution(newContribution, projectId);
});

var sendContribution = function(contribution, projectId) {
  $.ajax('/api/project/' + projectId + '/contribution', {
    type: 'POST',
    data: contribution,
    success: function(data) {
      console.log("success", data);
      handleSuccess(data);
    }, error: function(error) {
      console.log("error" , error);
      handleError(error);
    }
  });
};

var showFlashMessage = function(isSuccess, message) {
  $('.alert').removeClass('hidden');

  if (isSuccess) {
    $('.alert').addClass('alert-success');
  } else {
    $('.alert').addClass('alert-danger');
  }

  $('.alert').text(message);
};

var handleSuccess = function(data) {
  // clear inputs
  $('.contribution-text').val('');
  $('.contribution-amount').val('');

  renderNewContribution(data);

  // show flashmessage
  showFlashMessage(true, 'Added new Contribution');
};

var handleError = function(error) {
  // show flashmessage
  var responseText = JSON.parse(error.responseText);
  showFlashMessage(false, responseText.message);
};

var renderNewContribution = function(newContribution) {
  var contributionHtml = $('<div><b>' + newContribution.name + ':</b> $' + newContribution.amount + '</div>');
  $('.contributions').append(contributionHtml);
};
