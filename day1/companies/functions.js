var _ = require('underscore')

module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.

  singleLargestInvestment: function(arr){
      var maxObject = _.max(arr, function(inv){
          return inv.originalInvestment
      })
      return maxObject.originalInvestment;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    var origInv = []
    arr.forEach( function(inv) {
        origInv.push(inv.originalInvestment)
    })
    var sum = _.reduce(origInv, function(memo, num){
        return memo + num;
    }, 0);
    return sum/arr.length
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
      var companies = {}
      arr.forEach(function(inv) {
          if (!(inv.company in companies)) {
              companies[inv.company] = inv.originalInvestment
          }
          else {
              companies[inv.company] = companies[inv.company]+inv.originalInvestment
          }
      })
      return companies
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
      var investors = {}
      arr.forEach(function(inv) {
          if (!(inv.investorId in investors)) {
              investors[inv.investorId] = inv.originalInvestment
          }
          else {
              investors[inv.investorId] = investors[inv.investorId]+inv.originalInvestment
          }
      })
      return investors
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
      var investors = {}
      arr.forEach(function(inv) {
          if (!(inv.investorId in investors)) {
              investors[inv.investorId] = inv.valueToday
          }
          else {
              investors[inv.investorId] = investors[inv.investorId]+inv.valueToday
          }
      })
      return investors
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    var ratio;
    var max = 0;
    var investorID;
    var totalCurrent = module.exports.totalCurrentValueOfInvestors(arr)
    var totalOriginal = module.exports.totalOriginalInvestmentsByInvestors(arr);
    for (key in totalCurrent) {
        var ratio = totalCurrent[key] / totalOriginal[key]
        if( ratio > max) {
            max = ratio;
            investorID = key
        }
    }
    return investorID
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
      var max = 0;
      var companyID;
      var totalOriginal = module.exports.totalOriginalInvestmentForCompanies(arr);
      for (key in totalOriginal) {
          if(totalOriginal[key] > max) {
              max = totalOriginal[key];
              companyID = key
          }
      }
      return companyID

  }

}
