


function largestInvestment(arr){
  return arr.reduce(function(acumulator, investment){
    console.log(investment.originalInvestment)
    console.log(acumulator);
     return (investment.originalInvestment>acumulator)? investment.originalInvestment: acumulator

  }, 0)
}


module.exports = {
  largestInvestment
}
