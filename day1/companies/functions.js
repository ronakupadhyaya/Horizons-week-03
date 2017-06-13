
module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){

    arr.sort(function(a,b){
      return b.originalInvestment-a.originalInvestment;
    });
    return arr[0].originalInvestment;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum = arr.reduce(function(s,b){
      return s + b.originalInvestment;
    },0)

    return sum/(arr.length);

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
    for (var i = 0; i < arr.length; i++) {
      if (!result.hasOwnProperty(arr[i].company)){
        result[arr[i].company] = arr[i].originalInvestment;
      }
      else{
      result[arr[i].company] += arr[i].originalInvestment;}
    }
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
    for (var i = 0; i < arr.length; i++) {
      if (!result.hasOwnProperty(arr[i].investorId)){
        result[arr[i].investorId] = arr[i].originalInvestment;
      }
      else{
      result[arr[i].investorId] += arr[i].originalInvestment;}
    }
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
    for (var i = 0; i < arr.length; i++) {
      if (!result.hasOwnProperty(arr[i].investorId)){
        result[arr[i].investorId] = arr[i].valueToday;
      }
      else{
      result[arr[i].investorId] += arr[i].valueToday;}
    }
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

    var result1= module.exports.totalOriginalInvestmentsByInvestors(arr);
    var result2 = module.exports.totalCurrentValueOfInvestors(arr);

    var result={}
    // console.info(result1);
    for (var key1 in result1){
      for (var key2 in result2){
        if (key1===key2){
        result[key1]=result2[key1]/result1[key1];
      }
    }
  }

    var arr1= [];
    for (var key in result){
      arr1.push([key,result[key]])
    }

    arr1.sort(function(a,b){
      return a[1]-b[1];
    })

    return arr1[arr1.length-1][0];
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var result1= module.exports.totalOriginalInvestmentForCompanies(arr);
    var arr1= [];
    for (var key in result1){
      arr1.push([key,result1[key]])
    }

    arr1.sort(function(a,b){
      return b[1]-a[1];
    })

    return arr1[0][0]
  }
}
