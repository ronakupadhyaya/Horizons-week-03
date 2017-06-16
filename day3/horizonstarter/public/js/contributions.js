$(document).ready(function(){

  $('#send-contribution').click(function(event){
    event.preventDefault();
  var name = $('#contributionName').val();
  var amount = $('#contributionAmount').val();

  $.ajax({
    url:'/api/project/' + $(this).attr('data-project-id') + '/contribution',
    method:'post',
    data:{
      name:name,
      amount:amount
    },
    success:function(res){
      console.log(res);
      $('#form')[0].reset();
      var name2 = `Name: `+res.contributions[res.contributions.length-1].name;
      var amount2= `, Amount: `+res.contributions[res.contributions.length-1].amount;
      $('#contribution').append(name2+amount2)
    },
    error:function(res){
      console.log(res.responseText);
    }
  })
});







}) //end of document
