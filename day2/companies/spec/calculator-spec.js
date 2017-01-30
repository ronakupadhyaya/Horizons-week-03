#!javascript

var app = require("../app");
const csvFilePath='investments1.csv'
var investmentCalc = require("../functions");

describe("multiplication", function () {


  it("Find the company that has the largest amount of money invested", function () {
    var data = app.fileReader(csvFilePath);
     var asd  = investmentCalc.mostInvestedCompany(data)
    console.log(asd);
  //  var product = calculator.multiply(2, 3);
    expect(asd).toBe(1100000);
  });
});
