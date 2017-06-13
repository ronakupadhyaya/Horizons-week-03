module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // var result = {};
    // console.log("test");
    // for (var i = 0; i<arr.length; i++){
    //   if (!result.hasOwnProperty(arr[i][investorId])) {
    //     result[arr[i]["investorId"]] = [arr[i].originalInvestment];
    //   }
    //
    // }
    arr.sort(function(a,b) {
      return a["originalInvestment"] - b["originalInvestment"];
    })
    return arr[arr.length-1]["originalInvestment"];

  },
  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum = arr.reduce(function(a,b){
      return a + b["originalInvestment"];
    }, 0)
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
    var obj = {};
    for (var i = 0; i<arr.length; i++){
      if (!obj.hasOwnProperty(arr[i]["company"])) {
        obj[arr[i]["company"]] = arr[i]["originalInvestment"];
      }
      else{
      obj[arr[i]["company"]] += arr[i]["originalInvestment"];
      }
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
    var obj = {};
    for (var i = 0; i<arr.length; i++){
      if (!obj.hasOwnProperty(arr[i]["investorId"])) {
        obj[arr[i]["investorId"]] = arr[i]["originalInvestment"];
      }
      else{
      obj[arr[i]["investorId"]] += arr[i]["originalInvestment"];
      }
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
  totalCurrentValueOfInvestors: function(arr){
    var obj = {};
    for (var i = 0; i<arr.length; i++){
      if (!obj.hasOwnProperty(arr[i]["investorId"])) {
        obj[arr[i]["investorId"]] = arr[i]["valueToday"];
      }
      else{
      obj[arr[i]["investorId"]] += arr[i]["valueToday"];
      }
    }
    return obj;
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
    var investmentObj = module.exports.totalOriginalInvestmentsByInvestors(arr);
    var currentValObj = module.exports.totalCurrentValueOfInvestors(arr);

    var array1 = [];
    var resultObj = {};
    for (var i = 0; i<arr.length; i++){
      resultObj[arr[i]["investorId"]] = currentValObj[arr[i]["investorId"]]/investmentObj[arr[i]["investorId"]];
      array1.push( [arr[i]["investorId"] , resultObj[arr[i]["investorId"]]]);
    }
    array1.sort(function(a,b) {
      return a[1] - b[1];
    })
    return arr[arr.length-1]["investorId"];
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    var obj = {};
    for (var i = 0; i<arr.length; i++){
      if (!obj.hasOwnProperty(arr[i]["company"])) {
        obj[arr[i]["company"]] = arr[i]["originalInvestment"];
      }
      else{
      obj[arr[i]["company"]] += arr[i]["originalInvestment"];
      }
    }

    var maxAmount = 0;
    var maxCompany ;
    for (keys in obj){
      if (obj[keys] > maxAmount){
        maxCompany = keys;
        maxAmount = obj[keys];
      }
    }
    return maxCompany;
  }
}
