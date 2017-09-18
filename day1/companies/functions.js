module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var topDog = arr.reduce(function(i1, i2) {
      if(i1.originalInvestment > i2.originalInvestment) {
        return i1;
      }
      return i2;
    });
    return topDog.originalInvestment;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var numInvest = arr.length;
    var totalInvest = 0;
    arr.forEach(function(invest) {
      totalInvest += invest.originalInvestment;
    })
    return totalInvest/numInvest;
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
    var ogCompany = {};
    arr.forEach(function(invest) {
      if(! ogCompany[invest.company]) { //first instance
        ogCompany[invest.company] = 0;
      }
      ogCompany[invest.company] += invest.originalInvestment;
    });
    return ogCompany;
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
    var ogInvestor = {};
    arr.forEach(function(invest) {
      if(! ogInvestor[invest.investorId]) {
        ogInvestor[invest.investorId] = 0;
      }
      ogInvestor[invest.investorId] += invest.originalInvestment;
    });
    return ogInvestor;
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
    var currInvestor = {};
    arr.forEach(function(invest) {
      if(! currInvestor[invest.investorId]) {
        currInvestor[invest.investorId] = 0;
      }
      currInvestor[invest.investorId] += invest.valueToday;
    });
    return currInvestor;
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
    var ogInvest = this.totalOriginalInvestmentsByInvestors(arr);
    var currInvest = this.totalCurrentValueOfInvestors(arr);
    var investors = Object.keys(ogInvest);
    var bestRatio = 0;
    var bestInvestor;
    investors.forEach(function(investorId) {
      var ratio = currInvest[investorId]/ogInvest[investorId];
      if(ratio > bestRatio) {
        bestRatio = ratio;
        bestInvestor = investorId;
      }
    });
    return bestInvestor;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var companyInvest = this.totalOriginalInvestmentForCompanies(arr);
    var companies = Object.keys(companyInvest);
    var bigDog = companies.reduce(function(c1, c2) {
      if(companyInvest[c1] > companyInvest[c2]) {
        return c1;
      }
      return c2;
    });
    return bigDog;
  }

}
