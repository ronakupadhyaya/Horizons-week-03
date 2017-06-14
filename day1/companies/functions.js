module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    // //return company
    var max = 0;
    arr.forEach(function(i) {
      max = i.originalInvestment > max ? i.originalInvestment : max;
    });
    return max;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var or = [];
    arr.forEach(function(i) {
      or.push(i.originalInvestment);
    })
    var sum = or.reduce(function(a,b) {
      return a + b;
    });
    return sum/arr.length;
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
    var obj = new Object();
    arr.forEach(function(inv) {
      var comp = inv.company;
      if (obj.hasOwnProperty(comp)){
        obj[comp] += inv.originalInvestment;
      }
      else {
        obj[comp] = inv.originalInvestment;
      }
    })
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
    var obj = new Object();
    arr.forEach(function(inv) {
      var id = inv.investorId;
      if (obj.hasOwnProperty(id)){
        obj[id] += inv.originalInvestment;
      }
      else {
        obj[id] = inv.originalInvestment;
      }
    })
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
    var obj = new Object();
    arr.forEach(function(inv) {
      var id = inv.investorId;
      if (obj.hasOwnProperty(id)){
        obj[id] += inv.valueToday;
      }
      else {
        obj[id] = inv.valueToday;
      }
    });

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
    // Fields to be parsed: "originalInvestment", "value
    obj = new Object();
    cur = this.totalCurrentValueOfInvestors(arr);
    ori = this.totalOriginalInvestmentsByInvestors(arr);
    arr.forEach(function(inv){
      id = inv.investorId;
      curInv = cur[id];
      oriInv = ori[id];
      obj[id] = curInv/oriInv
    })
    // return obj;
    //obj of ratios //get max ratio
    maxInv = 0;
    max = 0;
    for (var key in obj) {
      if (maxInv < obj[key]) {
        max = key;
        maxInv = obj[key];
      }
    }
    return max;


  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    var inv = this.totalOriginalInvestmentForCompanies(arr);
    maxInv = 0;
    max = 0;
    for (var key in inv) {
      if (maxInv < inv[key]) {
        max = key;
        maxInv = inv[key];
      }
    }
    return max;
  }

}
