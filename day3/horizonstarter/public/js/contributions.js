$(document).ready(function() {
  $('#send-contribution').on('click', function(event){
    event.preventDefault();
    sendContribution();
  })
  function sendContribution() {
    var newContribution = {
      name: $('#contributor').val(),
      amount: $('#amount').val()
    }
    var id = $('h1').attr('id');
    $.ajax({
      url: '/api/project/' + id + '/contribution',
      method: 'post',
      data: {
        amount: newContribution.amount,
        name: newContribution.name
      },
      success: function(response) {
        //console.log(response);
        $('#contributor').val('');
        $('#amount').val('');
        showFlashMessage('Congratulations! You rock', 'success');
        renderNewContribution(newContribution);
      },
      error: function(response) {
        $('.header').after('<p style="color: red; font-size: 20px">' + response.responseText + '</p>');
      }
    })
  }
  function showFlashMessage(msg, type) {
    $('.header').after().html($(`<div class="alert alert-${type}">${msg}</div>`))
  }
  function renderNewContribution(newContribution) {
    var contributionHTML = $(`<p><strong>Contributor</strong>: ${newContribution.name}
      <strong>Amount</strong>: ${newContribution.amount}</p>`)
    $('.all').append(contributionHTML);
  }
})
