$(document).ready(function() {
  function showFlashMessage(msg, style) {
    $('#alert').append(`<div class="alert alert-${style}">
  ${msg}
</div>`);
  }

  function sendContribution() {
    var contributor = $('#contributor').val();
    var amountDonated = parseFloat($('#amount').val());
    var arr = window.location.href.split('/');
    var projectId = arr[arr.length - 1];
    if (projectId.indexOf('?') !== -1) {
      projectId = projectId.substring(0, arr[arr.length - 1].indexOf('?'));
    }
    console.log("Trying to send contribution in the javascript file");
    $.ajax({
      url: '/api/project/' + projectId + '/contribution',
      method: 'post',
      data: {
        name: contributor,
        amount: amountDonated
      },
      success: function(resp) {
        $('#alert').empty();
        $('#contributor').val('');
        $('#amount').val('');
        showFlashMessage("Thanks for your contribution! You rock!", 'success');
        renderNewContribution(contributor, amountDonated);
      },
      error: function(err) {
        $('#alert').empty();
        showFlashMessage(err.responseJSON[0].msg, 'danger');
      }
    });
  }

  function renderNewContribution(contributor, amount) {
    $('#donator-list').append('<li>' + contributor + ', ' + '$' + amount +'</li>');
  }

  $('#send-contribution').on('click', function(evt) {
    evt.preventDefault();
    sendContribution();
  });
});
