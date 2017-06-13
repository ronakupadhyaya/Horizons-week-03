module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    //console.log(arr)
    var largestOriginalInvest = 0
    for(var i = 0; i < arr.length; i++){
      var currentOriginalInvestment = parseInt(arr[i].originalInvestment);
      if(currentOriginalInvestment > largestOriginalInvest){
        largestOriginalInvest = currentOriginalInvestment;

      }
    }
    return largestOriginalInvest;
  },


  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var totalInvest = 0;
    for(var i = 0; i < arr.length; i++){
      totalInvest += parseInt(arr[i].originalInvestment)
    }
  return totalInvest / (arr.length)
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
    var companiesInvestments = {};

    arr.forEach(function(obj){
      if(!(obj.company in companiesInvestments)){

        companiesInvestments[obj.company] = 0;
      }
     companiesInvestments[obj.company] += obj.originalInvestment
    })
    return companiesInvestments
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
    var companyOriginalInvestment = {};
    arr.forEach(function(obj){
      if(obj.investorId in companyOriginalInvestment){
        companyOriginalInvestment[obj.investorId] += obj.originalInvestment;
      }else{
        companyOriginalInvestment[obj.investorId] = obj.originalInvestment
      }
    })
    return companyOriginalInvestment
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
    var currentInvestorValue = {};
    arr.forEach(function(obj){
      if(obj.investorId in currentInvestorValue){
        currentInvestorValue[obj.investorId] += obj.valueToday;
      }else{
        currentInvestorValue[obj.investorId] = obj.valueToday
      }
    })
    return currentInvestorValue
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
    var currentValueInvestor = this.totalCurrentValueOfInvestors(arr);
    console.log(currentValueInvestor)
    var originalInvestorInvestment = this.totalOriginalInvestmentsByInvestors(arr);
    console.log(originalInvestorInvestment)
    var bestInvesorRatio = 0;
    var bestInvestorId = null;
    for(var prop in currentValueInvestor){
      var currentRatio = currentValueInvestor[prop] / originalInvestorInvestment[prop];
      var currentId = prop;
      if(currentRatio > bestInvesorRatio){
        bestInvesorRatio = currentRatio;
        bestInvestorId = currentId;
      }
    }
console.log(bestInvestorId)
    return bestInvestorId

  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var companiesTotalInvestment = this.totalOriginalInvestmentForCompanies(arr);
    var highestCompanyInvestment = 0;
    var highestCompanyInvestmentID = 0;
    for(var prop in companiesTotalInvestment){
      if(companiesTotalInvestment[prop] > highestCompanyInvestment){
        var highestCompanyInvestment = companiesTotalInvestment[prop];
        var highestCompanyInvestmentID = prop;
      }
    }
    // var companyIdHighestInvest = 0;
    // var companyTotalHighestInvest = 0;
    // for(var prop in companyTotalHighestInvest){
    //   current
    //   if(companiesTotalInvestment[prop] )
    // }
    return highestCompanyInvestmentID
  }

}
