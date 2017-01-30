#!javascript

var app = require("../app");
const csvFilePath='investments1.csv'
var investmentCalc = require("../functions");

describe("Functions: ", function () {

  it("Parser", function () {

  });

  it("Find the company that has the largest amount of money invested", function () {
    var data = app.fileReader(csvFilePath);
    var parsedData = app.parser(data);
    var asd  = investmentCalc.largestInvestment(parsedData)
    expect(asd).toBe(1100000);
  });

  it("Find the average of original investments", function () {
    var data = app.fileReader(csvFilePath);
    var parsedData = app.parser(data);
    var asd  = investmentCalc.averageOriginalInvestment(parsedData)
    expect(asd).toBe(242111.11111111112);
  });

  it("Get an object containing CompanyIds as keys and the total that was originally invested", function () {
    var data = app.fileReader(csvFilePath);
    var parsedData = app.parser(data);
    var asd  = investmentCalc.totalInvestmentForCompanies(parsedData)
    expect(asd).toEqual(
      {
        1: 595000,
        2: 1024000,
        3: 856000,
        4: 129000,
        5: 10000,
        6: 254000,
        7: 10000,
        8: 86000,
        9: 1100000,
        10: 294000
      }
    );
  });


  it("Get an object containing investorIds as keys and the total they originally invested", function () {
    var data = app.fileReader(csvFilePath);
    var parsedData = app.parser(data);
    var asd  = investmentCalc.totalInvestmentByInvestors(parsedData)
    expect(asd).toEqual(
      {
        1: 1300000,
        2: 590000,
        3 : 1355000,
        4 : 20000,
        5 : 294000,
        6 : 104000,
        7 : 75000,
        8 : 24000,
        9 : 554000,
        10 : 42000
      }
    );
  });



});
