var _ = require('underscore-node');
module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    arr.reduce(function(obj1, obj2) {
      return obj1.originalInvestment > obj2.originalInvestment? obj1: obj2;
    })
    return arr[0].originalInvestment;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum = 0;
    arr.forEach(function(item) {
      sum += item.originalInvestment;
    })
    return sum/arr.length;
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
    var byCompany = _.groupBy(arr, 'company');
    var result = {};
    for (var key in byCompany) {
      if (byCompany.hasOwnProperty(key)) {
        var sum = 0;
        byCompany[key].forEach(function(obj) {
          sum += obj.originalInvestment;
        })
        result[key] = sum;
      }
    }
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
    var byInvestor = _.groupBy(arr, 'investorId');
    var result = {};
    for (var key in byInvestor) {
      if (byInvestor.hasOwnProperty(key)) {
        var sum = 0;
        byInvestor[key].forEach(function(obj) {
          sum += obj.originalInvestment;
        })
        result[key] = sum;
      }
    }
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
    var byInvestor = _.groupBy(arr, 'investorId');
    var result = {};
    for (var key in byInvestor) {
      if (byInvestor.hasOwnProperty(key)) {
        var sum = 0;
        byInvestor[key].forEach(function(obj) {
          sum += obj.valueToday;
        })
        result[key] = sum;
      }
    }
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
    var totalOriginal = this.totalOriginalInvestmentsByInvestors(arr);
    var totalCurrent = this.totalCurrentValueOfInvestors(arr);
    var bestRatio = 0;
    var bestCompany;
    var currRatio;
    for (var key in totalOriginal) {
      if (totalOriginal.hasOwnProperty(key)) {
        currRatio = totalCurrent[key]/totalOriginal[key];
        if (currRatio > bestRatio) {
          bestRatio = currRatio;
          bestCompany = key;
        }
      }
    }
    return bestCompany;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var totalOriginalInvestmentForCompanies = this.totalOriginalInvestmentForCompanies(arr);
    var bestCompany;
    var mostInvestment = 0;
    for (var key in totalOriginalInvestmentForCompanies) { //_.forEach(totalOrginalInvestmentForCompanies, function (investment, compandyID))
      if (totalOriginalInvestmentForCompanies.hasOwnProperty(key)) {
        if (totalOriginalInvestmentForCompanies[key] > mostInvestment) {
          mostInvestment = totalOriginalInvestmentForCompanies[key];
          bestCompany = key;
        }
      }
    }
    return bestCompany;
  }

}
