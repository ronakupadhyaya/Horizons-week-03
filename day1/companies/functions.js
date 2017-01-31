module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.

  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    return Math.max.apply(Math, arr.map(function(e) {
      return e.originalInvestment;
    }))
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"

    var sum = arr.reduce(function(a, b) {
      return a + b.originalInvestment;
    }, 0);

    return sum / arr.length;
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
    var companies = {};
    arr.forEach(function(comp) {
      if (!(comp.company in companies)) {
        companies[comp.company] = comp.originalInvestment;
        // console.log(comp);
      } else {
        companies[comp.company] += comp.originalInvestment;
      }
    })
    return companies;
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
    var investors = {};
    arr.forEach(function(investor) {
      if (!(investor.investorId in investors)) {
        investors[investor.investorId] = investor.originalInvestment;
      } else {
        investors[investor.investorId] += investor.originalInvestment;
      }
    });
    return investors;
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
  totalCurrentValueOfInvestors: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    var investors = {};
    arr.forEach(function(investor) {
      if (!(investor.investorId in investors)) {
        investors[investor.investorId] = investor.valueToday;
      } else {
        investors[investor.investorId] += investor.valueToday;
      }
    });
    return investors;

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    var original = this.totalOriginalInvestmentsByInvestors(arr);
    var current = this.totalCurrentValueOfInvestors(arr);
    var ratios = [];
    // console.log(original);
    // console.log(current);
    var investors = Object.keys(original);
    investors.map(function(i) {
        // console.log(original[i]);
        // console.log(current[i]);
        ratios.push(current[i] / original[i]);
      })
      // console.log(ratios);
      // console.log(Math.max.apply(null, ratios));
    return (ratios.indexOf(Math.max.apply(null, ratios)) + 1).toString();
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr) {
    // Fields to be parsed: "originalInvestment", "valueToday"
    var invest = this.totalOriginalInvestmentsByInvestors(arr);
    var highestComp = 1;
    var highestVal = invest.highestComp;
    for (key in invest) {
      if (invest.key > highestVal){
        highestComp = key;
        highestVal = invest.highestComp;
      }
    }
    console.log(invest)
    return highestComp;
  }

}