$(document).ready(function(){};

$("#send-contribution").on('click', sendContribution())

function sendContribution(){
  var name=$('#name-contribution');
  var contribution=$('#amount-contribution');

  var newContribution={
    name: name,
    amount:contribution
  }
  $.ajax({
    url: '/api/project/:projectId/contribution',
    method: 'POST'
    data: newContribution
  },
    success: function(contribution){

    }
  )



  showFlashMessage()


function showFlashMessage(){
  var alert="";

  
  $('body').prepend()
}
