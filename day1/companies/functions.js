var _=require("underscore")
module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
  //  console.log(arr);
    // arr.forEach(function(item){
    //   item.originalInvestment=parseInt(item.originalInvestment);
    //   item.valueToday=parseInt(item.valueToday);
    // })
    var company=_.max(arr,function(item){
      return item.originalInvestment;
    })
    return company.originalInvestment;

  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum=0;
    var count=0;
    arr.forEach(function(item) {
      sum+=item.originalInvestment;
      count++;
    })
    return sum/count;

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
    var result={};
    arr.forEach(function(item){
      if(result.hasOwnProperty(item.company)){
        result[item.company]=result[item.company]+item.originalInvestment;
      }
      else{
        result[item.company]=item.originalInvestment;
      }
    })
    return result;
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
    var result={};
    arr.forEach(function(item){
      if(result.hasOwnProperty(item.investorId)){
        result[item.investorId]=result[item.investorId]+item.originalInvestment;
      }
      else{
        result[item.investorId]=item.originalInvestment;
      }
    })
    return result;
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
    var result={};
    arr.forEach(function(item){
      if(result.hasOwnProperty(item.investorId)){
        result[item.investorId]=result[item.investorId]+item.valueToday;
      }
      else{
        result[item.investorId]=item.valueToday;
      }
    })
    return result;
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
    var investments=this.totalOriginalInvestmentsByInvestors(arr);
    var returns=this.totalCurrentValueOfInvestors(arr);
    var result=0;
    var max=0;
    for(var i in investments){
      if(returns[i]/investments[i]>max){
        result=i;
        max=returns[i]/investments[i];
      }
    }
    return result;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var companyInvestment=this.totalOriginalInvestmentForCompanies(arr);
    var max=0;
    var result=0;
    for(var i in companyInvestment){
      if(companyInvestment[i]>max){
        max=companyInvestment[i];
        result=i;
      }
    }
    return result;
  }

}
