module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var largestInvestment = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].originalInvestment > largestInvestment) {
        largestInvestment = arr[i].originalInvestment;
      }
    }
    return largestInvestment;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].originalInvestment;
    }
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
  totalOriginalInvestmentForCompanies: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var companies = {};
    for (var i = 0; i < arr.length; i++) {
      var company = arr[i].company;
      var originalInvestment = parseInt(arr[i].originalInvestment);
      var valueToday = parseInt(arr[i].valueToday);

      if (companies.hasOwnProperty(company)) {
        companies[company] += originalInvestment;
      } else {
        companies[company] = originalInvestment;
      }
    }
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
  totalOriginalInvestmentsByInvestors: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var investors = {};
    for (var i = 0; i < arr.length; i++) {
      var investorId = arr[i].investorId;

      if (investors.hasOwnProperty(investorId)) {
        investors[investorId] += arr[i].originalInvestment;
      } else {
        investors[investorId] = arr[i].originalInvestment;
      }
    }
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
    // Fields to be parsed: "originalInvestment", "valueToday"
  totalCurrentValueOfInvestors: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var investors = {};
    for (var i = 0; i < arr.length; i++) {
      var investorId = arr[i].investorId;

      if (investors.hasOwnProperty(investorId)) {
        investors[investorId] += arr[i].valueToday;
      } else {
        investors[investorId] = arr[i].valueToday;
      }
    }
    return investors;
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
    var totalOriginal = this.totalOriginalInvestmentsByInvestors(arr);
    var totalCurrent = this.totalCurrentValueOfInvestors(arr);
    var best_investment = 0;
    var best_investor = '';
    for (var key in totalOriginal) {
      var difference = totalCurrent[key] / totalOriginal[key];
      if (difference > 0) {
        if (difference > best_investment) {
          best_investment = difference;
          best_investor = key;
        }
      }
    }
    return best_investor;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var companies = this.totalOriginalInvestmentForCompanies(arr);
    var max_companyId = '';
    var max_investment = 0;
    for (var key in companies) {
      if (companies[key] > max_investment) {
        max_investment = companies[key];
        max_companyId = key;
      } 
    }
    return max_companyId;
  }

}








