module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var maxInvestment = 0
    for(var i=0; i < arr.length; i++){
      if(maxInvestment < parseInt(arr[i].originalInvestment)){
        maxInvestment = parseInt(arr[i].originalInvestment)
      }
    }
    return maxInvestment
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum = 0
    for(var i=0; i<arr.length; i++){
      sum = sum + parseInt(arr[i].originalInvestment)
    }
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
    // Fields to be parsed: "originalInvestment", "valueToday"
    var newObj = {};
    // i goes through each array, company #
    arr.forEach(function(investmentObj){
      if (!newObj[investmentObj.company]){
        newObj[investmentObj.company] = 0
      }
    newObj[investmentObj.company] = newObj[investmentObj.company] + parseInt(investmentObj.originalInvestment);
  })
    return newObj
    //  console.log(investmentObj);
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
    var newObj = {};
    // i goes through each array, company #
    arr.forEach(function(investmentObj){
      if (!newObj[investmentObj.investorId]){
        newObj[investmentObj.investorId] = 0
      }
    newObj[investmentObj.investorId] = newObj[investmentObj.investorId] + parseInt(investmentObj.originalInvestment);
  })
    return newObj
    //  console.log(investmentObj);
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
    var newObj = {};
    arr.forEach(function(investmentObj){
      if (!newObj[investmentObj.investorId]){
        newObj[investmentObj.investorId] = 0
      }
    newObj[investmentObj.investorId] = newObj[investmentObj.investorId] + parseInt(investmentObj.valueToday);
  })
    return newObj
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. C
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var current = this.totalCurrentValueOfInvestors(arr);
    var original = this.totalOriginalInvestmentsByInvestors(arr);
    var bestInvestorRatio = 0
    var bestInvestorKey = ''
    var newObj = {}
    //

    for(var i=0; i < Object.keys(current).length ; i++){
      var temp = Object.keys(current)[i]; // keys
      if(current[temp]/original[temp]> bestInvestorRatio){
        bestInvestorRatio = current[temp]/original[temp];
        bestInvestorKey = Object.keys(current)[i];
      }
    //   if(!newObj[i]){
    //     newObj[i]=0;
    //   }
    //   newObj[i] = current[i]/original[i]
    // }
  }
    return bestInvestorKey;
},

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var totalOrgInv = this.totalOriginalInvestmentForCompanies(arr)
    var maxInv = 0
    var maxComp = 0
    for(var key in totalOrgInv){
      if(totalOrgInv[key] > maxInv){
        maxInv = totalOrgInv[key]
        maxComp = key
      }
    }
    return maxComp
    }
}
