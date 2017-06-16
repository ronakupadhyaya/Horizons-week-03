// $('#funded-true').on('click',function(event){
//   event.preventDefault();
//   ajaxcall(true);
// })
// $('#funded-false').on('click',function(event){
//   event.preventDefault();
//   ajaxcall(false);
// })
// $('#all').on('click',function(event){
//   event.preventDefault();
//   ajaxcall('all');
// })


function ajaxcall(fund,sort,order){
  var reqUrl='/api/projects';
  if(fund!=='Nothing'){
    if(fund==='Funded'){
      reqUrl=reqUrl+'?funded=true';
    }else{
      reqUrl=reqUrl+'?funded=false';
      if(sort!=='Normal'){
        if(sort==='Amount Funded'){
          reqUrl=reqUrl+'&sort=amountFunded';
          if(order!='Ascending'){
            reqUrl=reqUrl+'&sortDirection=descending'
          }
        }
        else{reqUrl=reqUrl+'&sort=percentageFunded';
        if(order!='Ascending'){
          reqUrl=reqUrl+'&sortDirection=descending';
        }}
      }
    }
  }
  $.ajax({
    url:reqUrl,
    success:function(res){
      $('.projectlist').empty();
      res.forEach(function(item){
        var pro=`Title:${item.title}</br>
          Goal:${item.goal}</br>
          Start:${item.start}</br>
          End:${item.end}</br>
          Category:${item.category}</br>
          <a href='/project/${this._id}'>View</a></br></br>`
        $('.projectlist').append(pro)
      })
    }
  })
}

$('#main-button').on('click',function(event){

  event.preventDefault();
    console.log('HERE');
  var fundValue=$('#fundValue').val();
  console.log(fundValue);
  var sortValue=$('#sortValue').val();
  console.log(sortValue);
  var order=$('#order').val();
  console.log(order);
  ajaxcall(fundValue,sortValue,order);
})
