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
    arr.forEach(function(elem){
      if(elem.originalInvestment > max){
        max = elem.originalInvestment;
      }
    })
    return max;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum = 0;
    var number = arr.length;
    arr.forEach(function(elem){

      sum += elem.originalInvestment;
    })
    return (sum/number);
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
  resultObj = {};

    arr.forEach(function(elem){
    if(resultObj[elem.company]){
      resultObj[elem.company] += elem.originalInvestment;
      } else {
          resultObj[elem.company] = elem.originalInvestment;
              }
  })

  return resultObj;
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
    resultObj = {};

    arr.forEach(function(elem){
      if(resultObj[elem.investorId]){
        resultObj[elem.investorId] += elem.originalInvestment;
      } else{
        resultObj[elem.investorId] = elem.originalInvestment;
      }
    })

    return resultObj;
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

    resultObj = {};

    arr.forEach(function(elem){
      if(resultObj[elem.investorId]){
        resultObj[elem.investorId] += elem.valueToday;
      } else{
        resultObj[elem.investorId] = elem.valueToday;
      }
    })

    return resultObj;

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
    var max = 0
    var maxId = '';
    var investorValueToday = this.totalCurrentValueOfInvestors(arr);
    var investorOriginal = this.totalOriginalInvestmentsByInvestors(arr);
    var number = Object.keys(investorOriginal);
    for (var i = 1; i <= number.length; i++){
      var ratio = investorValueToday[i] / investorOriginal[i];
      if(ratio > max){
        max = ratio;
        maxId = '' + i;
      }
    }
    return maxId;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var totalInvestment = this.totalOriginalInvestmentForCompanies(arr);
    var max = 0;
    var id = '';

for(var key in totalInvestment){
      if(totalInvestment[key] > max){
        max = totalInvestment[key];
        id = '' + key;
      }
    }

    return id;
  }

}
