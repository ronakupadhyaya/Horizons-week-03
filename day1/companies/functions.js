module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.




  singleLargestInvestment: function(arr){
//MAKE AN ARRAY OF ALL INVESTMENTS
    var arrayOfInvest = []
    var highest = 0
    //PUT EACH INVESTMENT WITHIN THE ARRAY
    arr.forEach(function(dataGroup) {
      arrayOfInvest.push(dataGroup.originalInvestment)
    })
    //LOOP THROUGH ARRAY AND COMPARE TO HIGHEST
    for (var i = 0; i<arrayOfInvest.length; i++) {
      if(arrayOfInvest[i]>highest) {
        highest = arrayOfInvest[i]
      }
    }
    return highest

  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    //MAKE AN ARRAY OF ALL INVESTMENTS
        var arrayOfInvest = []
        var sumOf = 0
        //PUT EACH INVESTMENT WITHIN THE ARRAY
        arr.forEach(function(dataGroup) {
          arrayOfInvest.push(dataGroup.originalInvestment)
        })
        //LOOP THROUGH ARRAY AND ADD
        for (var i = 0; i<arrayOfInvest.length; i++) {
            sumOf += arrayOfInvest[i]
        }

        var average = sumOf/arrayOfInvest.length
        return average

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
//MAKE AN OBJECT TO STORE THE INVESTMENTS
    var orgInvest = {}
//FOR EACH COMPANY
for (var i = 1; i<11; i++) {
  //SET A VARIABLE FOR THE TOTAL
  var totalOrg = 0
//LOOP THROUGH EACH DATAGROUP
      arr.forEach(function(dataGroup) {
      //IF YOU FIND THE COMPANY
        if(dataGroup.company == i) {
          //ADD ITS INVESTMENT TO THE TOTAL
          totalOrg += dataGroup.originalInvestment
        }
      })
      //SET A KEY VALUE PAIR IN THE OBJECT
        orgInvest[i] = totalOrg
    }
return orgInvest
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
    //MAKE AN OBJECT TO STORE THE INVESTMENTS
        var orgInvest = {}
    //FOR EACH INVESTOR
    for (var i = 1; i<11; i++) {
      //SET A VARIABLE FOR THE TOTAL
      var totalOrg = 0
    //LOOP THROUGH EACH DATAGROUP
          arr.forEach(function(dataGroup) {
          //IF YOU FIND THE IEVESTOR
            if(dataGroup.investorId == i) {
              //ADD ITS INVESTMENT TO THE TOTAL
              totalOrg += dataGroup.originalInvestment
            }
          })
          //SET A KEY VALUE PAIR IN THE OBJECT
            orgInvest[i] = totalOrg
        }
    return orgInvest
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
    //MAKE AN OBJECT TO STORE THE INVESTMENTS
        var currentInvest = {}
    //FOR EACH INVESTOR
    for (var i = 1; i<11; i++) {
      //SET A VARIABLE FOR THE TOTAL
      var totalCurrent = 0
    //LOOP THROUGH EACH DATAGROUP
          arr.forEach(function(dataGroup) {
          //IF YOU FIND THE INVESTOR
            if(dataGroup.investorId == i) {
              //ADD ITS INVESTMENT TO THE TOTAL
              totalCurrent += dataGroup.valueToday
            }
          })
          //SET A KEY VALUE PAIR IN THE OBJECT
            currentInvest[i] = totalCurrent
        }
    return currentInvest

  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    //MAKE AN ARRAY TO MAP THE DIFFERENCE
    var difference = []
    var original = module.exports.totalOriginalInvestmentsByInvestors(arr)
    var current = module.exports.totalCurrentValueOfInvestors(arr)
    highestVal = 0
    highestID = 0
//LOOP THOUGH THE KEYS OF CURRENT AND ORIGINAL AND PUSH THE DIFFERENCE INTO A NEW ARRAY
    for (var i = 1; i<11; i++) {
      difference.push(current[i]/original[i])
    }
//LOOP THROUGH THAT NEW ARRAY AND FIND THE HIGHEST VALUE
    for (var i = 0; i<10; i++) {
      if (difference[i]>highestVal) {
        highestVal = difference[i]
        highestID = i+1
        }
      }

return highestID + ""
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
//GET ARRAY OF ORIGINAL INVESTMENTS
    var arrayOriginal = module.exports.totalOriginalInvestmentForCompanies(arr)
    var highestOriginal = 0
    var highestId = 0
//FIND HIGHEST AND SAVE
for (var i = 1; i<11; i++) {
  if(arrayOriginal[i]>highestOriginal) {
    highestOriginal = arrayOriginal[i]
    highestId = i
  }
}
return highestId + ""
  }
}
