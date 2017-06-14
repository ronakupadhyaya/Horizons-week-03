// var app = require("../app.js");

module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var largestInvest = 0;
    for (var i=0; i<arr.length; i++) {
      var invest = arr[i]["originalInvestment"];
      if (invest > largestInvest){
        largestInvest = invest;
      }
    }
    // console.log("largestInvest", largestInvest);
    return largestInvest;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var investSum = 0;
    var numInvests = arr.length;
    arr.forEach(function(element){
      investSum += element["originalInvestment"];
    })
    return parseFloat(investSum/numInvests);
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
    var logObj = {};
    arr.forEach(function(element) {
      var val = 0;
      if (!(element["company"] in logObj)) {
        logObj[element["company"]] = element["originalInvestment"];
      } else {
        var investOnComp = element["originalInvestment"];
        val = logObj[element["company"]]+investOnComp;
        logObj[element["company"]] = val;
      }
    })
    // console.log(logObj);
    return logObj;
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
    var logObj = {};
    arr.forEach(function(element) {
      var val = 0;
      if (!(element["investorId"] in logObj)) {
        logObj[element["investorId"]] = element["originalInvestment"];
      } else {
        var investOnComp = element["originalInvestment"];
        val = logObj[element["investorId"]]+investOnComp;
        logObj[element["investorId"]] = val;
      }
    })
    // console.log(logObj);
    return logObj;
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
    var logObj = {};
    arr.forEach(function(element) {
      var val = 0;
      if (!(element["investorId"] in logObj)) {
        logObj[element["investorId"]] = element["valueToday"];
      } else {
        var investOnComp = element["valueToday"];
        val = logObj[element["investorId"]]+investOnComp;
        logObj[element["investorId"]] = val;
      }
    })
    // console.log(logObj);
    return logObj;
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
    // console.log('What is this',this);
    var investedObj = this.totalOriginalInvestmentsByInvestors(arr);
    var todayObj = this.totalCurrentValueOfInvestors(arr);
    var earnedRatioObj = {};
    for (key in investedObj) {
      earnedRatioObj[key] = parseFloat(todayObj[key]/investedObj[key]);
    }
    // console.log(earnedRatioObj);
    var valArr = [];
    for (key in earnedRatioObj) {
      valArr.push(earnedRatioObj[key]);
    }
    var highest = valArr.reduce(function(a,b){
      if (a<=b) {
        return b;
      }
      return a;
    }, 0)
    // console.log(highest);
    Object.prototype.getKeyByValue = function( value ) {
      for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
          if( this[ prop ] === value )
            return prop;
        }
      }
    }
    return earnedRatioObj.getKeyByValue(highest);
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var obj = this.totalOriginalInvestmentForCompanies(arr);
    // var keyArr = [];
    // for (key in obj) {
    //   keyArr.push(key);
    // }
    var keyArr = Object.keys(obj);
    console.log(keyArr);
    var res = keyArr.reduce(function(a, b) {
      if (obj[a] <= obj[b]) {
        return b;
      }
      return a;
    })
    return res;
  }

}
