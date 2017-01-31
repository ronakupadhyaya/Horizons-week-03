var _ = require('underscore');
module.exports = {
  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    arr.sort(function (a,b) {
      return b-a
    })
    return arr[0].originalInvestment;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    var arr1 = [];
    for (var x = 0; x<arr.length; x++) {
      arr1.push(arr[x].originalInvestment)
    };
    var total = arr1.reduce(function (a,b) {return a+b})
    return total/(arr.length)
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
      var x = _.groupBy(arr, function (obj) {
        return obj.company;
      });
      var obj = {};
      for (var key in x) {
        var total = 0
        x[key].forEach(function (item) {
          total += item['originalInvestment']
        }) //hollys code
        obj[key] = total
      };
      return obj
    // Fields to be parsed: "originalInvestment", "valueToday"
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
    var x = _.groupBy(arr, function (obj) {
      return obj.investorId;
    });
    var obj = {};
    for (var key in x) {
      var temparr=[];
      var total = 0
      x[key].forEach(function (item) {
        total += item['originalInvestment']
      })
      obj[key] = total
    };
    return obj
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
  totalCurrentValueOfInvestors: function(arr, investorId){
    var x = _.groupBy(arr, function (obj) {
      return obj.investorId;
    });
    var obj = {};
    for (var key in x) {
      var temparr=[];
      var total = 0
      x[key].forEach(function (item) {
        total += item['valueToday']
      }) //hollys code
      obj[key] = total
    };
    return obj

    // Fields to be parsed: "originalInvestment", "valueToday"
  totalCurrentValueOfInvestors: function(arr){
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    var currval = module.exports.totalCurrentValueOfInvestors(arr);
    var orig = module.exports.totalOriginalInvestmentsByInvestors(arr);
    var newarr = [];
    for (var x=0; x<10; x++) {
      newarr.push( (currval[x+1] ) / (orig[x+1] ) )
    }
    var i = newarr.indexOf(Math.max.apply(Math, newarr))
    return (i+1).toString();

    // Fields to be parsed: "originalInvestment", "valueToday"
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    var orig = module.exports.totalOriginalInvestmentForCompanies(arr);
    newarr = [];
    for (var key in orig) {
      newarr.push(orig[key])
    }
    var i = newarr.indexOf(Math.max.apply(Math, newarr))
    return (i+1).toString()
  }

}
