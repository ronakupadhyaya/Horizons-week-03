$('#send-contribution').on('click',function(event){
  event.preventDefault();
  var newContribution={
    name:$('#name').val(),
    amount:$('#amount').val()
  }
  $.ajax({
    url:'/api/project/' + $(this).attr('data-id') +'/contribution',
    method: 'post',
    data:{
        contribution:newContribution
    },
    success:function(res){
      var div=  `<div class="alert alert-success">
                <strong>Success!</strong> Thanks.
                </div>`;
      $('h1').after(div);
    $('#myForm').find('#name').val('');
    $('#myForm').find('#amount').val('');
    var obj=`<span>Name: ${res.name} --- Amount: ${res.amount}</span>`
    $('.contribution').append(obj)
    },
    error:function(res){
      console.log('error',res);
      var div;
      if(res[0].msg==='Amount should be greater than zero.'){
        div=`<div class="alert alert-warning">
                  <strong>Error!</strong> Value cant be zero.
                  </div>`
      }
      else{div=  `<div class="alert alert-warning">
                <strong>Error!</strong> Danger.
                </div>`;}
      $('h1').after(div);
      $('#myForm').find('#name').val('');
      $('#myForm').find('#amount').val('');
    }
  })

})
