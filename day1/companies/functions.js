module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var largestInvestment = arr.reduce(function(a,b) {
      return Math.max(a,b.originalInvestment);
    }, arr[0].originalInvestment)
    return largestInvestment;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var numberOfInvestments = arr.length;
    var sumOfInvestments = arr.reduce(function(accumulator, investment) {
      return accumulator + investment.originalInvestment;
    }, 0)
    return sumOfInvestments / numberOfInvestments;
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
    var totalCompanyOriginalInvestments = {};
    arr.forEach(function(investment) {
      if(totalCompanyOriginalInvestments[investment.company] === undefined) {
        totalCompanyOriginalInvestments[investment.company] = 0;
      }

      totalCompanyOriginalInvestments[investment.company] += investment.originalInvestment;
    })
    return totalCompanyOriginalInvestments;
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
    var totalInvestorInvestments = {};
    arr.forEach(function(investment) {
      if (totalInvestorInvestments[investment.investorId] === undefined) {
        totalInvestorInvestments[investment.investorId] = 0;
      }
      totalInvestorInvestments[investment.investorId] += investment.originalInvestment;
    })
    return totalInvestorInvestments;
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
    var investorCurrentValue = {};
    arr.forEach(function(investment) {
      if (investorCurrentValue[investment.investorId] === undefined) {
       investorCurrentValue[investment.investorId] = 0;
      }
      investorCurrentValue[investment.investorId] += investment.valueToday;
    })
    return investorCurrentValue;
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
    var ratio = {};
    var totalOrigInvest = this.totalOriginalInvestmentsByInvestors(arr);
    var totalCurrVal = this.totalCurrentValueOfInvestors(arr);
    for (var investor in totalOrigInvest) {
      if (totalOrigInvest.hasOwnProperty(investor)) {
        ratio[investor] = totalCurrVal[investor] / totalOrigInvest[investor];
      }
    }
    var bestInvest = 0;
    var bestInvestRat = 0;
    for (var investor in ratio) {
      if (ratio.hasOwnProperty(investor)) {
        if (ratio[investor] > bestInvestRat) {
          bestInvestRat = ratio[investor];
          bestInvest = investor;
        }
      }
    }
    return bestInvest;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var compCurrVal = {};
    arr.forEach(function(investment) {
      if(compCurrVal[investment.company] === undefined) {
        compCurrVal[investment.company] = 0;
      }
      compCurrVal[investment.company] += investment.originalInvestment;
    })
    var mostInvestmentCompanyId = 0;
    var mostLargestCompAmount = 0;
    for (var companyId in compCurrVal) {
      if (compCurrVal.hasOwnProperty(companyId)) {
        if (compCurrVal[companyId] > mostLargestCompAmount) {
          mostLargestCompAmount = compCurrVal[companyId];
          mostInvestmentCompanyId = companyId;
        }
      }
    }
    return mostInvestmentCompanyId;
  }

}
