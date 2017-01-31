// console.log(process.argv);
if(process.argv.length<4){
  console.log("Need more than 4 arguments");
  console.log("Usage: node app.js --(product/sum) arg1 arg2 ...");
}

else{
  if((process.argv[2]).substring(0,2) !== '--'){
    console.log("Error: no flag was given");
    console.log("Usage: node app.js --(product/sum) arg1 arg2 ...")
  }

  else{
    if(process.argv[2] === '--product'){
      var result =1;
      for(var i = 3; i < process.argv.length; i++){
          result*=parseFloat(process.argv[i]);
      }
      console.log('result is %d',result);
    }
    else if (process.argv[2] === '--sum'){
      var result =0;
      for(var i = 3; i < process.argv.length; i++){
          result+=parseFloat(process.argv[i]);
      }
      console.log('result is %d',result);
    }
    else{
      console.log("Error: wrong flag");
    }
  }
}
