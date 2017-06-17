$(document).ready(function() {
  console.log('loaded');
  $('#send-contribution').on('click', function(event) {
    event.preventDefault();
    console.log('this works');
    sendContribution();
  });

  var sendContribution = function() {
    var newContribution = {
   	  name: $('#name').val(),
   	  amount: $('#amount').val()
    };
    $.ajax({
      url: '/api/project/'+ $('#project-id').text() + '/contribution',
      method: "POST",
      data: {
        newContribution: newContribution
      },
      success: function(res) {
        showFlashMessage("Thanks for your contribution! You rock!", 'success');
      },
      error: function(err) {
        showFlashMessage("An error occurred", 'danger');
      }
    });
  };

  var showFlashMessage = function(message, type) {
    var html = `<div class="alert alert-${type}">
    <strong>${message}</strong>
  </div>`
    $('h1').append(html);
  };

})
