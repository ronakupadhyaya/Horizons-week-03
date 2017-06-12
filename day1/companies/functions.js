module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var maxIn = arr[0].originalInvestment;

    for(var i = 1; i< arr.length; i++){
      if(arr[i].originalInvestment > maxIn){
        maxIn = arr[i].originalInvestment;
      }
    }

    return maxIn;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum = 0;

    for(var i = 0; i< arr.length; i++){
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
    var ret_object = {};

    for(var i = 0; i < arr.length; i++){
      var valueToAdd = arr[i].originalInvestment;
      if(ret_object.hasOwnProperty(arr[i].company)){
        ret_object[arr[i].company] += valueToAdd;
      }else{
        ret_object[arr[i].company] = valueToAdd;
      }
    }

    return ret_object;
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
    var ret_object = {};

    for(var i = 0; i < arr.length; i++){
      var valueToAdd = arr[i].originalInvestment;
      if(ret_object.hasOwnProperty(arr[i].investorId)){
        ret_object[arr[i].investorId] += valueToAdd;
      }else{
        ret_object[arr[i].investorId] = valueToAdd;
      }
    }

    return ret_object;
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

    var ret_object = {};

    for(var i = 0; i < arr.length; i++){
      var valueToAdd = arr[i].valueToday;
      if(ret_object.hasOwnProperty(arr[i].investorId)){
        ret_object[arr[i].investorId] += valueToAdd;
      }else{
        ret_object[arr[i].investorId] = valueToAdd;
      }
    }

    return ret_object;
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
    var start = this.totalOriginalInvestmentsByInvestors(arr);
    var end = this.totalCurrentValueOfInvestors(arr);

    var ret_object = {};

    for(var property in start){
      ret_object[property] = end[property] / start[property];
    }

    //console.info(ret_object);

    var max = ret_object['1'];
    var max_prop = '1';

    for(var property in ret_object){
      if(ret_object[property] > max){
        max_prop = property;
        max = ret_object[property];
      }
    }

    return max_prop;

  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var invests = this.totalOriginalInvestmentForCompanies(arr);
    console.info(invests);

    var max = invests['1'];
    var max_prop = '1';

    for(var property in invests){
      if(invests[property] > max){
        max_prop = property;
        max = invests[property];
      }
    }


    return max_prop;
  }

}
