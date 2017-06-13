module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.


  // [{id: '1', investorId: '1', company: '9',
  //              originalInvestment: '1100000',
  //              valueToday: '1000000' }]

singleLargestInvestment: function(arr){
	var invest = [];
	arr.forEach(function(item){
       invest.push(item.originalInvestment);
})
return Math.max.apply(Math, invest);

},

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    var invest = [];
  	arr.forEach(function(item){
         invest.push(item.originalInvestment);
  })
  var sum = invest.reduce(function(a, b) {
  return a + b;
}, 0);

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
  //if companyid is null set to zero, otherwise +=
  totalOriginalInvestmentForCompanies: function(arr){
    var ans = {};
    arr.forEach(function(item){
        ans[`${item.company}`] = 0;
    })
    arr.forEach(function(item){
      ans[`${item.company}`] += item.originalInvestment;
    })
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
    var ans = {};
    arr.forEach(function(item){
        ans[`${item.investorId}`] = 0;
    })
    arr.forEach(function(item){
      ans[`${item.investorId}`] += item.originalInvestment;
    })
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
    // Fields to be parsed: "originalInvestment", "valueToday"
    var ans = {};
    arr.forEach(function(item){
        ans[`${item.investorId}`] = 0;
    })
    arr.forEach(function(item){
      ans[`${item.investorId}`] += item.valueToday;
    })
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
    var originalInvestments = this.totalOriginalInvestmentsByInvestors(arr);
    var currentInvestmentVal = this.totalCurrentValueOfInvestors(arr);
    var investors = Object.keys(originalInvestments);
    var investorVal = {};
    investors.forEach(function(investor) {
      investorVal[investor] = currentInvestmentVal[investor] / originalInvestments[investor];
    });
     var bigFish = investors.reduce(function(investor1, investor2){
      return (investorVal[investor1] > investorVal[investor2]) ? investor1 : investor2;
    });
    return bigFish;

  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var originalInvestments = this.totalOriginalInvestmentForCompanies(arr);
    console.log(originalInvestments);
    var list = Object.keys(originalInvestments);
    var max = 0;
    var temp;
    list.forEach(function(item) {


      if (originalInvestments[item] > max){
        temp = item;
        max = originalInvestments[item];
        console.log(temp);
        console.log(max);
      }
    })
    // return Math.max.apply( Math, list);
    return temp;
  }

}
