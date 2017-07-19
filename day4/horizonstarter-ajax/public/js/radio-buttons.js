

$(document).ready(function() {


  $(".btn-group").on('click', "li", function(e) {
    // e.stopPropagation();
    // e.stopImmediatePropagation();
    console.log($("#sortTypeDropdown"));
    console.log($("#sortDirectionDropdown"));
    $(this).parent().parent().attr("value", $(this).prop("id"));
    var sortType = $("#sortTypeDropdown").attr("value");
    var sortDirection = $("#sortDirectionDropdown").attr("value");
    var filterFunded = $("#filterByFunding").attr("value");
    var sortMethod = sortDirection + sortType;
    console.log("sortType", sortType);
    console.log("sortDirection", sortDirection);
    console.log("filterFunding", filterFunded);
    $.ajax({
      url: "/",
      method: "POST",
      data: {
        sortMethod: sortMethod,
        filterFunded: filterFunded
      },
      success: function(projects) {
        $("#activeProjects").empty();
         projects.projects.forEach(function(project) {
           console.log("added");
           $("#activeProjects").append(`<li class="list-group-item"><a href="/project/${project._id}">${project.title}</a></li>`);
         });
      }
    });
  });
});

























//   $(".input-btn-group").on('click', ".btn", function(e) {
//     // e.stopPropagation();
//     e.stopImmediatePropagation();
//     $(this).parent().children().removeClass("active");
//     $(this).addClass("active");
//     var sortType = $("#sortTypeButtons").find(".active").children().attr("value");
//     var sortDirection = $("#sortDirectionButtons").find(".active").children().attr("value");
//     var sortMethod = sortDirection + sortType;
//     var filterFunded = $("#filterByFunding").find(".active").children().attr("value");
//     $.ajax({
//       url: "/",
//       method: "POST",
//       data: {
//         sortMethod: sortMethod,
//         filterFunded: filterFunded
//       },
//       success: function(projects) {
//         $("#activeProjects").empty();
//          projects.projects.forEach(function(project) {
//            $("#activeProjects").append(`<li class="list-group-item"><a href="/project/${project._id}">${project.title}</a></li>`);
//          });
//       }
//     });
//   });
// });
