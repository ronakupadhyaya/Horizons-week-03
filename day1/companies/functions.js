module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the entire investment object, not just the amount.
  singleLargestInvestment: function(arr){
    return arr.reduce(function(initial, compare) {
      if (initial < compare.originalInvestment) {
        return compare.originalInvestment
      }
      return initial;
    }, 0)
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    return arr.reduce(function(a, b) {return a + b.originalInvestment}, 0)/arr.length;
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
    var investmentsTotal = {};
    arr.forEach(function(investment) {
      if (!investmentsTotal[investment.company]) {
        investmentsTotal[investment.company] = 0;
      }
      investmentsTotal[investment.company] = investmentsTotal[investment.company] + investment.originalInvestment;
    });
    return investmentsTotal;
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
    var investmentsTotal = {};
    arr.forEach(function(investment) {
      if (!investmentsTotal[investment.investorId]) {
        investmentsTotal[investment.investorId] = 0;
      }
      investmentsTotal[investment.investorId] = investmentsTotal[investment.investorId] + investment.originalInvestment;
    });
    return investmentsTotal;
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
  totalCurrentValueOfInvestors: function(arr, investorId){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var investmentsTotal = {};
    arr.forEach(function(investment) {
      if (!investmentsTotal[investment.investorId]) {
        investmentsTotal[investment.investorId] = 0;
      }
      investmentsTotal[investment.investorId] = investmentsTotal[investment.investorId] + investment.valueToday;
    });
    return investmentsTotal;
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    var original = this.totalOriginalInvestmentsByInvestors(arr);
    var current = this.totalCurrentValueOfInvestors(arr);
    var rankedArray = [];
    var investorArray = Object.keys(original);

    for (var i = 0; i < investorArray.length; i++) {
      rankedArray.push([investorArray[i], current[investorArray[i]]/original[investorArray[i]]]);
    };

    var winner = rankedArray.reduce(function(initial, compare) {
      if (initial[1] < compare[1]) {
        return compare;
      }
      return initial;
    })
    return winner[0];
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    var original = this.totalOriginalInvestmentForCompanies(arr);
    var rankedArray = [];
    var companyArray = Object.keys(original);

    for (var i = 0; i < companyArray.length; i++) {
      rankedArray.push([companyArray[i], original[companyArray[i]]]);
    };

    var winner = rankedArray.reduce(function(initial, compare) {
      if (initial[1] < compare[1]) {
        return compare;
      }
      return initial;
    })
    return winner[0];
  }
}
