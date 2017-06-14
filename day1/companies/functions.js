module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    var highestInv = 0;
    arr.forEach(function(item, index){
      for(var key in item){
        if(key === 'originalInvestment' && item[key] > highestInv){
          highestInv = item[key];
        }
      }
    });
    return highestInv;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    var sum = 0;
    arr.forEach(function(item, index){
      for(var key in item){
        if(key === 'originalInvestment'){
          sum += item[key];
        }
      }
    });
    var average = sum/arr.length;
    return average;
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
    var object = {};
    arr.forEach(function(item, index){
        if(!(item['company'] in object)){
          object[item['company']] = item['originalInvestment'];
        } else {
          object[item['company']] = item['originalInvestment'] + object[item['company']];
        }
    });
        return object;
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
    var object = {};
    arr.forEach(function(item, index){
        if(!(item['investorId'] in object)){
          object[item['investorId']] = item['originalInvestment'];
        } else {
          object[item['investorId']] = item['originalInvestment'] + object[item['investorId']];
        }
    });
    console.log(object);
        return object;
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
    var object = {};
    arr.forEach(function(item, index){
        if(!(item['investorId'] in object)){
          object[item['investorId']] = item['valueToday'];
        } else {
          object[item['investorId']] = item['valueToday'] + object[item['investorId']];
        }
    });
        return object;
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    var highest = 0;
    var highestInv = '';
    var pastInv = this.totalOriginalInvestmentsByInvestors(arr);
    var currentInv = this.totalCurrentValueOfInvestors(arr);
    for(var key in pastInv){
      for(var key1 in currentInv){
        if(key === key1){
          var temp = currentInv[key]/pastInv[key];
          if(temp > highest){
            highest = temp;
            highestInv = key;
          }
        }
      }
    }
    return highestInv;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    var totalOri = this.totalOriginalInvestmentForCompanies(arr);
    var highest = 0;
    var highestCom = '';
    for(var key in totalOri){
      if(totalOri[key] > highest){
        highest = totalOri[key];
        highestCom = key;
      }
    }
    return highestCom;
  }
}
