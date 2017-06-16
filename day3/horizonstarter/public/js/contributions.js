$('#send-contribution').on('click', function(){
  sendcontribution();
})

function sendcontribution (){
  var name = $('#nameInput')
  var amount = $('#amountInput')
  var newContribution = {
    name: name,
    amount: amount
  };
}

$.ajax({
  url: '/api/project/:projectId/contribution',
  method: 'post',
  success: function(res){
    
  }
})
