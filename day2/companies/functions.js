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
  
  totalInvestmentForCompany: function(arr, companyId){
    //
  },
  totalInvestmentByInvestor: function(arr, investorId){
    //
  },
  totalCurrentValueOfInvestor: function(arr, investorId){
    //
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
