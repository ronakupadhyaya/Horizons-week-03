module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  // var apps = require('./apps.js')
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"

    // var newArr = apps.parser(arr)
    var highestOI = 0
    for (var i=0; i < arr.length; i++){
      if (arr[i].originalInvestment > highestOI){
        highestOI = arr[i].originalInvestment
      }
    }
    return highestOI
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"

    var total = 0;
    for (var i = 0; i < arr.length; i++){
      total = arr[i].originalInvestment += total
    }

    return total / arr.length
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
    arr.forEach(function(parameter) {
      if(newObj.hasOwnProperty(parameter.company)) {
        newObj[parameter.company] += parameter.originalInvestment;
      } else {
        newObj[parameter.company] = parameter.originalInvestment;
      }
    })
    return newObj;
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
    // Fields to be parsed: "originalInvestment", "valueToday"
   var newObj = {};
   arr.forEach(function(parameter) {
     if(newObj.hasOwnProperty(parameter.investorId)) {
       newObj[parameter.investorId] += parameter.originalInvestment;
     } else {
       newObj[parameter.investorId] = parameter.originalInvestment;
     }
   });
   return newObj;
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
    arr.forEach(function(parameter) {
      if(newObj.hasOwnProperty(parameter.investorId)) {
        newObj[parameter.investorId] += parameter.valueToday;
      } else {
        newObj[parameter.investorId] = parameter.valueToday;
      }
    });
    return newObj;
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
    var currentVal = this.totalCurrentValueOfInvestors(arr)
    var growth = this.totalOriginalInvestmentsByInvestors(arr)
    var elem = Object.keys(currentVal)
    var nice = [];
    var winningId = 1
    var winningRatio = 0
    for (var i =0; i < elem.length; i++){
      //console.log(growth.elem, currentVal)
      var cool = currentVal[elem[i]] / growth[elem[i]]
      var pair = {};
      pair[elem[i]] = cool
      nice.push(pair)
    }
    for (var i = 0; i < nice.length; i++){
      if (nice[i][elem[i]] > winningRatio){
        winningId = elem[i];
        winningRatio = nice[i][elem[i]];
      }
    }
    return winningId;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var companyTot = this.totalOriginalInvestmentForCompanies(arr)
    var keys = Object.keys(companyTot);
    var highestInvestment = 0;
    var highestCompany = 0
    for (var i = 0; i < keys.length; i++){
      if (companyTot[keys[i]] > highestInvestment){
        highestInvestment = companyTot[keys[i]]
        highestCompany = keys[i]
      }
    }
    return highestCompany
  }
}
