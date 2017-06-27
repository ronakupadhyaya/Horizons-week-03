// 6/26 notes
callbacks:
setTimeout, setInterval
event handlers
ajax success/error functions

fixes: .bind()

setTimeout(function() {
  console.log(this.data)
}.bind(this))

fixes:  var self = this

var self = this
setTimeout(function() {
  console.log(self.data)
})

//node

allows you to run js outside browser

module exports: see app.js, my_math.js
