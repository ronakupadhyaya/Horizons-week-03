# Pair Programming Exercise: Investment Reports

## Goal

The goal of this exercise is for you to get familiar with node. We will cover the basics about node, npm, the package.json file and running your app. You will build an investment report app  that takes in two `CSV` files and performs some calculations with the data on the files. CSV stands for "comma-separated values". It is a format to store tables of data such as spreadsheets, separating each column with commas.

TODO Insert csv file capture.

The first line on the CSV file you will get looks like this: `id, investorId, company, originalInvestment, valueToday`. This is the header of the file and specifies the names of the columns for all the file. A single data entry looks like this: `10, 2, 6, 234000, 563000` and when you convert it to JSON it will look like this:

```javascript
{
  id: 1,
  investorId: 1,
  company: 9,
  originalInvestment: 100000,
  valueToday: 1000000
}
```

Your app will perform calculations on these JSON objects to find out the best investors, companies with more money and so on.

## Instructions

### Step 1: Setting up the project
1. To begin this project, install node jasmine by doing `npm install jasmine-node -g` to intall the tests plugin on your computer.
1. Add the csvtojson module to your project by doing `npm i --save csvtojson`. Using the flag `--save` stores the module on your `package.json` file
1. Run `npm install` to install all the required modules to your project.
1. Currently, running `npm test` prints out 'Error: no test specified'. Add `jasmine-node spec` to your `package.json` file. It should look like this

```javascript   
  "scripts": {
    "test": "jasmine-node spec"
  }
```

Run `npm test` again to verify your tests are now running. It should output this test screen:

TODO Add capture of running rests

### Step 2: Calculating Results

1. De

 npm install -s csvjson
 
