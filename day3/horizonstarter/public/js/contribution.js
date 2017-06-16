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
      console.log("succc", res)
      $('#name').val(res.name);
      $('#amount').val(res.name);
      showFlashMessage('Thank you for your contribution!', 'success');
      var amount = parseInt($('#contribution').text()) + parseInt(res.cont.amount);
      var data = res.cont.name;
      $('#contribution').text(amount);
      $('#contributors').append(data)
    },
    error: function(err) {
      console.log('failure', err);
      showFlashMessage('An error occured!', 'danger!');
    }
  })
};

function showFlashMessage(msg, type) {
  $("h3").before(`<div class="alert alert-${type}"><strong>${msg}</strong></div>`);
};

$(document).ready(function() {
  $('#send-contribution').on('click', function(event) {
    event.preventDefault();
    sendContribution();
  })

})
