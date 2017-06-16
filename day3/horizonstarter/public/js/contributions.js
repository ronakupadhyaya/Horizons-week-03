$(document).ready(function() {
  $("#send-contribution").on("click", function(event) {
    event.preventDefault();
    sendContribution();
  })

  var sendContribution = function() {
    var newContribution = {
   	  name: $("#name-input").val(),
   	  amount: parseInt($("#amount-input").val())
    };
    var amount = newContribution.amount;
    $.ajax({
      url: "/api/project/" + $("#get-id").text() + "/contributions",
      method: "POST",
      data: newContribution,
      success: function(res) {
        $("#name-input").val("");
        $("#amount-input").val("");
        renderNewContribution(newContribution);
        showFlashMessage("Thanks for your contribution! You rock!", 'success');
      }, error: function(err) {
        var error = JSON.parse(err.responseText);
        showFlashMessage(error[0].msg, 'danger');
      }
    })
  }

  var showFlashMessage = function(mess, type) {
    if (type === "success") {
      console.log("success");
      $(".header").after(`<div class="alert alert-success">` + mess + `</div>`);
    }
    else if (type === "danger") {
      $(".header").after(`<div class="alert alert-danger">` + mess + `</div>`);
    }
  }

  var renderNewContribution = function(newContribution) {
    $("#add-contr").append("<p>Name: " + newContribution.name + ", Amount: " + newContribution.amount + "</p>");
    $("#list-contr").append("<li>Name: " + newContribution.name + ", Amount: " + newContribution.amount + "</li>");
    var perc = (parseInt($("#tot-contr").text()) + newContribution.amount) / parseInt($("#goal").text()) * 100;
    console.log(perc);
    $("#prog").css({"width": perc + "%"});
    $("#tot-contr").text(parseInt($("#tot-contr").text()) + newContribution.amount);
  }

  var checkNewContribution = function() {
    $.ajax({
      url: "/api/projects",
      method: "GET",
      success: function(data) {
        var array = data.array.filter(function(elem) {
          return elem._id === $("#get-id").text();
        })
        var proj = array[0];
        var contrs = proj.contributions;
        $("#list-contr").empty();
        var sumContr = 0;
        contrs.forEach(function(elem) {
          $("#list-contr").append("<li>Name: " + elem.name + ", Amount: " + elem.amount + "</li>");
          sumContr += parseInt(elem.amount);
        })
        var perc = sumContr / proj.goal * 100;
        $("#prog").css({"width": perc + "%"});
        $("#tot-contr").text(sumContr);
      },
      error: function(err) {
        console.log(err);
      }
    })
  }

  setInterval(checkNewContribution, 5000);

})
