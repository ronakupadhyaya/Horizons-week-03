$('#send-contribution').on('click',function(event){
  sendContribution();
})

function sendContribution(){
  var name = $('#send-contribution').closest('form').find('.name-class');
  var amount = $('#send-contribution').closest('form').find('.amount-class');
  var newContribution = {
 	name: name,// value you get from the form.
 	amount: amount// value you get from the form.
 };
 $.ajax()
}
