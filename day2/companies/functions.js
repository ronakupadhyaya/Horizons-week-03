


function largestInvestment(arr){
  return arr.reduce(function(accumulator, investment){
    if (Number(investment.originalInvestment) > accumulator){
      return Number(investment.originalInvestment)
    }
    return accumulator
  }, 0)
}

// TODO
// function averageInvestment
// bestInvestor
// company with most Capital?
// Percent growth return OriginalCapital(1+x)=F
// Total for company
// total for investor.


module.exports = {
  largestInvestment
}
