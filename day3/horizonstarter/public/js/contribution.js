$(document).ready(function(){

  // send Contribution
  function sendContribution(){

    var name = $('#name').val();
    var amount = $('#amount').val();
    var newContribution = {
      name: name,
      amount: amount
    };

    var id = $('#single-project').attr('project-id');

    $.ajax({
      url: `http://localhost:3000/api/project/${id}/contribution`,
      method: "post",
      data: newContribution,
      success: function(res){
        console.log('success');
        showFlashMessage('Thanks for donating!', 'success');
        renderNewContribution(newContribution);
        // clear contribution form
        $('form').remove();
      },
      error: function(err){
        console.log('error', err);
        console.log(typeof err.responseText);
        showFlashMessage('Sorry, something went wrong: ' + err.responseText, 'danger');
      }
    });

  }

  function renderNewContribution(newContribution){
    var contributionHTML = $('<p>');
    contributionHTML.text(`Contributor: ${newContribution.name}, Amount: ${newContribution.amount}`);
    $('#contributers').append(contributionHTML);
  }


  function showFlashMessage(msg, state){
    var top = $(`<div class="alert"> </div>`);
    if(state === 'success'){
      top.addClass('alert-success');
    }
    if(state === 'danger'){
      top.addClass('alert-danger');
    }
    top.text(msg);
    $('#success-warning').empty();
    $('#success-warning').append(top);
  }


$('#temp').on('click', function(event){
  event.preventDefault();
  sendContribution();
});

});
