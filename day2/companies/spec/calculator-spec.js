#!javascript

var app = require("../app");
const csvFilePath='investments1.csv'
var investmentCalc = require("../functions");

describe("Functions: ", function () {

  it("Find the company that has the largest amount of money invested", function () {
    var data = app.fileReader(csvFilePath);
    var parsedData = app.parser(data);
    var asd  = investmentCalc.largestInvestment(parsedData)
    expect(asd).toBe(1100000);
  });

  it("Parser", function () {

  });

  it("Find the average of original investments", function () {
    var data = app.fileReader(csvFilePath);
    var parsedData = app.parser(data);
    var asd  = investmentCalc.averageOriginalInvestment(parsedData)
    expect(asd).toBe(242111.11111111112);
  });

});
