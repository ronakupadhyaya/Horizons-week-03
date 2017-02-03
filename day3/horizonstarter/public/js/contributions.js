function showFlashMessage(message, value){
  $([
    '<div class="alert alert-'+ value+'>', message,'</div>'].join("\n"))
  }

function sendContribution(){
  var newContribution = {
    name: $('input[name=name]').val(),
    amount: $('input[name=amount]').val()
  }
  // $('.project-id') css selector to grab project id
  $.ajax({
    url: '/api/project/' + projectId + '/contribution',
    method: 'POST',
    success: function(data){
      console.log(data);
      showFlashMessage("Thanks for your contribution! You rock!", 'success');
      if(newContribution.amount > 0 && typeof newContribution.amount === 'number'){
        renderNewContribution(newContribution);
        $('input[name=name]').val('');
        $('input[name=amount]').val('');
      } else{
        console.log("you fucked up son")
      }
    },
    error : function(){
      showFlashMessage("An error ocurred", 'danger');
    },
    data: newContribution
  });
}

$('#send-contribution').on('click', function(e){
  e.preventDefault();
  sendContribution();
});

function renderNewContribution(newContribution){
  var contributionHTML = $(['<div>', 'Name: ' + newContribution.name,'</div>', '<div>',
  'Amount: ' + newContribution.amount,'</div>'].join("\n"));
  $('#projectContributions').append(contributionHTML);
}
