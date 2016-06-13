var jsonfile = require('jsonfile')
var file = 'data.json'
var data = jsonfile.readFileSync(file)
var assert = require('chai').assert;


describe('homepage', function(){
  it('should be true',function(){
      assert.equal(true, true)
    })
  })
