module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
arr.forEach(function(item){
  item.originalInvestment = parseInt(item.originalInvestment);
  item.valueToday = parseInt(item.valueToday);
})
var array = arr.slice();
array.sort(function(a,b){
  return a.originalInvestment - b.originalInvestment;
})
return array[array.length - 1].originalInvestment;

  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
var array = [];
arr.forEach(function(item){
  array.push(item.originalInvestment);
})
var array1 = array.reduce(function(a,b){
  return a + b;
})
return array1 / array.length

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

var array = [];
var array1 = [];
var array2 = [];
var array3 = [];
var array4 = [];
var array5 = [];
var array6 = [];
var array7 = [];
var array8 = [];
var array9 = [];

arr.forEach(function(item){
  if(item.company === '1'){
    array.push(item.originalInvestment);

  }
  if(item.company === '2'){
    array1.push(item.originalInvestment);

  }if(item.company === '3'){
    array2.push(item.originalInvestment);

  }if(item.company === '4'){
    array3.push(item.originalInvestment);

  }if(item.company === '5'){
    array4.push(item.originalInvestment);

  }if(item.company === '6'){
    array5.push(item.originalInvestment);

  }if(item.company === '7'){
    array6.push(item.originalInvestment);

  }if(item.company === '8'){
    array7.push(item.originalInvestment);

  }if(item.company === '9'){
    array8.push(item.originalInvestment);

  }if(item.company === '10'){
    array9.push(item.originalInvestment);

  }

})
console.log(array)
var obj = {
  1: array.reduce(function(a,b){
    return a + b;
  }),
  2: array1.reduce(function(a,b){
    return a + b;
  }),
  3: array2.reduce(function(a,b){
    return a + b;
  }),
  4: array3.reduce(function(a,b){
    return a + b;
  }),
  5: array4.reduce(function(a,b){
    return a + b;
  }),
  6: array5.reduce(function(a,b){
    return a + b;
  }),
  7: array6.reduce(function(a,b){
    return a + b;
  }),
  8: array7.reduce(function(a,b){
    return a + b;
  }),
  9: array8.reduce(function(a,b){
    return a + b;
  }),
  10: array9.reduce(function(a,b){
    return a + b;
  })
}
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
    var array = [];
    var array1 = [];
    var array2 = [];
    var array3 = [];
    var array4 = [];
    var array5 = [];
    var array6 = [];
    var array7 = [];
    var array8 = [];
    var array9 = [];

    arr.forEach(function(item){
      if(item.investorId === '1'){
        array.push(item.originalInvestment);

      }
      if(item.investorId === '2'){
        array1.push(item.originalInvestment);

      }if(item.investorId === '3'){
        array2.push(item.originalInvestment);

      }if(item.investorId === '4'){
        array3.push(item.originalInvestment);

      }if(item.investorId === '5'){
        array4.push(item.originalInvestment);

      }if(item.investorId === '6'){
        array5.push(item.originalInvestment);

      }if(item.investorId === '7'){
        array6.push(item.originalInvestment);

      }if(item.investorId === '8'){
        array7.push(item.originalInvestment);

      }if(item.investorId === '9'){
        array8.push(item.originalInvestment);

      }if(item.investorId === '10'){
        array9.push(item.originalInvestment);

      }

    })
    console.log(array)
    console.log(array1)
    var obj = {
      1: array.reduce(function(a,b){
        return a + b;
      }),
      2: array1.reduce(function(a,b){
        return a + b;
      }),
      3: array2.reduce(function(a,b){
        return a + b;
      }),
      4: array3.reduce(function(a,b){
        return a + b;
      }),
      5: array4.reduce(function(a,b){
        return a + b;
      }),
      6: array5.reduce(function(a,b){
        return a + b;
      }),
      7: array6.reduce(function(a,b){
        return a + b;
      }),
      8: array7.reduce(function(a,b){
        return a + b;
      }),
      9: array8.reduce(function(a,b){
        return a + b;
      }),
      10: array9.reduce(function(a,b){
        return a + b;
      })
    }
    return obj



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
    var array = [];
    var array1 = [];
    var array2 = [];
    var array3 = [];
    var array4 = [];
    var array5 = [];
    var array6 = [];
    var array7 = [];
    var array8 = [];
    var array9 = [];

    arr.forEach(function(item){
      if(item.investorId === '1'){
        array.push(item.valueToday);

      }
      if(item.investorId === '2'){
        array1.push(item.valueToday);

      }if(item.investorId === '3'){
        array2.push(item.valueToday);

      }if(item.investorId === '4'){
        array3.push(item.valueToday);

      }if(item.investorId === '5'){
        array4.push(item.valueToday);

      }if(item.investorId === '6'){
        array5.push(item.valueToday);

      }if(item.investorId === '7'){
        array6.push(item.valueToday);

      }if(item.investorId === '8'){
        array7.push(item.valueToday);

      }if(item.investorId === '9'){
        array8.push(item.valueToday);

      }if(item.investorId === '10'){
        array9.push(item.valueToday);

      }

    })
    console.log(array)
    console.log(array1)
    var obj = {
      1: array.reduce(function(a,b){
        return a + b;
      }),
      2: array1.reduce(function(a,b){
        return a + b;
      }),
      3: array2.reduce(function(a,b){
        return a + b;
      }),
      4: array3.reduce(function(a,b){
        return a + b;
      }),
      5: array4.reduce(function(a,b){
        return a + b;
      }),
      6: array5.reduce(function(a,b){
        return a + b;
      }),
      7: array6.reduce(function(a,b){
        return a + b;
      }),
      8: array7.reduce(function(a,b){
        return a + b;
      }),
      9: array8.reduce(function(a,b){
        return a + b;
      }),
      10: array9.reduce(function(a,b){
        return a + b;
      })
    }
    return obj

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
    var original = this.totalOriginalInvestmentsByInvestors(arr);
    var value = this.totalCurrentValueOfInvestors(arr);
    var arrayMax = [];
    arrayMax.push(value[1]/original[1]);
    arrayMax.push(value[2]/original[2]);
    arrayMax.push(value[3]/original[3]);
    arrayMax.push(value[4]/original[4]);
    arrayMax.push(value[5]/original[5]);
    arrayMax.push(value[6]/original[6]);
    arrayMax.push(value[7]/original[7]);
    arrayMax.push(value[8]/original[8]);
    arrayMax.push(value[9]/original[9]);
    arrayMax.push(value[10]/original[10]);


    console.log(arrayMax)
    function getMaxOfArray(array){
      return Math.max.apply(null, array)
    }
    for(var i =0; i<arrayMax.length; i++)
    if(getMaxOfArray(arrayMax) === arrayMax[i]){
      var num = i + 1;
      var stringNum = num.toString();
      return stringNum;
    }




  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var original = this.totalOriginalInvestmentForCompanies(arr);
    var arrayMax = [];
    arrayMax.push(original[1]);
    arrayMax.push(original[2]);
    arrayMax.push(original[3]);
    arrayMax.push(original[4]);
    arrayMax.push(original[5]);
    arrayMax.push(original[6]);
    arrayMax.push(original[7]);
    arrayMax.push(original[8]);
    arrayMax.push(original[9]);
    arrayMax.push(original[10]);


    console.log(arrayMax)
    function getMaxOfArray(array){
      return Math.max.apply(null, array)
    }
    for(var i =0; i<arrayMax.length; i++)
    if(getMaxOfArray(arrayMax) === arrayMax[i]){
      var num = i + 1;
      var stringNum = num.toString();
      return stringNum;
    }

  }

}
