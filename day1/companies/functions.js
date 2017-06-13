var app = require('./app.js')
module.exports = {
  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr) {
    var newArr = app.parser(arr);
    var largest = -Infinity;
    var firmName = '';
    newArr.forEach(function(item) {
      if (item.originalInvestment > largest) {
        largest = item.originalInvestment;
        firmName = item.company;
      }
    })
    return largest;
    // Fields to be parsed: "originalInvestment", "valueToday"
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr) {
    var newArr = app.parser(arr);
    var length = newArr.length;
    var newNum = newArr.map(function(item) {
      return item.originalInvestment;
    })
    var sum = newNum.reduce(function(a, b) {
      return a + b;
    }, 0)
    var sum2 = newArr.reduce(function(a, b) {
      // console.log(a.originalInvestment); ////undefined ????
      // console.log(b); ////
      return a.originalInvestment + b.originalInvestment;
    }, 0)
    return sum / length;

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
  totalOriginalInvestmentForCompanies: function(arr) {
    var newArr = app.parser(arr);
    var result = new Object();
    newArr.forEach(function(item) {
      var name = item.company;
      var oriInevst = item.originalInvestment;
      if (!result.hasOwnProperty(name)) result[name] = oriInevst;
      else result[name] += oriInevst;
    })
    return result;
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
  totalOriginalInvestmentsByInvestors: function(arr) {
    var newArr = app.parser(arr);
    var result = new Object();
    newArr.forEach(function(item) {
      var name = item.investorId;
      var oriInevst = item.originalInvestment;
      if (!result.hasOwnProperty(name)) result[name] = oriInevst;
      else result[name] += oriInevst;
    })
    return result;
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
  totalCurrentValueOfInvestors: function(arr) {

    var newArr = app.parser(arr);
    var result = new Object();
    newArr.forEach(function(item) {
      var name = item.investorId;
      var oriInevst = item.valueToday;
      if (!result.hasOwnProperty(name)) result[name] = oriInevst;
      else result[name] += oriInevst;
    })
    return result;

  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr) {
    // var newArr = app.parser(arr);
    // console.log(this.totalCurrentValueOfInvestors);
    var totalCurent = this.totalCurrentValueOfInvestors(arr);
    var totalOrigin = this.totalOriginalInvestmentsByInvestors(arr);
    var currentHigh = 1;
    var currentId = 0;
    var keyList = Object.keys(totalCurent);
    keyList.forEach(function(item, index) {
      item = parseInt(item);
      var current = totalCurent[item];
      var origin = totalOrigin[item];
      if ((current / origin) > currentHigh) {
        currentHigh = (current / origin);
        currentId = item;
      }
    })
    return currentId.toString();

    // Fields to be parsed: "originalInvestment", "valueToday"
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr) {

    var newArr = app.parser(arr);
    var largestAmount = this.singleLargestInvestment(arr);
    var id = '';
    newArr.forEach(function(item) {
      if (item.originalInvestment === largestAmount) id = item.company;
    })
    return id;
    // Fields to be parsed: "originalInvestment", "valueToday"
  }

}
