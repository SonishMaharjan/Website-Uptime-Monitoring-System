/*
 *Primary file for the api
 */

//Dependencies
var server = require("./lib/server");
var workers = require("./lib/workers");
var cli = require("./lib/cli");
var cluster = require("cluster");
var os = require("os");

//Declare the app
var app = {};

//Init function
app.init = function (callback) {
  // if onthe master thread, start the background workers and CLI
  if (cluster.isMaster) {
    //Start the workers
    workers.init();

    //Start the CLI, but make sure it starts at last
    setTimeout(function () {
      cli.init();
      callback();
    }, 50);

    //Fork the process
    for (var i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }
  } else {
    //if not in the master threade run server
    //Start the server
    server.init();
  }
};

//self invoking only  if required directly
if (require.main == module) {
  app.init(function () {});
}

//Export the app
module.exports = app;
