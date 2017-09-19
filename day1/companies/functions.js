var _ = require('underscore');
module.exports = {


  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    return arr.reduce(function(a, b) {
      b = parseInt(b.originalInvestment);
      return (a > b ? a : b);
    }, 0);
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    return arr.reduce(function(a, b) {
      b = parseInt(b.originalInvestment);
      return a + b;
    }, 0) / arr.length;
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
  totalOriginalInvestmentForCompanies: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    arr = _.groupBy(arr, function(obj) {
      return obj.company;
    })
    return _.mapObject(arr, function(investments) {
      return investments.reduce(function(a, b) {
        b = parseInt(b.originalInvestment);
        return a + b;
      }, 0);
    });
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
  totalOriginalInvestmentsByInvestors: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    arr = _.groupBy(arr, function(obj) {
      return obj.investorId;
    })
    return _.mapObject(arr, function(investments) {
      return investments.reduce(function(a, b) {
        b = parseInt(b.originalInvestment);
        return a + b;
      }, 0);
    });
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
  totalCurrentValueOfInvestors: function(arr) {
    arr = _.groupBy(arr, function(obj) {
      return obj.investorId;
    })
    return _.mapObject(arr, function(investments) {
      return investments.reduce(function(a, b) {
        b = parseInt(b.valueToday);
        return a + b;
      }, 0);
    });
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    var og = this.totalOriginalInvestmentsByInvestors(arr);
    var curr = this.totalCurrentValueOfInvestors(arr);
    var max = Object.keys(og)[0];
    for (var i in og) {
      if (curr[i] / og[i] > curr[max] / og[max]) {
        max = i;
      }
    }
    return max;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    arr = this.totalOriginalInvestmentForCompanies(arr);
    var max = Object.keys(arr)[0];
    for (var i in arr) {
      if (arr[i] > arr[max]) {
        max = i;
      }
    }
    return max;
  }

}
