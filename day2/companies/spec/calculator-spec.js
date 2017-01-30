#!javascript

var app = require("../app");
const csvFilePath='investments1.csv'
var investmentCalc = require("../functions");

describe("Functions: ", function () {

  it("Should convert originalInvestment and valueToday to numbers for each investment", function () {
    var data = app.fileReader(csvFilePath);
    var parsedData = app.parser(data);
    parsedData.forEach(function(investment){
      expect(isNaN(investment.originalInvestment)).toBe(false);
      expect(isNaN(investment.valueToday)).toBe(false);
    })
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

    it("Get an object containing investorIds as keys and the total of their value now", function () {
      var data = app.fileReader(csvFilePath);
      var parsedData = app.parser(data);
      var asd  = investmentCalc.totalCurrentValueOfInvestors(parsedData)

      expect(asd).toEqual(
        {
          1 : 1190000,
          2 : 863000,
          3 : 3260000,
          4 : 30000,
          5 : 350000,
          6 : 154000,
          7 : 100000,
          8 : 12000,
          9 : 328000,
          10 : 115000
        }
      );
    });

    it("Get the investoId with the highest earning ratio from Current/Original value", function () {
      var data = app.fileReader(csvFilePath);
      var parsedData = app.parser(data);
      var asd  = investmentCalc.bestInvestorByValueIncrease(parsedData)
      expect(asd).toEqual('10')
    });

    it("Get an object containing the id of the companyId that has the most amount invested in", function () {
      var data = app.fileReader(csvFilePath);
      var parsedData = app.parser(data);
      var asd  = investmentCalc.mostInvestedCompany(parsedData)
      expect(asd).toEqual('9')
    });

});
