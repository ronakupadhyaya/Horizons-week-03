module.exports = {

  // Find the company that has the largest amount of money invested.
  // You should iterate over the array of investments and find out the largest "original
  // investment" made on a company.
  // Return the entire investment object, not just the amount. (So we can use the
  // id of the company and investor later on).
  singleLargestInvestment: function(arr){
    return arr.reduce(function(accumulator, investment){
      if (investment.originalInvestment > accumulator){
        return investment.originalInvestment
      }
      return accumulator
    }, 0)
  },

  averageOfOriginalInvestments: function(arr){
    var sum = arr.reduce(function(accumulator, investment){
      return accumulator + investment.originalInvestment;
    }, 0)
    return sum/arr.length;
  },

  totalOriginalInvestmentForCompanies: function(arr){
    var investmentAmounts = {};
    arr.forEach(function(investment) {
      if (investmentAmounts[investment.company] === undefined){
        investmentAmounts[investment.company] = 0;
      }
      investmentAmounts[investment.company] += investment.originalInvestment
    });
    return investmentAmounts;
  },

  totalOriginalInvestmentsByInvestors: function(arr){
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
  bestInvestorByValueIncrease: function(arr){
    // The best investor is the one that has a larger totalCurrentValueOfInvestor
    // to totalInvestmentByInvestor ratio
    var investmentRatios = {}
    var totalInvestmentByInvestors = this.totalOriginalInvestmentsByInvestors(arr)
    var totalCurrentValueOfInvestors = this.totalCurrentValueOfInvestors(arr)
    for (var investor in totalInvestmentByInvestors) {
      if (totalInvestmentByInvestors.hasOwnProperty(investor)) {
        investmentRatios[investor]=totalCurrentValueOfInvestors[investor]/totalInvestmentByInvestors[investor];
      }
    }
    var bestInvestor=0;
    var bestInvestmentRatio=0;
    for (var investor in investmentRatios) {
      if (investmentRatios.hasOwnProperty(investor)) {
        if (investmentRatios[investor]>bestInvestmentRatio){
          bestInvestmentRatio=investmentRatios[investor];
          bestInvestor=investor;
        }
      }
    }
    return bestInvestor;
  },

  mostInvestedCompany: function(arr){
    var companyCurrentValues = {};
    arr.forEach(function(investment) {
      if (companyCurrentValues[investment.company] === undefined){
        companyCurrentValues[investment.company] = 0;
      }
      companyCurrentValues[investment.company] += investment.originalInvestment
    });

    var mostInvestedCompanyId=0;
    var mostInvestedCompanyAmount=0;
    for (var companyId in companyCurrentValues) {
      if (companyCurrentValues.hasOwnProperty(companyId)) {
        if (companyCurrentValues[companyId]>mostInvestedCompanyAmount){
          mostInvestedCompanyAmount=companyCurrentValues[companyId];
          mostInvestedCompanyId=companyId;
        }
      }
    }
    return mostInvestedCompanyId;
  }

}
