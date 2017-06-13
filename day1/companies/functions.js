// Find the company that has the largest single amount of money invested. In this
// case, we are not looking for the sum of all investments made on a company. But
// the largest sum invested by one investor.
// You should iterate over the array of investments and find out the single largest
// "original investment" made on a company.
// Return the amount of the largest investment.
function singleLargestInvestment(arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var singleLargestInvestment = 0;
  arr.forEach(function(item) {
    if (item.originalInvestment > singleLargestInvestment) {
      singleLargestInvestment = item.originalInvestment;
    }
  });
  return singleLargestInvestment;
}

// Find the average of all the original investments for all companies.
// This is equal to the sum of all the original investments divided by the number
// of investments.
// Return a Number.
function averageOfOriginalInvestments(arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var sum = 0;
  var count = 0;
  arr.forEach(function(item) {
    sum += item.originalInvestment;
    count++;
  });
  return sum / count;
}

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
function totalOriginalInvestmentForCompanies(arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var totalInvestmentObject = {};
  arr.forEach(function(item) {
    if (totalInvestmentObject.hasOwnProperty(item.company)) {
      totalInvestmentObject[item.company] += item.originalInvestment;
    } else {
      totalInvestmentObject[item.company] = item.originalInvestment;
    }
  });
  return totalInvestmentObject;
}

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
function totalOriginalInvestmentsByInvestors(arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var totalInvestmentObject = {};
  arr.forEach(function(item) {
    if (totalInvestmentObject.hasOwnProperty(item.investorId)) {
      totalInvestmentObject[item.investorId] += item.originalInvestment;
    } else {
      totalInvestmentObject[item.investorId] = item.originalInvestment;
    }
  });
  return totalInvestmentObject;
}

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
function totalCurrentValueOfInvestors(arr) {
  var totalInvestmentObject = {};
  arr.forEach(function(item) {
    if (totalInvestmentObject.hasOwnProperty(item.investorId)) {
      totalInvestmentObject[item.investorId] += item.valueToday;
    } else {
      totalInvestmentObject[item.investorId] = item.valueToday;
    }
  });
  return totalInvestmentObject;
}



// To find out who the best investor is, you need to find out the ratio in which
// they made money. If they invested 100 and their todayValue is 200, they made
// 2x their investment. Calculate this for all investors and figure out who the
// best one is!
// Note: Remember to use their total of investments and the total of current value:
// using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
// Return an investorID;
function bestInvestorByValueIncrease(arr) {
  // Fields to be parsed: "originalInvestment", "valueToday"
  var bestInvestorByValueIncrease = {};
  var totalInvested = totalOriginalInvestmentsByInvestors(arr);
  var totalCurrentValue = totalCurrentValueOfInvestors(arr);
  for (var investor in totalInvested) {
    bestInvestorByValueIncrease[investor] = [totalInvested[investor]];
  }
  for (var investor in totalCurrentValue) {
    bestInvestorByValueIncrease[investor].push(totalCurrentValue[investor]);
  }
  for (var investorDetail in bestInvestorByValueIncrease) {
    bestInvestorByValueIncrease[investorDetail] = bestInvestorByValueIncrease[investorDetail][1] / bestInvestorByValueIncrease[investorDetail][0];
  }
  var bestInvestor = null;
  var bestReturn = -Infinity;
  for (var investor in bestInvestorByValueIncrease) {
    if (bestInvestorByValueIncrease[investor] > bestReturn) {
      bestInvestor = investor;
    }
  }
  return bestInvestor;
}

// Find out which company was invested the most in using the originalInvestment.
// Return a companyId
function mostInvestedCompany(arr) {
  var mostInvestedObject = totalOriginalInvestmentForCompanies(arr);
  var mostInvestedCompany = "";
  var mostInvestedAmount = 0;
  for (var company in mostInvestedObject) {
    if (mostInvestedObject[company] > mostInvestedAmount) {
      mostInvestedAmount = mostInvestedObject[company]
      mostInvestedCompany = company;
    }
  }
  return mostInvestedCompany;
}


module.exports = {
  singleLargestInvestment: singleLargestInvestment,
  averageOfOriginalInvestments: averageOfOriginalInvestments,
  totalOriginalInvestmentForCompanies: totalOriginalInvestmentForCompanies,
  totalOriginalInvestmentsByInvestors: totalOriginalInvestmentsByInvestors,
  totalCurrentValueOfInvestors: totalCurrentValueOfInvestors,
  bestInvestorByValueIncrease: bestInvestorByValueIncrease,
  mostInvestedCompany: mostInvestedCompany
}
