$(document).ready(function(){
  function createHtmlString(project){
    var newHtml = `
    <h3> <a href="/project/` + project._id + `">`+ project.title +`</a></h3>
    <img width=300 src="`+ project.img_url +`"></img>`;
    return newHtml;
  }

  function displayProjects(resp){
    $('.projectDisplay').empty();
    var projects = resp.projects;
    for(var i =0; i < projects.length;i++){
      var newProjectHtml = createHtmlString(projects[i]);
      $('.projectDisplay').append(newProjectHtml);
    }
  }
  var fundSort = false;
  var fundQuery = ''
  $('#funded a').click(function(e){
    $.ajax({
      url: '/api/projects?funded=true',
      success: function(resp){
        displayProjects(resp);
        fundSort = true;
        fundQuery="funded=true"
      },
      error: function(err){

      }
    })
  });

  $('#not-funded a').click(function(e){
    $.ajax({
      url: '/api/projects?funded=false',
      success: function(resp){
        displayProjects(resp);
        fundSort = true;
        fundQuery = 'funded=false';
      },
      error: function(err){

      }
    })
  });

  $('#all a').click(function(e){
    $.ajax({
      url: '/api/projects',
      success: function(resp){
        displayProjects(resp);
        fundSort = false;
      },
      error: function(err){
        throw(err);
      }
    })
  });

  $('#amount-funded a').click(function(e){
    if(fundSort){
      $.ajax({
        url: '/api/projects?' + fundQuery +'&sort=amountFunded',
        success: function(resp){
          displayProjects(resp);
        }
      })
    } else{
      $.ajax({
        url: '/api/projects?sort=amountFunded',
        success: function(resp){
          displayProjects(resp);
        }
      })
    }
  });

  $('#percentage-funded a').click(function(e){
    if(fundSort){
      $.ajax({
        url: '/api/projects?' + fundQuery +'&sort=percentageFunded',
        success: function(resp){
          displayProjects(resp);
        }
      })
    } else{
      $.ajax({
        url: '/api/projects?sort=percentageFunded',
        success: function(resp){
          displayProjects(resp);
        }
      })
    }
  });
  $('#percentage-funded-descending a').click(function(e){
    if(fundSort){
      $.ajax({
        url: '/api/projects?' + fundQuery +'&sort=percentageFunded&sortDirection=descending',
        success: function(resp){
          displayProjects(resp);
        }
      })
    } else{
      $.ajax({
        url: '/api/projects?sort=percentageFunded&sortDirection=descending',
        success: function(resp){
          displayProjects(resp);
        }
      })
    }
  });
  $('#amount-funded-descending a').click(function(e){
    if(fundSort){
      $.ajax({
        url: '/api/projects?' + fundQuery +'&sort=amountFunded&sortDirection=descending',
        success: function(resp){
          displayProjects(resp);
        }
      })
    } else{
      $.ajax({
        url: '/api/projects?sort=amountFunded&sortDirection=descending',
        success: function(resp){
          displayProjects(resp);
        }
      })
    }
  });

  $('#searchProject').click(function(e){
    e.preventDefault();
    var query = $(this).siblings('.form-group').children('input[name="search"]').val();
    console.log(query);
    $.ajax({
      url: '/posts/search',
      data: {
        search: query
      },
      method: 'get',
      success: function(resp){
        console.log("resp", resp);
        displayProjects(resp);
      }
    })
  })
})
