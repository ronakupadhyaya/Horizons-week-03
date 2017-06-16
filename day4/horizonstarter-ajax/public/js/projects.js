var currentPara = ""

$('#funded').on('click',function(event) {
  event.preventDefault();
  currentPara='?funded=true'
  getProjects(currentPara);
});

$('#unfunded').on('click',function(event) {
  event.preventDefault();
  currentPara='?funded=false'
  getProjects(currentPara);
});

$('#showAll').on('click',function(event) {
  event.preventDefault();
  currentPara=""
  getProjects(currentPara);
})

function getProjects(para) {
  $.ajax({
    method:"get",
    url:"/api/projects"+para,
    success:function(res) {
      $('#titleDiv').empty();
      res.projects.forEach(function(proj) {
        var title = $(`<li><a href='/project/${proj.id}'>${proj.title}</a></li>`)
        $('#titleDiv').append(title)
      });
    }
  });
}

$('#sort').on('click',function(event) {
  if (currentPara !== "") {
    currentPara += "&"
  } else {
    currentPara = "?"
  }
  event.preventDefault();
  sortProject();
});

function sortProject(){
  $.ajax({
    method:'get',
    url:'/api/projects'+ currentPara + 'sort=' + $('#sortBy').val() + '&sortDirection=' + $('#order').val(),
    success:function(res) {
      $('#titleDiv').empty();
      res.projects.forEach(function(proj) {
        var title = $(`<li><a href='/project/${proj.id}'>${proj.title}</a></li>`)
        $('#titleDiv').append(title)
      });
    }
  });
}
