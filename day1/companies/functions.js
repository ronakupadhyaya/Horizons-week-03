var _ = require('underscore');
var parser = require('./app.js');
module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
  var maxObj = _.max(arr, function(elt){
    return elt.originalInvestment;
  })
  var max = maxObj.originalInvestment;
  return max;

    // Fields to be parsed: "originalInvestment", "valueToday"
  },
  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    var ogInvest = []
    arr.forEach(function(elt){
      ogInvest.push(elt.originalInvestment);
    })
    var total = _.reduce(ogInvest, function(a, b){
      return a + b;
    }, 0)
    return total / ogInvest.length;

    // Fields to be parsed: "originalInvestment", "valueToday"
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
  //   obj = {};
  //   var groupedObj = _.groupBy(arr, function(elt){
  //     return elt.company;
  //   });
  //
  //   console.log(groupedObj)
  //   for(key in groupedObj) {
  //     var ogInvest = []
  //     groupedObj[key].forEach(function(elt){
  //       ogInvest.push(elt.originalInvestment);
  //     })
  //     var total = _.reduce(ogInvest, function(a, b){
  //       return a + b;
  //     }, 0)
  //     obj[key] = total;
  //   }
  //   return obj;
  // },

  var obj = {};
  arr.forEach(function(investment){
    if(obj[investment.company]){
      obj[investment.company] += investment.originalInvestment;
    }
    else{
      obj[investment.company] = investment.originalInvestment;
    }
  });
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
    var obj = {};
    arr.forEach(function(investment){
      if(obj[investment.investorId]){
        obj[investment.investorId] += investment.originalInvestment;
      }
      else{
        obj[investment.investorId] = investment.originalInvestment;
      }
    });
    return obj;

    // Fields to be parsed: "originalInvestment", "valueToday"
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
    var obj = {};
    arr.forEach(function(investment){
      if(obj[investment.investorId]){
        obj[investment.investorId] += investment.valueToday;
      }
      else{
        obj[investment.investorId] = investment.valueToday;
      }
    });
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
    obj = {};
    var currentVal = module.exports.totalCurrentValueOfInvestors(arr);
    var originalVal = module.exports.totalOriginalInvestmentsByInvestors(arr);
    for(key in currentVal){
      profitPercent = currentVal[key]/originalVal[key];
      obj[key] = profitPercent;
    }
    var highest = 0;
    var highestId;
    _.forEach(obj, function(value, key){
      if(value > highest){
        highest = value;
        highestId = key;
      }
    })
    return highestId;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    var currentVal = module.exports.totalOriginalInvestmentForCompanies(arr);
    var highest = 0;
    var highestId;
    _.forEach(currentVal, function(value, key){
      if(value > highest){
        highest = value;
        highestId = key;
      }
    })
    return highestId;
  },

}
