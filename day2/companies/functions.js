module.exports = {




  // Find the company that has the largest amount of money invested.
  // You should iterate over the array of investments and find out the largest "original
  // investment" made on a company.
  // Return the entire investment object, not just the amount. (So we can use the
  // id of the company and investor later on).
  largestInvestment: function(arr){
    return arr.reduce(function(accumulator, investment){
      if (investment.originalInvestment > accumulator){
        return investment.originalInvestment
      }
      return accumulator
    }, 0)
  },

  averageOriginalInvestment: function(arr){
    var sum = arr.reduce(function(accumulator, investment){
      return accumulator + investment.originalInvestment;
    }, 0)
    return sum/arr.length;
  },

  totalInvestmentForCompanies: function(arr){
    var investmentAmounts = {};
    arr.forEach(function(investment) {
      if (investmentAmounts[investment.company] === undefined){
        investmentAmounts[investment.company] = 0;
      }
      investmentAmounts[investment.company] += investment.originalInvestment
    });
    return investmentAmounts;
  },

  totalInvestmentByInvestors: function(arr){
    var investorAmounts = {};
    arr.forEach(function(investment) {
      if (investorAmounts[investment.investorId] === undefined){
        investorAmounts[investment.investorId] = 0;
      }
      investorAmounts[investment.investorId] += investment.originalInvestment
    });
    return investorAmounts;
  },
  totalCurrentValueOfInvestors: function(arr, investorId){
    var investorCurrentValues = {};
    arr.forEach(function(investment) {
      if (investorCurrentValues[investment.investorId] === undefined){
        investorCurrentValues[investment.investorId] = 0;
      }
      investorCurrentValues[investment.investorId] += investment.valueToday
    });
    return investorCurrentValues;
  },
  bestInvestor: function(arr){
    // The best investor is the one that has a larger totalCurrentValueOfInvestor
    // to totalInvestmentByInvestor ratio
  },
  investorWithLargestInvestment: function(arr){
    // Hint, iterate over the array of investments use totalInvestmentForCompany
  },
  mostInvestedCompany: function(arr){
    //
  }

}

// company with mostGrowthCapital?
// Percent growth return OriginalCapital(1+x)=F
