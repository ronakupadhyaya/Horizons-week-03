module.exports = {


  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    

    var largest_original_investment = 0;

    var newArr =  arr.map(function(obj){
      obj.originalInvestment = parseInt(obj.originalInvestment);

      if (obj.originalInvestment > largest_original_investment){
        largest_original_investment = obj.originalInvestment;
      }
      //return largest_original_investment
      
    })
    return largest_original_investment
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"

    var sum = 0;
    arr.forEach(function(obj){
      sum = sum + obj.originalInvestment
    })
    var average = sum / arr.length
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
    // Fields to be parsed: "originalInvestment", "valueToday"
    
    var company_list_object = {};
    arr.forEach(function(obj){
      if(company_list_object[obj.company]){
        company_list_object[obj.company] = company_list_object[obj.company] + obj.originalInvestment
      }else{
        company_list_object[obj.company] = obj.originalInvestment;
      }
      
    })
    return company_list_object;

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
    var company_list_object = {};
    arr.forEach(function(obj){
      if(company_list_object[obj.investorId]){
        company_list_object[obj.investorId] = company_list_object[obj.investorId] + obj.originalInvestment
      }else{
        company_list_object[obj.investorId] = obj.originalInvestment;
      }
      
    })
    return company_list_object;
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
    var company_list_object = {};
    arr.forEach(function(obj){
      if(company_list_object[obj.investorId]){
        company_list_object[obj.investorId] = company_list_object[obj.investorId] + obj.valueToday
      }else{
        company_list_object[obj.investorId] = obj.valueToday;
      }
      
    })
    return company_list_object;
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
    var curr_investments = module.exports.totalCurrentValueOfInvestors(arr);
    var original_investments = module.exports.totalOriginalInvestmentsByInvestors(arr);
    var best_investor_ratio = 0;
    var best_investor_id = 0;

    var all_investors = Object.keys(curr_investments);
    all_investors.forEach(function(investor){ //investor is "1"...
      var investor_ratio = curr_investments[investor] / original_investments[investor]
      //console.log(investor_ratio)
      if (investor_ratio > best_investor_ratio){
        best_investor_ratio = investor_ratio;
        best_investor_id = investor
      }
    })
    return best_investor_id
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var largest_original_investment = 0;
    var company_id;

    var newArr =  arr.map(function(obj){
      obj.originalInvestment = parseInt(obj.originalInvestment);

      if (obj.originalInvestment > largest_original_investment){
        largest_original_investment = obj.originalInvestment;
        company_id = obj.company;

      }
      //return largest_original_investment
      
    })
    return company_id


  }

}
