
function sendContribution(){
  $.ajax({
    method: "POST",
    url: window.location.pathname + "/contribution",
    data: {
      "name": $('#nameField').val(),
      "amount": $('#amountField').val()
    },
    success: function(successResponse) {
        console.log(successResponse);
        console.log("we good");
        renderNewContribution(successResponse);
    },
    error: function(errorResponse) {
      console.log(errorResponse);
      console.log("we bad");
    }
  });
};

function renderNewContribution(newContribution) {
  $('#contributionsDiv').append("<p>" + JSON.stringify(newContribution) + "</p>");
};

$(document).ready(function(){
  $('#send-contribution').click(sendContribution);
});
