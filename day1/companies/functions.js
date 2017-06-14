// var parser = require('parser')
module.exports = {
  // parser: parser
  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var invest = 0;
    var company;
    arr.forEach(function(obj) {
      var id = obj["company"];
      var originalinvest = obj["originalInvestment"];
      if (originalinvest > invest) {
        invest = originalinvest;
        company = id;
      }
    })
    return invest;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var total = 0;
    // var companyArr = [];
    arr.forEach(function(obj) {
      // obj["originalInvestment"] = parseInt(obj["originalInvestment"])
      // obj["valueToday"] = parseInt(obj["valueToday"]);
      total += obj["originalInvestment"];
      // if (companyArr.indexOf(obj["company"]) === -1) {
      //   companyArr.push(obj["company"])
      // }
    })
    // var newArr = app.parser()
    return total/arr.length;

  },

  // Find out how much a company got as the original investments. In this case, You
  // will have to iterate over the companies and find all the investments for each
  // company and add them up to find how much money they started with.
  // Return an object that contains company ids as keys and their total original investment
  // as values. The object's structure should look something like this:
  // {
  //  1: 595000,
  //  2: 1024000,
  //   ...
  // }
  totalOriginalInvestmentForCompanies: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var result = {};
    arr.forEach(function(obj) {
      var id = obj["company"];
      var invest = obj["originalInvestment"];
      if (result.hasOwnProperty(id)) {
        result[id] += invest;
      } else {
        result[id] = invest;
      }
    })
    return result;

  },

  // Find out how much money an investor spent as  original investments. You will
  // need to iterate through all the investments, find all the investments for each
  // investor and add them up to find how much money someone invested at the beginning.
  // Return an object that contains investor ids as keys and their total original investment
  // as values.  The object's structure should look something like this:
  // {
  //  1: 595000,
  //  2: 1024000,
  //   ...
  // }
  totalOriginalInvestmentsByInvestors: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var result = {};
    arr.forEach(function(obj) {
      var id = obj.investorId;
      var invest = obj["originalInvestment"];
      if (result.hasOwnProperty(id)) {
        result[id] += invest;
      } else {
        result[id] = invest;
      }
    })
    return result;
  },

  // This function is similar to the one above, but it returns the current value
  // for each investor. To get this value, you need to iterate through all the investments,
  // find all the currentValues for each investor and add them up to find how much
  // money someone has now from their investment
  // Return an object that contains investor ids as keys and their total todayValue
  // as values. The object's structure should look something like this:
  // {
  //  1: 595000,
  //  2: 1024000,
  //   ...
  // }
    // Fields to be parsed: "originalInvestment", "valueToday"
  totalCurrentValueOfInvestors: function(arr){
    var result = {};
    arr.forEach(function(obj) {
      var id = obj.investorId;
      var invest = obj["valueToday"];
      if (result.hasOwnProperty(id)) {
        result[id] += invest;
      } else {
        result[id] = invest;
      }
    })
    return result;
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var result = {};
    arr.forEach(function(obj) {
      var id = obj.investorId;
      var invest = (obj["valueToday"] - obj["originalInvestment"]) / obj["originalInvestment"];
      if (result.hasOwnProperty(id)) {
        result[id] += invest;
      } else {
        result[id] = invest;
      }
    })
    var ratio = 0;
    var investor;
    for (var key in result) {
      if (result[key] > ratio) {
        ratio = result[key];
        investor = key;
      }
    }
    return investor;

  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var result = {};
    arr.forEach(function(obj) {
      var id = obj.company;
      var invest = obj["originalInvestment"];
      if (result.hasOwnProperty(id)) {
        result[id] += invest;
      } else {
        result[id] = invest;
      }
    })
    var amount = 0;
    var company;
    for (var key in result) {
      if (result[key] > amount) {
        amount = result[key];
        company = key;
      }
    }
    return company;
  }

}
