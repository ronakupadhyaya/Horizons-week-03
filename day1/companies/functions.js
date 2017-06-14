var app = require('./app.js');
  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  // ex. fileReader('investments1.csv') ->
  //   [ { id: '1',
  //      investorId: '1',
  //      company: '9',
  //      originalInvestment: '1100000',
  //      valueToday: '1000000' },
  //    { id: '2',
  //      investorId: '1',
  //      company: '1',
  //      originalInvestment: '200000',
  //      valueToday: '190000' },
  //    { id: '3',
  //      investorId: '5',
  //      company: '10',
  //      originalInvestment: '234000',
  //      valueToday: '300000' },
  //      ...
  //    ]


function singleLargestInvestment (arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var newArr = app.parser(arr);
  var max = 0;
  newArr.forEach(function(x){
    if(x.originalInvestment > max) {
      max = x.originalInvestment;
    }
  })
  return max;
};

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
function averageOfOriginalInvestments (arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var newArr = app.parser(arr);
  var sum = 0;
  newArr.forEach(function(x){
    sum = sum + x.originalInvestment;
  });
  return (sum / arr.length);
};

  // !!!!!!!!!Find out how much a company got as the original investments. In this case, You
  // will have to iterate over the companies and find all the investments for each
  // company and add them up to find how much money they started with.
  // Return an object that contains company ids as keys and their total original investment
  // as values. The object's structure should look something like this:
  // {
  //  1: 595000,
  //  2: 1024000,
  //   ...
  // }
function totalOriginalInvestmentForCompanies (arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var newArr = app.parser(arr);
  var sum = {};
  newArr.forEach(function(x){
    if(sum[x.company]){
      sum[x.company] = sum[x.company] + x.originalInvestment;
    } else {
      sum[x.company] = x.originalInvestment;
    }
  })
  return sum;
};

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
function totalOriginalInvestmentsByInvestors (arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var sum = {};
  var newArr = app.parser(arr);
  newArr.forEach(function(x){
    if(sum[x.investorId]){
      sum[x.investorId] = sum[x.investorId] + x.originalInvestment;
    } else {
      sum[x.investorId] = x.originalInvestment;
    }
  });
  return sum;
};

  // !!!!!This function is similar to the one above, but it returns the current value
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
function totalCurrentValueOfInvestors (arr) {
  var sum = {};
  var newArr = app.parser(arr);
  newArr.forEach(function(x){
    if(sum[x.investorId]){
      sum[x.investorId] = sum[x.investorId] + x.valueToday;
    } else {
      sum[x.investorId] = x.valueToday;
    }
  })
  return sum;
};

  //!!! To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
function bestInvestorByValueIncrease (arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var highest = 0;
  var best = 0;
  var investors = [1,2,3,4,5,6,7,8,9,10]
  var current = totalCurrentValueOfInvestors(arr);
  var original = totalOriginalInvestmentsByInvestors(arr);
  investors.forEach(function(x){
    var now = current[x]/original[x];
    if(now > highest){
      highest = now;
      best = x;
    }
  });
  return best.toString();
};

  //!! Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
function mostInvestedCompany (arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var highest = 0;
  var best = 0;
  var companies = [1,2,3,4,5,6,7,8,9,10];
  var original = totalOriginalInvestmentForCompanies(arr);
  companies.forEach(function(x){
    if(original[x] > highest){
      highest = original[x];
      best = x;
    }
  });
  return best.toString();
};


module.exports = {
  singleLargestInvestment: singleLargestInvestment,
  averageOfOriginalInvestments: averageOfOriginalInvestments,
  totalOriginalInvestmentForCompanies: totalOriginalInvestmentForCompanies,
  totalOriginalInvestmentsByInvestors: totalOriginalInvestmentsByInvestors,
  totalCurrentValueOfInvestors: totalCurrentValueOfInvestors,
  bestInvestorByValueIncrease: bestInvestorByValueIncrease,
  mostInvestedCompany: mostInvestedCompany
};
