/*
 * Primary file for API
 */

//Dependency
var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;

// Ther server should respond to all requests with a string
var server = http.createServer(function (req, res) {
  //Get the URL and parse it
  //if true parse the query string
  var parsedUrl = url.parse(req.url, true);

  //Get the path //if url is http://localhost.com:3000/users -> path is users
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  //Get the query string as an object
  var queryStringObject = parsedUrl.query;

  //Get the HTTP method
  var method = req.method.toLowerCase();

  //Get headers as an object
  var headers = req.headers;

  //Get playloads, if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";

  req.on("data", function (data) {
    buffer += decoder.write(data);
  });

  req.on("end", function () {
    buffer += decoder.end();

    //Send the response
    res.end("Hello world\n");

    //Log the request path
    console.log("the request playload is : ", buffer);
  });
});

//Get the url and parse it

//Start the server, and have it listten on port 3000
server.listen(3000, function () {
  console.log("The server is listening on port 3000 now.");
});
