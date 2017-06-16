var sendContribution = function() {
  var projectid = $("h3").attr("id");

  $.ajax({
    url: `/api/project/${projectid}/contribution`,
    method: 'POST',
    data: {
      name: $("#name").val(),
      amount: $("#amount").val()
    },
    success: function(res) {
      var newContribution = {
        name: $("#name").val(),
        amount: $("#amount").val()
      };
      var amt = $("#amount").val();
      renderNewContribution(newContribution);
      //reset values of name and amount
      $("#name").val('');
      $("#amount").val('');

      console.log("success", res)
      showFlashMessage('Thank you for your contribution!', 'success');
      var finalAmount = parseInt($('#contribution').text()) + parseInt(amt);
      $('#contribution').text(finalAmount);
    },
    error: function(err) {
      console.log('failure', err);
      $("#name").val('');
      $("#amount").val('');
      showFlashMessage(err.responseJSON[0].msg, 'danger');
    }
  })
};

function showFlashMessage(msg, type) {
  $('.contribution-message').html(`<div class="alert alert-${type}"><strong>${msg}</strong></div>`);
};

function renderNewContribution(newContribution) {
  var contributionHTML = `<div class="contribution">
    Name: ${newContribution.name}<br>
    Amount: $${newContribution.amount}<br><br>
  </div>`;
  $('#list-of-contributions').append(contributionHTML);
  console.log('rendered!');
}



$(document).ready(function() {

  $('#send-contribution').on('click', function(event) {
    event.preventDefault();
    sendContribution();
  })



})
