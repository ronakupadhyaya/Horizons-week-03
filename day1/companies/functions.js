module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    var largest = 0;
    arr.forEach(function(item) {
      if (item.originalInvestment > largest)
        largest = item.originalInvestment;
    });
    return largest;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    var total = 0;
    arr.forEach(function(item) {
      total += item.originalInvestment;
    });
    return total / arr.length;
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
    // Fields to be parsed: "originalInvestment", "valueToday"
    var returnObj = {};
    arr.forEach(function(item) {
      if (returnObj[item.company] === undefined) {
        returnObj[item.company] = 0;
      }
      returnObj[item.company] += item.originalInvestment;
    });
    return returnObj;
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
    // Fields to be parsed: "originalInvestment", "valueToday"
    var returnObj = {};
    arr.forEach(function(item) {
      if (returnObj[item.investorId] === undefined) {
        returnObj[item.investorId] = 0;
      }
      returnObj[item.investorId] += item.originalInvestment;
    });
    return returnObj;
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
    var returnObj = {};
    arr.forEach(function(item) {
      if (returnObj[item.investorId] === undefined) {
        returnObj[item.investorId] = 0;
      }
      returnObj[item.investorId] += item.valueToday;
    });
    return returnObj;
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    var totalOriginal = this.totalOriginalInvestmentsByInvestors(arr);
    var totalToday = this.totalCurrentValueOfInvestors(arr);
    var returnObj = {};
    var returnId;
    var highest = 0;

    arr.forEach(function(item) {
      returnObj[item.investorId] = totalToday[item.investorId] / totalOriginal[item.investorId];
    });

    for (key in returnObj) {
      if (returnObj[key] > highest) {
        highest = returnObj[key];
        returnId = key;
      }
    }
    return returnId;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    var returnId;
    var highest = 0;
    var totalInvestments = this.totalOriginalInvestmentForCompanies(arr);
    for (key in totalInvestments) {
      if (totalInvestments[key] > highest) {
        highest = totalInvestments[key];
        returnId = key;
      }
    }
    return returnId;
  }

}
