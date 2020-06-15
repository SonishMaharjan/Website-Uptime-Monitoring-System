/*
 *Primary file for the api
 */

//Dependencies
var server = require("./lib/server");
var workers = require("./lib/workers");
var cli = require("./lib/cli");
var exampleDebuggingProblem = require("./lib/exampleDebuggingProblem");

//Declare the app
var app = {};

//Init function
app.init = function () {
  debugger;
  //Start the server
  server.init();

  //Start the workers
  workers.init();

  //Start the CLI, but make sure it starts at last
  setTimeout(function () {
    cli.init();
  }, 50);

  debugger;
  var foo = 1;
  console.log("set the foo 1");
  debugger;

  //Increment  foo;
  foo++;
  console.log("incremet foo 1");
  debugger;

  //Square foo
  foo = foo * foo;
  console.log("squared the foo");
  debugger;

  //convert foo to string
  foo = foo.toString();
  console.log("foo converted to string");
  debugger;

  //call init to throw the string
  // exampleDebuggingProblem.init();
  console.log("expample debugging init called");
  debugger;
};

//Execute
app.init();

//Export the app
module.exports = app;
