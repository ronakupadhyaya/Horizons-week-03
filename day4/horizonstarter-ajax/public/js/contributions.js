$(document).ready(function() {

setInterval(function() {
  var id = $('#id').attr('idReal');
  $.ajax({
    url: '/api/project/' + id + '/contribution',
    method: 'get',
    error: function(err) {
      console.log("got an error", err);
      showFlashMessage('An error occurred', 'danger');
    },
    success: function(res) {
      console.log(res.total);
      $('#total').text('Total Contributions: '+res.total);
      $('#contributionList').empty();
      for(var i=0; i<res.contributions.length; i++) {
        var name = res.contributions[i].name;
        var amount = res.contributions[i].amount;
        $('#contributionList').append(`<li> Name: ${name}, Amount: ${amount}</li>`);
      }
    }
  })
}, 5000);

$('#send-contribution').on('click', function(event) {
  event.preventDefault();
  sendContribution();
})

function sendContribution() {
  var id = $('#id').attr('idReal');
  var name = $('#contributorName').val();
  var amount = $('#amount').val();
  if (isNaN(amount) || (amount <= 0)) {
    showFlashMessage('You need to input a number for amount', 'danger');
    return;
  }
  if (!name || name.trim().length === 0) {
    showFlashMessage('You need to put an ACTUAL name', 'danger');
    return;
  }
  $.ajax({
    url: '/api/project/' + id + '/contribution',
    method: 'post',
    data: {
      name: name,
      amount: amount,
    },
    error: function(err) {
      console.log("got an error", err);
      showFlashMessage('An error occurred', 'danger');
    },
    success: function(res) {
      console.log(res.total);
      $('#total').text('Total Contributions: '+res.total);
      $('#contributionList').append(`<li> Name: ${res.name}, Amount: ${res.amount}</li>`);
      showFlashMessage('Thanks for your contribution! You rock!', 'success');
    }
  })
}

function showFlashMessage(message, type) {
  $('#notification').append(`<div class="alert alert-${type} alert-dismissable">
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>${message}</strong>
</div>`)
}

})
