module.exports = {
  singleLargestInvestment: singleLargestInvestment,
  averageOfOriginalInvestments: averageOfOriginalInvestments,
  totalOriginalInvestmentForCompanies: totalOriginalInvestmentForCompanies,
  totalOriginalInvestmentsByInvestors: totalOriginalInvestmentsByInvestors,
  totalCurrentValueOfInvestors: totalCurrentValueOfInvestors,
  bestInvestorByValueIncrease: bestInvestorByValueIncrease,
  mostInvestedCompany: mostInvestedCompany
}

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  function singleLargestInvestment (arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var largestInvestment = 0;
    arr.forEach(function(investment){
      largestInvestment = investment.originalInvestment > largestInvestment ? investment.originalInvestment: largestInvestment;
    })
    return largestInvestment;
  }

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  function averageOfOriginalInvestments (arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var averageInvestment = 0;
    arr.forEach(function(investment, index) {
      averageInvestment = (averageInvestment*(index)+investment.originalInvestment)/(index+1)
    })

    return averageInvestment;
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
  function totalOriginalInvestmentForCompanies (arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var companyInvestmentList = {};
    arr.forEach(function(investment){
      if (companyInvestmentList.hasOwnProperty(investment.company)) {
        companyInvestmentList[investment.company] += investment.originalInvestment
      } else {
        companyInvestmentList[investment.company] = investment.originalInvestment;
      }
    });
    return companyInvestmentList;
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
  function totalOriginalInvestmentsByInvestors (arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var investorInvestmentList = {};
    arr.forEach(function(investment){
      if (investorInvestmentList.hasOwnProperty(investment.investorId)) {
        investorInvestmentList[investment.investorId] += investment.originalInvestment
      } else {
        investorInvestmentList[investment.investorId] = investment.originalInvestment;
      }
    });
    return investorInvestmentList;
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
function totalCurrentValueOfInvestors (arr){
    var investorInvestmentList = {};
    arr.forEach(function(investment){
      if (investorInvestmentList.hasOwnProperty(investment.investorId)) {
        investorInvestmentList[investment.investorId] += investment.valueToday
      } else {
        investorInvestmentList[investment.investorId] = investment.valueToday;
      }
    });
    return investorInvestmentList;
  }


  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  function bestInvestorByValueIncrease (arr){
    // Fields to be parsed: "originalInvestment", "valueToday"

    var currentValueOfInvestors = totalCurrentValueOfInvestors(arr);
    var originalValueOfInvestors = totalOriginalInvestmentsByInvestors(arr);
    var highestReturn = 0;
    var bestInvestor = "";
    for(var investor in currentValueOfInvestors){
      var roi = currentValueOfInvestors[investor]/originalValueOfInvestors[investor];
      if(roi > highestReturn) {
        highestReturn = roi;
        bestInvestor = investor;
      }
    }
    return bestInvestor;
  }

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  function mostInvestedCompany (arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var originalInvestmentByCompanies = totalOriginalInvestmentForCompanies(arr);
    var highest = 0;
    var highestCompany = "";
    for(var company in originalInvestmentByCompanies){
      if(originalInvestmentByCompanies[company] > highest){
        highest = originalInvestmentByCompanies[company];
        highestCompany = company;
      }
    }
    return highestCompany;
  }
