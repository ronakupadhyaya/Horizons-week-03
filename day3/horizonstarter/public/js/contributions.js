


$("#send-contribution").on("click", function(event) {
  event.preventDefault();
  var name = $("#name").val();
  var number = $("#contribution").val();

  $.ajax({
    url: '/api' + window.location.pathname + '/contribution',
    method: 'POST',
    data: {
      name: name,
      contribution: number
    },
    success: function(data) {
      showFlashMessage("Thanks for your contribution! You rock!", 'success');
      renderNewContribution(data);
    },
    error: function(data) {
      showFlashMessage("An error occurred", 'danger')
    }
  })
});

function showFlashMessage(message, type) {
  if (type === 'success') {
    var notif = `<div class="alert alert-success">
                    <strong>Success!</strong> ${message}.
                 </div>`
    $(".notification").append(notif);
  } else if (type === 'danger') {
    var notif = `<div class="alert alert-danger">
                    <strong>Danger!</strong> ${message}.
                 </div>`
    $(".notification").append(notif);
  }
}

function renderNewContribution(data) {
  var block = `<li>Contributor: ${data.contribution.name} | Amount: ${data.contribution.amount}</li>`
  $('#contribution-list').append(block);
}
