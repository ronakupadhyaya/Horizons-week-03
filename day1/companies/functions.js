"use strict";



module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the entire investment object, not just the amount.
  singleLargestInvestment: function(arr){
    arr.sort(function(a, b){
      return b.originalInvestment - a.originalInvestment;
    })

    return arr[0].originalInvestment;

  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var newArray = arr.map(function(item){
      return item.originalInvestment;
    })
    var sum = newArray.reduce(function(a, b){
      return a + b;
    })

    return sum/newArray.length;
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

    // var companies = _.groupBy(sortedObj, function(trans){
    //   return trans["ticker"];
    // });



    var companies = this.groupBy(arr, "company");
    var answer = {};

    for (var company in companies) {
      var amt = 0;
      companies[company].forEach(function(item) {
        amt += item.originalInvestment;
      })
      answer[company] = amt;
    }
    return answer;
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


    var companies = this.groupBy(arr, "investorId");
    var answer = {};
    // console.log(compnies);
    for (var investor in companies) {
      var amt = 0;
      companies[investor].forEach(function(item) {
        amt += item.originalInvestment;
      })
      answer[investor] = amt;
    }
    return answer;

  },

  groupBy: function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
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
    // Fields to be parsed: "originalInvestment", "valueToday"


    var companies = this.groupBy(arr, "investorId");
    var answer = {};
    // console.log(compnies);
    for (var investor in companies) {
      var amt = 0;
      companies[investor].forEach(function(item) {
        amt += item.valueToday;
      })
      answer[investor] = amt;
    }
    return answer;
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
    var totalInvestments = this.totalOriginalInvestmentsByInvestors(arr);
    var totalValue = this.totalCurrentValueOfInvestors(arr);
    var maxRatio = 0;
    var maxId = 0;

    for (var id in totalValue){
      var ratio = totalValue[id]/totalInvestments[id];
      //console.log(id);
      //console.log(totalInvestments);
      if (ratio > maxRatio) {
        maxRatio = ratio;
        maxId = id;
      }
    }
    return maxId;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    arr.sort(function(a, b){
      return b.originalInvestment - a.originalInvestment;
    })

    return arr[0].company;
  }

}
