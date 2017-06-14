module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    var highest_investment = arr[0];
    arr.forEach(function(investment) {
      if (investment.originalInvestment > highest_investment.originalInvestment) {
        highest_investment = investment;
      }
    });
    return highest_investment.originalInvestment;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    sum = 0;
    arr.forEach(function(investment) {
      sum += investment.originalInvestment;
    })
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
    var company_investments = {};
    arr.forEach(function(investment) {
      if (company_investments.hasOwnProperty(investment.company)) {
        company_investments[investment.company] += investment.originalInvestment;
      } else {
        company_investments[investment.company] = investment.originalInvestment;
      }
    });
    return company_investments;
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
    var investor_investments = {};
    arr.forEach(function(investment) {
      if (investor_investments.hasOwnProperty(investment.investorId)) {
        investor_investments[investment.investorId] += investment.originalInvestment;
      } else {
        investor_investments[investment.investorId] = investment.originalInvestment;
      }
    });
    return investor_investments;
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
    var investor_investments = {};
    arr.forEach(function(investment) {
      if (investor_investments.hasOwnProperty(investment.investorId)) {
        investor_investments[investment.investorId] += investment.valueToday;
      } else {
        investor_investments[investment.investorId] = investment.valueToday;
      }
    });
    return investor_investments;
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    var current_value = this.totalCurrentValueOfInvestors(arr);
    var original_value = this.totalOriginalInvestmentsByInvestors(arr);
    var max_investor = null;
    var max_ratio = null;
    var keys = Object.keys(current_value);
    keys.forEach(function(key) {
      var ratio = current_value[key] / original_value[key];
      if (ratio > max_ratio) {
        max_ratio = ratio;
        max_investor = key;
      }
    })
    return max_investor;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    var company_investments = this.totalOriginalInvestmentForCompanies(arr);
    var keys = Object.keys(company_investments);
    var max_investments = null;
    var max_company = null;
    keys.forEach(function(key) {
      if (company_investments[key] > max_investments) {
        max_investments = company_investments[key];
        max_company = key;
      }
    })
    return max_company;
  }

}
