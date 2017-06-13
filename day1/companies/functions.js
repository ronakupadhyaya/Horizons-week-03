var util = require('./app.js')
module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    var newA = util.parser(arr);
    var highest = arr[0];
    var highestValue = arr[0].originalInvestment;
    for (var i=1; i<arr.length; i++){
      if (arr[i].originalInvestment>highestValue){
        highest = arr[i];
        highestvalue = arr[i].originalInvestment;
      }

    }
    return highestValue;

    // Fields to be parsed: "originalInvestment", "valueToday"
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    var newA=util.parser(arr);
    var sum=0;
    var companies=0;
    for(var i=0; i<newA.length;i++){
      companies+=1;
      sum+=newA[i].originalInvestment
    }
    var average = sum/companies
    return average;
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
    var newA=util.parser(arr);
    var pairs ={};

    for(var i=0;i<newA.length;i++){
      var comp = newA[i]
      if(pairs[comp.company]){
        pairs[comp.company]+=comp.originalInvestment;

      } else {
        pairs[comp.company]=comp.originalInvestment;
      }
    }
    return pairs;
    // Fields to be parsed: "originalInvestment", "valueToday"
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
    var newA=util.parser(arr);
    var pairs ={};

    for(var i=0;i<newA.length;i++){
      var comp = newA[i]
      if(pairs[comp.investorId]){
        pairs[comp.investorId]+=comp.originalInvestment;

      } else {
        pairs[comp.investorId]=comp.originalInvestment;
      }
    }
    return pairs;

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
    var newA=util.parser(arr);
    var pairs ={};

    for(var i=0;i<newA.length;i++){
      var comp = newA[i]
      if(pairs[comp.investorId]){
        pairs[comp.investorId]+=comp.valueToday;

      } else {
        pairs[comp.investorId]=comp.valueToday;
      }
    }
    return pairs;
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){

    var newA=util.parser(arr);
    var totalCurrent = this.totalCurrentValueOfInvestors(newA);

    var totalOriginal = this.totalOriginalInvestmentsByInvestors(newA);
    var ratio = {};
    var keys = Object.keys(totalCurrent);
    var max= 0;
    var maxId = null;
    for(key in totalCurrent){
      var r = totalCurrent[key]/totalOriginal[key];
      ratio[key]=r;
      if (r>max){
        max = r;
        maxId = key;

      }
    }
    return maxId;


    // Fields to be parsed: "originalInvestment", "valueToday"
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    var newA=util.parser(arr);
    var pairs ={};
   for(var i=0;i<newA.length;i++){
      var comp = newA[i]
      if(pairs[comp.company]){
        pairs[comp.company]+=comp.originalInvestment;
     } else {
        pairs[comp.company]=comp.originalInvestment;
      }
    }
    var max = 0;
    for (var prop in pairs) {
      if (prop > max) {
        max = prop;
      }
    }
    return max;
  }
}
