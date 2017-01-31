module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"

    var returnObj;
    var num = 0;

    arr.forEach(function(item){

      if(item.originalInvestment > num){

        returnObj = item;
        num = item.originalInvestment;
      }

    });

    return num;

  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"


    var sum = 0;

    arr.forEach(function(item){

      sum += item.originalInvestment;

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

    var myObj = {};

    arr.forEach(function(item){

      if(myObj[item.company] === undefined){
        myObj[item.company] = item.originalInvestment;
      } else{

        myObj[item.company] += item.originalInvestment;
      }
    });

    return myObj;

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

    var myObj = {};

    arr.forEach(function(item){

      if(myObj[item.investorId] === undefined){
        myObj[item.investorId] = item.originalInvestment;
      } else{

        myObj[item.investorId] += item.originalInvestment;
      }
    });

    return myObj;
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
<<<<<<< HEAD

    var myObj = {};

    arr.forEach(function(item){

      if(myObj[item.investorId] === undefined){
        myObj[item.investorId] = item.valueToday;
      } else{

        myObj[item.investorId] += item.valueToday;
      }
    });

    return myObj;

=======
  totalCurrentValueOfInvestors: function(arr){
>>>>>>> master
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

    var myObj = {};

    arr.forEach(function(item){

      if(myObj[item.investorId] === undefined){
        myObj[item.investorId] = {

          'valueToday': item.valueToday,
          'originalInvestment': item.originalInvestment
        }
      } else{

        myObj[item.investorId].valueToday += item.valueToday;
        myObj[item.originalInvestment] += item.originalInvestment;
      }
    });

    var bestReturn = 0;
    var bestInvestor;

    for(var k in myObj){
      var currRet = myObj[k].valueToday / myObj[k].originalInvestment;
      if(currRet > bestReturn){
        bestReturn = currRet;
        bestInvestor = k;
      }
    }

    return bestInvestor;


  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"


    var myObj = this.totalOriginalInvestmentForCompanies(arr);


    var bestReturn = 0;
    var bestCompany;


    for(var k in myObj){
      var currRet = myObj[k];
      if(currRet > bestReturn){
        bestReturn = currRet;
        bestCompany = k;
      }
    }
    console.log(bestCompany);
    return bestCompany;





  }

}
