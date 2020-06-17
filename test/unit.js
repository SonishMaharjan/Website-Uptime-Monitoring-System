/*
Unit test

*/

//Dependencies
var helpers = require("./../lib/helpers");
var assert = require("assert");
var logs = require("./../lib/logs");
var exampleDebuggingProblem = require("./../lib/exampleDebuggingProblem");

//Container
var unit = {};

//Assert that the getANumber function is returning a number
unit["helpers.getANumber should return a number"] = function (done, tempVal) {
  var val = helpers.getANumber();
  assert.equal(typeof val, "number");
  done();
};

//Assert that the getANumber function is returning a 1
unit["helpers.getANumber should return a number 1"] = function (done, tempVal) {
  var val = helpers.getANumber();
  assert.equal(val, 1);
  done();
};

//Assert that the getANumber function is returning a 2
unit["helpers.getANumber return a number 2"] = function (done, tempVal) {
  var val = helpers.getANumber();
  assert.equal(val, 2);
  done();
};

//Logs.list shoud callback an array and a false error
unit[
  "logs.list shouch callback a false error and an array of log names"
] = function (done, tempVal) {
  //@todo remove
  var myvar = "haha my varl";
  logs.list(true, function (err, logFileNames) {
    assert.equal(err, false);
    assert.ok(logFileNames instanceof Array);
    assert.ok(logFileNames.length > 1);
    done();
  });
};

//Logs.truncate shoud not throw error if id doesnot exist
unit["log.truncate does not throw error if the id doesnot exist"] = function (
  done,
  tempVal
) {
  assert.doesNotThrow(function () {
    logs.truncate("I do not exist", function (err) {
      assert.ok(err);
      done();
    });
  }, TypeError);
};

//ExampleDebugging.init should not throw but it does
unit["exampleDebuggingExample.init shoulnot  throw error "] = function (
  done,
  tempVal
) {
  assert.doesNotThrow(function () {
    exampleDebuggingProblem.init();
    done();
  }, TypeError);
};

//Ecxport test
module.exports = unit;
