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
        var current = parseInt(arr[i].originalInvestment)
      if ((current) > largestInvestment) {
        largestInvestment = current;
      }
    }
    return largestInvestment;
    for (var m = 0; m < arr.length; m++) {
      if(parseInt(arr[m].originalInvestment) === largestInvestment) {
        return arr[m];
      }
    }
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    var investments = [];
    for (var i = 0; i < arr.length; i++) {
        investments.push(parseInt(arr[i].originalInvestment));
    }
    return investments.reduce(function (a, b){
      return a + b
    })/ investments.length;
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

    var obj = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0
    }
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i].company] += arr[i].originalInvestment;
    }
      return obj;
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
    var obj = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0
    }
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i].investorId] += arr[i].originalInvestment;
    }
      return obj;
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
<<<<<<< HEAD
    var obj = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0
    }
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i].investorId] += arr[i].valueToday;
    }
      return obj;
=======
  totalCurrentValueOfInvestors: function(arr){
>>>>>>> master
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
    var bestId;
    var best = 0;
    for (var i = 0; i < 11; i++) {
      var current = 0;
      var og = 0;
      for (var m = 0; m < arr.length; m++) {
        if (parseInt(arr[m].investorId) === i) {
          current += parseInt(arr[m].valueToday);
          og += parseInt(arr[m].originalInvestment);
        }
      }
      if (current/og > best) {
        best = current/og;
        bestId = i;
      }
    }
    return bestId.toString();
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var bestId;
    var best = 0;
    for (var i = 0; i < 11; i++) {
      var og = 0;
      for (var m = 0; m < arr.length; m++) {
        if (parseInt(arr[m].company) === i) {
          og += parseInt(arr[m].originalInvestment);
        }
      }
      if (og > best) {
        best = og;
        bestId = i;
      }
    }
    return bestId.toString();


}
}
