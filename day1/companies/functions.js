var app = require('./app.js')

module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var newarr = app.parser(arr);
    var ans = newarr[0]["originalInvestment"];
    for(var i = 0; i < newarr.length; i++){
      if(ans < newarr[i]["originalInvestment"]){
        ans = newarr[i]["originalInvestment"];
      }
    }
    return ans;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var newarr = app.parser(arr);
    var sum = 0;
    for(var i = 0; i < newarr.length; i++){
      sum += newarr[i]["originalInvestment"];
    }
    return sum / newarr.length;
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
    var newarr = app.parser(arr);
    var ans = {};
    for (var i = 0; i < newarr.length; i++) {
      var key = newarr[i]["company"].toString();
      if (ans.hasOwnProperty(key)) {
        ans[key] = ans[key] + newarr[i]["originalInvestment"];
      }
      else {
        ans[key] = newarr[i]["originalInvestment"];
      }
    }
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
    // Fields to be parsed: "originalInvestment", "valueToday"
    var newarr = app.parser(arr);
    var ans = {};
    for (var i = 0; i < newarr.length; i++) {
      var key = newarr[i]["investorId"].toString();
      if (ans.hasOwnProperty(key)) {
        ans[key] = ans[key] + newarr[i]["originalInvestment"];
      }
      else {
        ans[key] = newarr[i]["originalInvestment"];
      }
    }
    return ans;
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
    var newarr = app.parser(arr);
    var ans = {};
    for (var i = 0; i < newarr.length; i++) {
      var key = newarr[i]["investorId"].toString();
      if (ans.hasOwnProperty(key)) {
        ans[key] = ans[key] + newarr[i]["valueToday"];
      }
      else {
        ans[key] = newarr[i]["valueToday"];
      }
    }
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
    // Fields to be parsed: "originalInvestment", "valueToday"
    var newarr = app.parser(arr);
    var origobj = this.totalOriginalInvestmentsByInvestors(newarr);
    var currobj = this.totalCurrentValueOfInvestors(newarr);
    var ratio = 0;
    var ans = newarr[0]["investorId"];
    for (var i = 0; i < newarr.length; i++){
      var key = newarr[i]["investorId"].toString();
      var curr_ratio = currobj[key]/ origobj[key];
      if (ratio < curr_ratio){
        curr_ratio = ratio;
        ans = newarr[i]["investorId"];
      }
    }
    return ans;

  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var newarr = app.parser(arr);
    var origobj = this.totalOriginalInvestmentForCompanies(newarr);
    console.log(origobj)
    var max = 0;
    var ans = 0;
    var objarr = Object.keys(origobj);

    for (var i = 0; i < objarr.length; i++){
      var comp = origobj[objarr[i]];
      if( comp > max){
        max = origobj[objarr[i]];
        ans = objarr[i];
      }
    }

    return ans;

  }

}
