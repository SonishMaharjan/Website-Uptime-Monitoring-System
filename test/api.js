/*
API TESTS

*/

//Dependencies
var app = require("./../index");
var assert = require("assert");
var http = require("http");
var config = require("./../lib/config");

//Holder fot the testst
var api = {};

var helpers = {};

helpers.makeGetRequest = function (path, callback) {
  //configure the request details
  var requestDetails = {
    protocol: "http:",
    hostname: "localhost",
    port: config.httpPort,
    method: "GET",
    path: path,
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Send the request
  var req = http.request(requestDetails, function (res) {
    callback(res);
  });
  req.end();
};

//the main init() function should be able to run without throwing
api["app.init should start without throwing"] = function (done) {
  assert.doesNotThrow(function () {
    app.init(function (err) {
      done();
    });
  }, TypeError);
};

//make a request to /ping
api["/ping should respond to GET with 200"] = function (done) {
  helpers.makeGetRequest("/ping", function (res) {
    assert.equal(res.statusCode, 200);
    done();
  });
};

//Make a request to /api/users
api["/api/user should respond to GET with 400"] = function (done) {
  helpers.makeGetRequest("/api/users", function (res) {
    assert.equal(res.statusCode, 400);
    done();
  });
};

//Make a request to  random path
api["random path should respond to GET with 404"] = function (done) {
  helpers.makeGetRequest("/random_path", function (res) {
    assert.equal(res.statusCode, 404);
    done();
  });
};

//Export the testst to the runner
module.exports = api;
