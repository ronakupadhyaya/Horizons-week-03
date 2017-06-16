$("#send-contribution").on("click", function (event) {
  event.preventDefault();
  console.log("im here");
  sendContribution($(this).attr('data-id'));
});

function sendContribution(id) {
  var newContribution = {
    name: $("#forName").val(),
    amount: $("#forAmount").val()
  }

  $.ajax({
    url: "/api/project/" + id + "/contribution",
    method: "POST",
    data: {
      contribution: newContribution,
    },
    success: function (res) {
      var message = `<div class="alert alert-success">
  <strong>Info!</strong> Thanks for your contribution! You rock!
</div>`;
      renderNewContribution(newContribution);
      $("#main").after(message);
      $("#forName").val(" ");
      $("#forAmount").val(" ");
    },
    error: function (res) {

      var x = JSON.parse(res.responseText)[0].msg;

      var message = `<div class="alert alert-danger">
    <strong>Info!</strong> An error occurred ${x}
    </div>`;
      $("#main").after(message);
    }

  });
}


function renderNewContribution(newContribution) {
  var div = `<div class="singal-cont">
  name: ${newContribution.name}
  amount: ${newContribution.amount}
</div>`;
  $(".singal-cont").append(div);

}
