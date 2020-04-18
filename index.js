/*
 * Primary file for API
 */

//Dependency
var http = require("http");

// Ther server should respond to all requests with a string
var server = http.createServer(function (req, res) {
  res.end("Hello world\n");
});

//Start the server, and have it listten on port 3000
server.listen(3000, function () {
  console.log("The server is listening on port 3000 now.");
});
