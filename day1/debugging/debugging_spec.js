var replaceAll = require('./debugging');

describe("replaceAll()", function() {
  it("replaceAll('', 'a', 'b') -> ''", function() {
    expect(replaceAll('', 'a', 'b') ).toBe('');
  });
  it("replaceAll('aaaax', 'a', 'b') -> 'bbbbx'", function() {
    expect(replaceAll('aaaax', 'a', 'b') ).toBe('bbbbx');
  });
  it("replaceAll('bbbb', 'a', 'b') -> 'bbbb'", function() {
    expect(replaceAll('bbbb', 'a', 'b') ).toBe('bbbb');
  });
  it("replaceAll('x aa b x', 'a', 'b') -> 'x bb b x'", function() {
    expect(replaceAll('x aa b x', 'a', 'b') ).toBe('x bb b x');
  });
});
