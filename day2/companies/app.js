"use strict";
var fs = require('fs');
var investmentCalc = require("./functions");
const csv=require('csvtojson')

//var exports = module.exports = {};
var multiply = function (multiplier1, multiplier2) {

};

// Do a function that imports csv 1 +2
const csvFilePath='Workbook1.csv'
let arr = [];

csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
//  console.log(jsonObj.Company)
  arr.push(jsonObj)
})
.on('done',(error)=>{
    //console.log(arr)

    var asd = investmentCalc.largestInvestment(arr);
    console.log(asd);
})


 //
 // function averageInvestment
 // bestInvestor
 // company with most Capital?
 // Percent growth return OriginalCapital(1+x)=F
 // Total for company
 // total for investor.


 // Json report.
 // Concatenate files








module.exports = {
  multiply
}
