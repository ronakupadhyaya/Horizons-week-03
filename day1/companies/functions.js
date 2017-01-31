var app = require('./app.js')

module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the entire investment object, not just the amount.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var high = arr[0].originalInvestment;
    for(var i = 0; i < arr.length; i++){
      if(arr[i].originalInvestment > high){
        high = arr[i].originalInvestment;
      }
    }
    return high;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum = 0;
    for(var i = 0; i < arr.length; i++){
      sum += arr[i].originalInvestment;
    }
    return sum/arr.length;
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
    var obj = {};

    for(var i = 0; i < arr.length; i++){

      if(!!(obj[arr[i].company]) === false){
        obj[arr[i].company] = parseFloat(arr[i].originalInvestment);

      }else{
        obj[arr[i].company] = parseFloat(arr[i].originalInvestment) + parseFloat(obj[arr[i].company]);
      }
    }
    return obj;
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
    var obj = {};

    for(var i = 0; i < arr.length; i++){
      if(!!(obj[arr[i].investorId]) === false){
        obj[arr[i].investorId] = parseFloat(arr[i].originalInvestment);

      }else{
        obj[arr[i].investorId] = parseFloat(arr[i].originalInvestment) + parseFloat(obj[arr[i].investorId]);
      }
    }
    return obj;
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
  totalCurrentValueOfInvestors: function(arr, investorId){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var obj = {};

    for(var i = 0; i < arr.length; i++){
      if(!!(obj[arr[i].investorId]) === false){
        obj[arr[i].investorId] = parseFloat(arr[i].valueToday);

      }else{
        obj[arr[i].investorId] = parseFloat(arr[i].valueToday) + parseFloat(obj[arr[i].investorId]);
      }
    }
    return obj;
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
    var original= module.exports.totalOriginalInvestmentsByInvestors(arr);
    var value = module.exports.totalCurrentValueOfInvestors(arr);
    var bestRatio = 0;
    var bestInvestor = null;

    for(var key in original){
      if((value[key] / original[key])> bestRatio){
        bestRatio = value[key] / original[key];
        bestInvestor = key;
      }
    }

    return bestInvestor;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var original = module.exports.totalOriginalInvestmentForCompanies(arr);
    var high = 0;
    var investor = null;
    for(var key in original){
      if(original[key] > high){
        investor = key;
        high = original[key]
      }
    }
    return investor;
  }

}