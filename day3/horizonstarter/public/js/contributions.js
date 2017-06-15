$(function() {

  $("#send-contribution").on("click", function(e) {
    sendContribution();
  });

  function sendContribution() {
    var name = $("#contribution-name").val();
    var amt = $("#contribution-amount").val();
    var new_contribution = {
      name: name,
      amount: amt
    };
    $.ajax("/api" + window.location.pathname + "/contribution", {
      method: "POST",
      data: new_contribution,
      success: function() {
        showFlashMessage("Thank you for your contribution!", "success");
        $("#contribution-name").val("");
        $("#contribution-amount").val("");
        renderNewContribution(new_contribution);
      },
      error: function() {
        showFlashMessage("An error occured while processing your contribution. Please try again.", "danger");
      }
    })
  }

  function showFlashMessage(message, type) {
    var msg = $("<div>").toggleClass("alert")
                        .toggleClass("alert-" + type)
                        .text(message);
    $(".project-name").before(msg);
  }

  function renderNewContribution(new_contribution) {
    var new_listing = $("<li>")
      .toggleClass("contributor-listing")
      .html("<strong>" + new_contribution.name + "</strong> $" + new_contribution.amount);
    $(".contributions ul").append(new_listing);

    var prev_total = parseInt($("#total").text());
    $("#total").text(prev_total + new_contribution.amount);
  }


});
