/*
 * server-related tasks
 */

require("dotenv").config();

//Dependency
var http = require("http");
var https = require("https");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
var fs = require("fs");

//My lib
var config = require("./config");
var handlers = require("./handlers");
var helpers = require("./helpers");
var path = require("path");
var util = require("util");

var debug = util.debuglog("server");

//Instantiate the server module object
var server = {};

// Instantiating http server
server.httpServer = http.createServer(function (req, res) {
  server.unifiedServer(req, res);
});

//Instatiating https server
server.httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, "../https/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../https/cert.pem")),
};

server.httpsServer = https.createServer(server.httpsServerOptions, function (
  req,
  res
) {
  server.unifiedServer(req, res);
});

//All the server  logic for both http and https server
server.unifiedServer = function (req, res) {
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

  //call every time when the payload is received
  req.on("data", function (data) {
    //data is in binary form
    buffer += decoder.write(data);
  });

  req.on("end", function () {
    buffer += decoder.end();

    //Choose the handleer this request should got to , no handler send it to not found handler
    var chosenHandler =
      typeof server.router[trimmedPath] !== "undefined"
        ? server.router[trimmedPath]
        : handlers.notFound;

    //Construct the data object to send to the handler
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parseJsonToObject(buffer),
    };

    //Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload, contentType) {
      //Determine the type of response(fallback to JSON)
      contentType = typeof contentType == "string" ? contentType : "json";

      //Use the status code called back by the handler, or default  to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      //Return the response parts that are content-specific
      var payloadString = "";

      if (contentType == "json") {
        res.setHeader("Content-Type", "application/json");
        //Use the payload called backed by the handler, or default to empty object
        payload = typeof payload == "object" ? payload : {};

        //Convert the payload to a string
        payloadString = JSON.stringify(payload);
      }

      if (contentType == "html") {
        res.setHeader("Content-Type", "text/html");
        payloadString = typeof payload == "string" ? payload : "";
      }

      //Return the response-parts that are common to all content
      res.writeHead(statusCode);
      res.end(payloadString);

      //Return the response

      //log the response
      //if response is 2000, print in green else print red
      if (statusCode == 200) {
        debug(
          "\x1b[32m%s\x1b[0m",
          ` ${method.toUpperCase()}/${trimmedPath}:  ${statusCode}`
        );
      } else {
        debug(
          "\x1b[31m%s\x1b[0m",
          ` ${method.toUpperCase()}/${trimmedPath}:  ${statusCode}`
        );
      }
    });
  });
};

// Define a request router
server.router = {
  "": handlers.index,
  "account/create": handlers.accountCreate,
  "account/edit": handlers.accountEdit,
  "account/deleted": handlers.accountDeleted,
  "session/create": handlers.sessionCreate,
  "session/deleted": handlers.sessionDeleted,
  "checks/all": handlers.checkList,
  "checks/create": handlers.checksCreate,
  "cehcks/edit": handlers.checkEdit,

  ping: handlers.ping,
  "api/users": handlers.users,
  "api/tokens": handlers.tokens,
  "api/checks": handlers.checks,
};

//Init script
server.init = function () {
  //Start the http server, and have it listten on port 3000
  server.httpServer.listen(config.httpPort, function () {
    console.log(
      "\x1b[36m%s\x1b[0m",
      "The http server is listening on port " +
        config.httpPort +
        "in " +
        config.envName +
        " now."
    );
  });

  //Start https server
  //Start https server
  server.httpsServer.listen(config.httpsPort, function () {
    console.log(
      "\x1b[35m%s\x1b[0m",
      "The https server is listening on port " +
        config.httpPort +
        "in " +
        config.envName +
        " now."
    );
  });
};

//Export the module
module.exports = server;
