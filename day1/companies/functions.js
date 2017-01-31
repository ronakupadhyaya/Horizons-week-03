module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the entire investment object, not just the amount.
  singleLargestInvestment: function(arr){
    var large =0;
    for (var i=0; i<arr.length; i++){
      if (arr[i].originalInvestment > large){
        large = arr[i].originalInvestment;
      }
    }
    return large;
    // Fields to be parsed: "originalInvestment", "valueToday"
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    var sum=0;
    for (var i=0; i<arr.length; i++){
        sum += arr[i].originalInvestment;
      }
    return sum/arr.length;
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
    var answer={};
    arr.forEach(function(item){
      if(answer[item.company] === undefined){
         answer[item.company]=0;
      }
      answer[item.company] += item.originalInvestment
    });
    return answer;
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
    var answer={};
    arr.forEach(function(item){
      if(answer[item.investorId] === undefined){
         answer[item.investorId]=0;
      }
      answer[item.investorId] += item.originalInvestment
    });
    return answer;
    // Fields to be parsed: "originalInvestment", "valueToday"
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
    var answer={};
    arr.forEach(function(item){
      if(answer[item.investorId] === undefined){
         answer[item.investorId]=0;
      }
      answer[item.investorId] += item.valueToday;
    });
    return answer;
    // Fields to be parsed: "originalInvestment", "valueToday"
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    var arr1 = this.totalOriginalInvestmentsByInvestors(arr);
   var arr2 = this.totalCurrentValueOfInvestors(arr);
   var id = 1;
   var average = 0;
   for (var i = 1; i <= Object.keys(arr1).length; i++) {
       var check = (parseFloat(arr2[i]))/parseFloat(arr1[i]);
        console.log(check)
        if(check > average){
           average = check;
           id = i;
         }
        }
    return id.toString()
    // Fields to be parsed: "originalInvestment", "valueToday"
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
   var id =0;
   var max;
   var obj = this.totalOriginalInvestmentsForCompanies(arr);
   for (var key in obj){
     id = obj[key];
     max = key
   }
    return max;
    // Fields to be parsed: "originalInvestment", "valueToday"
  }
}

}
