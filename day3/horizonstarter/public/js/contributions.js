$(document).ready(function() {
  $("#send-contribution").on('click', function(event){

  sendContribution();
  })
})
function showFlashMessage(text, type){
  var alertText = `<div class="alert alert-${type} alert-dismissable">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    ${text}
                  </div>`
                  console.log(alertText);
    $(".goal").before(alertText);

}
function sendContribution(){
  var name = $("#name_input").val();
  var amount = $("#amount_input").val();
  var newContribution = {
   	name: name,
   	amount: amount
  };

    var url = $(location).attr('href').split('/')
    var id = url[url.length-1]

  $.ajax({
    url: '/api/project/'+id+'/contributions',
    method:"post",
    data:newContribution,
    success:function(res){
      $("#name_input").val("");
      $("#amount_input").val("");
      renderNewContribution(newContribution)
      showFlashMessage("Thanks for your contribution! You rock!", 'success');
    },
    error:function(err){
      showFlashMessage(err.responseText, 'danger');
    }

  })
}
function renderNewContribution(newContribution){
  var text = `<div class="cont-obj">
                <div style="font-size:medium;">
                  ${newContribution.name}
                </div>
                <div>
                  ${newContribution.amount}
                </div>
              </div>`
  $('.cont-container').append(text);
}
