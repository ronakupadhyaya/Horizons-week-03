$(document).ready(function(){
  $('#send-contribution').on('click', function(event){
    event.preventDefault();
    var name = $("#nameText").val();
    var amount = $("#amountText").val();
    $.ajax({
      url:'/api/project/' + $(this).attr('data-project-id') + '/contribution',
      method:'post',
      data: {
         name: name,
         amount: amount
      },
      success: function(res){
        console.log(res);
        $('#form')[0].reset();
        var name2 = res.contributions[res.contributions.length-1].name;
        var amount2= res.contributions[res.contributions.length-1].amount;
        console.log(name2, amount2);
        $("#contributions").append(name2 +":"+ amount2);
      }
    })
  })

})
