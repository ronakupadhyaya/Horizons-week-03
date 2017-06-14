module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    for (var i = 0; i < arr.length; i ++) {
      var ans = arr[0].originalInvestment
      if (arr[i].originalInvestment > ans) {
        ans = arr[i].originalInvestment;
      }
      return ans;
    }
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    var arr2 = []
    for (var i = 0; i < arr.length; i ++) {
      arr2.push(arr[i].originalInvestment)
    }
    var accumulation = arr2.reduce(function(a, b){
      return a + b;
    }, 0);
    return accumulation / arr2.length;
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
      // console.log(arr);
    var ans = {};
    arr.forEach(function(investment) {
      if (ans[investment.company] === undefined){
        ans[investment.company] = 0;
      }
      ans[investment.company] += investment.originalInvestment
    });
    return ans;
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
    console.log(arr);
    var ans = {};
    arr.forEach(function(investment) {
      if (ans[investment.investorId] === undefined){
        ans[investment.investorId] = 0;
      }
      ans[investment.investorId] += investment.originalInvestment
    });
    return ans;
  },
    // Fields to be parsed: "originalInvestment", "valueToday"

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
    var ans = {};
    arr.forEach(function(investment) {
      if (ans[investment.investorId] === undefined){
        ans[investment.investorId] = 0;
      }
      ans[investment.investorId] += investment.valueToday
    });
    return ans;
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    var ratios = {};
    var totalInvestmentbyInvestors = this.totalOriginalInvestmentsByInvestors(arr);
    var totalCurrentValueOfInvestors = this.totalCurrentValueOfInvestors(arr);

    for (var investor in totalInvestmentbyInvestors) {
      if (totalInvestmentbyInvestors.hasOwnProperty(investor)) {
        ratios[investor] = totalCurrentValueOfInvestors[investor]/totalInvestmentbyInvestors[investor];
      }
    }

    var bestInvestor = '';
    var bestInvestmentRatio = '';
    for (var investor in ratios) {
      if (ratios.hasOwnProperty(investor)) {
        if (ratios[investor]>bestInvestmentRatio) {
          bestInvestmentRatio=ratios[investor];
          bestInvestor=investor;
        }
      }
    }
    return bestInvestor;
    // Fields to be parsed: "originalInvestment", "valueToday"
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    var ans = {};
    arr.forEach(function(investment) {
      if (ans[investment.company] === undefined){
        ans[investment.company] = 0;
      }
      ans[investment.company] += investment.originalInvestment
    });

    var mostInvestedCompanyId = ''
    var mostInvestedCompanyAmmount = ''
    for (var companyId in ans) {
      if (ans[companyId]>mostInvestedCompanyAmmount) {
        mostInvestedCompanyAmmount = ans[companyId];
        mostInvestedCompanyId = companyId;
      }
    }
    return mostInvestedCompanyId;
    // Fields to be parsed: "originalInvestment", "valueToday"
  }

}
