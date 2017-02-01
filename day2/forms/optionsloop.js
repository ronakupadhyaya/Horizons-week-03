var months = [];
var days = [];
var years = [];
for (var i=1;i<13;i++) {
  months.push(i);
}

function appendMonth () {
  $.each(months, function(i,month) {
  $('#dobmonth').append($('<option>', {
    value: months[i],
    text: months[i]
  }
)
)})
};
appendMonth();
