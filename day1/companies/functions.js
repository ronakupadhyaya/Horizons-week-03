var _ = require("underscore");
module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    highestInvestment = 0;
    arr.forEach(function(item,index){
      if(item["originalInvestment"] > highestInvestment){
        highestInvestment = item["originalInvestment"];
      }
    })
    return highestInvestment;

    // Fields to be parsed: "originalInvestment", "valueToday"
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    numInvestments = 0;
    totalInvestment = 0;
    arr.forEach(function(item,index){
      numInvestments ++;
      totalInvestment += item["originalInvestment"];
    })
    // console.log(totalInvestment);
    // console.log(numInvestments);
    average = totalInvestment / numInvestments;
    return average;
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
    // "id" origInvest
    newObj = {};
    arr.forEach(function(item,index){
      var key = item["company"];
      var value = item["originalInvestment"];
      if(newObj[key]){
        newObj[key] += value;
      }
      else {
        newObj[key] = value;
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
    newObj = {};
    arr.forEach(function(item,index){
      var key = item["investorId"];
      var value = item["originalInvestment"];
      if(newObj[key]){
        newObj[key] += value;
      }
      else {
        newObj[key] = value;
      }
    })
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
    newObj = {};
    arr.forEach(function(item,index){
      var key = item["investorId"];
      var value = item["valueToday"];
      if(newObj[key]){
        newObj[key] += value;
      }
      else {
        newObj[key] = value;
      }
    })
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
    var currentValue = this.totalCurrentValueOfInvestors(arr);
    var originalInvest = this.totalOriginalInvestmentsByInvestors(arr);
    var bestInvestor = null;
    var bestRatio = 0;

    _.mapObject(originalInvest, function(value, key){
      var ratio = currentValue[key] / value;
      if(ratio > bestRatio){
        bestInvestor = key;
        bestRatio = ratio;
      }
    })
    return bestInvestor;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    var currentcompInv = {};
    arr.forEach(function(item){
      var key = item["company"];
      var value = item["originalInvestment"];
      if(!currentcompInv.hasOwnProperty(key)){
        currentcompInv[key] = 0;
      }
      currentcompInv[key] += value;
    });
    //console.info(currentcompInv);
    mostraisedComp = null;
    mostAmountRaised = 0;
    for(var key in currentcompInv){
      if(currentcompInv[key] > mostAmountRaised){
        mostAmountRaised = currentcompInv[key];
        mostraisedComp = key;
      }
    }
    return mostraisedComp;
  }
}



// var reader = require('./app.js');
// console.log(module.exports.averageOfOriginalInvestments(reader.fileReader("investments1.csv")))
