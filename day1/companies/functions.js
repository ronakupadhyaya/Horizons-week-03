module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var max = 0;
    arr.forEach(function(investment) {
      if (investment.originalInvestment > max) {
        max = investment.originalInvestment;
      }
    })
    return max
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var investmentCounter = 0;
    var valueCounter = 0;
    arr.forEach(function(investment) {
      investmentCounter = investmentCounter + 1;
      valueCounter = valueCounter + investment.originalInvestment
    })
    return valueCounter/investmentCounter
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
    var returnObj = {};
    arr.forEach(function(investment) {
      companyId = investment.company;
      if (!returnObj[companyId]) {
        returnObj[companyId] = investment.originalInvestment;
      } else {
        returnObj[companyId] = returnObj[companyId] + investment.originalInvestment;
      }
    })
    return returnObj;
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
    var returnObj = {};
    arr.forEach(function(investment) {
      investorId = investment.investorId;
      if (!returnObj[investorId]) {
        returnObj[investorId] = investment.originalInvestment;
      } else {
        returnObj[investorId] = returnObj[investorId] + investment.originalInvestment;
      }
    })
    return returnObj;
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
    var returnObj = {};
    arr.forEach(function(investment) {
      investorId = investment.investorId;
      if (!returnObj[investorId]) {
        returnObj[investorId] = investment.valueToday;
      } else {
        returnObj[investorId] = returnObj[investorId] + investment.valueToday;
      }
    })
    return returnObj;
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
    var originalValueObj = this.totalOriginalInvestmentsByInvestors(arr)
    console.log(originalValueObj)
    var currentValueObj = this.totalCurrentValueOfInvestors(arr)
    var returnObj = Object.keys(currentValueObj).map(function(key) {
      currentValueObj[key] = currentValueObj[key]/originalValueObj[key]
      console.log(currentValueObj)
    })

    var best = [null, 0]

    for (key in currentValueObj) {
      if (currentValueObj[key] > best[1]) {
        best = [key, currentValueObj[key]]
      }
    }

    return best[0]
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var originalInvestmentObj = this.totalOriginalInvestmentForCompanies(arr);

    var best = [null, 0]

    for (key in originalInvestmentObj) {
      if (originalInvestmentObj[key] > best[1]) {
        best = [key, originalInvestmentObj[key]]
      }
    }

    return best[0]
  }

}
