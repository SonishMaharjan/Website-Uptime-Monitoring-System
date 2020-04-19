/*
 * Primary file for API
 */

//Dependency
var http = require("http");
var https = require("https");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
var config = require("./config");
var fs = require("fs");

// Instantiating http server
var httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

//Instatiating https server
var httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem"),
};

var httpsServer = https.createServer(httpsServerOptions, function (
  req,
  res
) {});

//Start the http server, and have it listten on port 3000
httpServer.listen(config.httpPort, function () {
  console.log(
    "The server is listening on port " +
      config.httpPort +
      "in " +
      config.envName +
      " now."
  );
});

//Start https server
httpsServer.listen(config.httpsPort, function () {
  console.log(
    "The server is listening on port " +
      config.httpsPort +
      "in " +
      config.envName +
      " now."
  );
});

//All the server  logic for both http and https server
var unifiedServer = function (req, res) {
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

  //Get payloads, if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";

  req.on("data", function (data) {
    buffer += decoder.write(data);
  });

  req.on("end", function () {
    buffer += decoder.end();

    //Choose the handleer this request should got to , no handler send it to not found handler
    var chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    //Construct the data object to send to the handler
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer,
    };

    //Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {
      //Use the status code called back by the handler, or default  to 200
      statusCodue = typeof statusCode == "number" ? statusCode : 200;

      //Use the payload called backed by the handler, or default to empty object
      payload = typeof payload == "object" ? payload : {};

      //Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      //Return the response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      //log the response
      console.log("Returning this response:", statusCode, payloadString);
    });

    //Log the request path
    // console.log("Retrutn: ", buffer);
  });
};

//Define handlers
var handlers = {};

handlers.sample = function (data, callback) {
  callback(406, { name: "sample handler is in callback" });
};

handlers.notFound = function (data, callback) {
  callback(404);
};

// Define a request router
var router = {
  sample: handlers.sample,
};
