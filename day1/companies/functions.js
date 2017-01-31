module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the entire investment object, not just the amount.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var largestObj = arr.reduce(function(obj1, obj2) {
      return obj1.originalInvestment >= obj2.originalInvestment ? obj1 : obj2;
    });

    return largestObj.originalInvestment;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    return arr.reduce(function(a, obj2) {
      return a + obj2.originalInvestment;
    }, 0) / arr.length;
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
    arr.forEach(function(obj) {
      if (!(obj.company in newObj)) newObj[obj.company] = 0;

      newObj[obj.company] += obj.originalInvestment;
    });

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
    var newObj = {};
    arr.forEach(function(obj) {
      if (!(obj.investorId in newObj)) newObj[obj.investorId] = 0;

      newObj[obj.investorId] += obj.originalInvestment;
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
  totalCurrentValueOfInvestors: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var newObj = {};
    arr.forEach(function(obj) {
      if (!(obj.investorId in newObj)) newObj[obj.investorId] = 0;

      newObj[obj.investorId] += obj.valueToday;
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
    var tcv = this.totalCurrentValueOfInvestors(arr);
    var toi = this.totalOriginalInvestmentsByInvestors(arr);

    var bestInvestor = arr.reduce(function(obj1, obj2) {
      var ratio1 = tcv[obj1.investorId] / toi[obj1.investorId];
      var ratio2 = tcv[obj2.investorId] / toi[obj2.investorId];
      return ratio1 >= ratio2 ? obj1 : obj2;
    });

    return bestInvestor.investorId;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var toic = this.totalOriginalInvestmentForCompanies(arr);

    var cur_max = 0;
    var cur_investor;
    for (key in toic) {
      if (toic[key] > cur_max) {
        cur_max = toic[key];
        cur_investor = key;
      }
    }

    return cur_investor;
  }

}
