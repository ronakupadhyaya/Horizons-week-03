$(document).ready(function() {


  $(".displayButtons").on("click", ".btn", function(e) {
    e.preventDefault();
    alert("hi");
    console.log("hi");
    // var sortType = $("#sortButtons").find(".active").attr("value");
    // var filterType = $("#filterButtons").find(".active").attr("value");
    // $(this).parent().children().removeProp(".active")
    // $(this).attr("class", "active");
    $.ajax({
      url: "/",
      method: "POST",
      error: function(request, error) {
        console.log(arguments);
        alert(" Can't do because: " + error);
      },
      success: function(res) {
        console.log("success")
        console.log(res.errorMessage)
        console.log(res.projects);
        console.log(res.test);
      }
    });
  });
});

    // myAjaxPOST("/", function(res) {
    //   console.log("in ajax");
    //   console.log(res.projects);
    //   var projects = edit(results, sortType, filterType);
    //   $('#activeProjects').clear();
    //   res.forEach(function(item) {
    //
    //     $('#activeProjects').append(`<li class="list-group-item"><a href='/project/${item._id}>${item.title}</a></li>`);
    //   })
    // });

//
//   function edit(arr, sortType, sortDirection, filterType) {
//     var temp = [];
//     for (var i = 0; i < arr.length; i++) {
//       temp[i] = arr[i].toObject();
//     }
//
//     for (var i = 0; i < temp.length; i++) {
//       var x = temp[i].contributions;
//       var sum = 0;
//       for (var j = 0; j < x.length; j++) {
//         sum += x[j].amount;
//       }
//       temp[i]["total"] = sum;
//     }
//     if (sortType === 'descending') {
//       temp.sort(function(a, b) {
//         return b.total - a.total;
//       });
//     } else {
//       temp.sort(function(a, b) {
//         return a.total - b.total;
//       });
//     }
//     return temp;
//   }
//
//   function check(obj) {
//     return obj.total >= obj.goal;
//   }
