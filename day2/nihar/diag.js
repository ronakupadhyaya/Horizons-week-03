
$(document).ready(function() {
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      $("#outer").append('<div class="red circle"></div>');
    }
  }

  $("#outer").on("click", ".circle", function() {
    console.log("hi")
    $(this).attr("class", "blue circle")
    var chil = $(this).parent().children();
    var index;
    for (var i = 0; i < chil.length; i++) {
      console.log();
      if ($(chil[i]).attr("class") === "blue circle") {
        index = i;
      }
    }
    console.log(index);
    for (var j = 0; j < chil.length; j++) {
      var $callOn = $(chil[j]);
      $callOn.attr("class", "blue circle");
    }
  })
})
