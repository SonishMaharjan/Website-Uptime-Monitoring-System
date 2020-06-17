/*
 * Test runner
 */

//Application logic for the test runner
_app = {};

//Constainer for the tests
_app.tests = {};

_app.tests.unit = require("./unit");

//count all the tests
_app.countTests = function () {
  var counter = 0;
  for (var key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)) {
      var subTests = _app.tests[key];
      for (var testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          counter++;
        }
      }
    }
  }
  return counter;
};

//run all the test, collecting the errors and sucessess
_app.runTests = function () {
  var errors = [];
  var sucessess = 0;
  var limit = _app.countTests();
  var counter = 0;

  for (var key in _app.tests) {
    var subTests = _app.tests[key];
    for (var testName in subTests) {
      if (subTests.hasOwnProperty(testName)) {
        let tempTestName = testName;
        let testValue = subTests[testName];

        //Call the test
        try {
          //testVaule is reference of funtion
          testValue(function () {
            //If it call back without throwing, then is succeeded, so logi it in green
            console.log("\x1b[32m%s\x1b[0m", tempTestName);
            counter++;
            sucessess++;
            if (counter == limit) {
              _app.produceTestReport(limit, sucessess, errors);
            }
            // console.log(subTests);
            // console.log("key---");
            // console.log(key);
          }, tempTestName);
        } catch (e) {
          //If it throws, then it failed, so capture the error thrown and log it in  red
          errors.push({
            name: testName,
            error: e,
          });
          console.log("\x1b[31m%s\x1b[0m", tempTestName);
          counter++;
          if (counter == limit) {
            _app.produceTestReport(limit, sucessess, errors);
          }
        }
      }
    }
  }
};

//Product a test outcome report
_app.produceTestReport = function (limit, successes, errors) {
  console.log("");
  console.log("------------------BEGIN TEST REPORT--------------");
  console.log("");
  console.log("Total Tests: ", limit);
  console.log("Pass: ", successes);
  console.log("Fail: ", errors.length);

  //If there aree errors., print them in detail
  if (errors.length > 0) {
    console.log("--------BEGIN ERROR DETAILS---------");
    console.log("");

    errors.forEach(function (testError) {
      console.log("\x1b[31m%s\x1b[0m", testError.name);
      console.log(testError.error);
      console.log("");
    });
    console.log("--------END ERROR DETAILS---------");
  }
  console.log("");
  console.log("--------END TEST REPORT---------");
};

//Run the test
_app.runTests();
