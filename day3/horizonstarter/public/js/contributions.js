$(document).ready();

$("#send-contribution").on('click', function(event) {
  event.preventDefault();
  sendContribution();
});

function sendContribution() {
  var projectid = $("h1").attr("id");
  $.ajax({
    url: `/api/project/${projectid}/contribution`,
    method: 'post',
    data: {
      name: $("#name").val(),
      amount: $("#amount").val()
    },
    success: function(res) {
      //clearing old inputs
      $("#name").val("name");
      $("#amount").val("amount");
      showFlashMessage("Thanks for your contribution!", 'success');
      renderNewContribution(res);
    },
    error: function(err) {
      err.responseJSON.forEach(function(item) {
        showFlashMessage(item.msg, 'danger');
      })
    }
  })
}

function showFlashMessage(msg, type) {
  $("h1").before(`<div class="alert alert-${type}"><strong>${msg}</strong></div>`);
}

function renderNewContribution(newContribution) {
  var contributionHTML = `<div class="cont">
    <p><b>Name:</b> ${newContribution.name} <br>
    <b>Amount:</b> ${newContribution.amount}</p>
  </div>`;
  $(".contributions").append(contributionHTML);
}
