/*
Example TLS (net) client
connect ot post 6000 and sends the 'ping' to server

*/

//Dependencies
var tls = require("tls");
var fs = require("fs");
var path = require("path");

//server options
var options = {
  ca: fs.readFileSync(path.join(__dirname, "./../../https/cert.pem")), // only requried brecause we're using a self-signed certificate
};

//Define the message to send
var outboundMessage = "ping";

//Create the client
//create new socket and immediatlye starts a connection
var client = tls.connect(6000, options, function () {
  //Send the message
  client.write(outboundMessage);
});

//when the server writes back, log what is says then kill the client
client.on("data", function (inboundMessage) {
  var messageString = inboundMessage.toString();
  console.log("I wrote " + outboundMessage + " and they said " + messageString);
  client.end();
});
