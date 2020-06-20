/*
Example Tcp (net) client
connect ot post 6000 and sends the 'ping' to server

*/

//Dependencies
var net = require("net");

//Define the message to send
var outboundMessage = "ping";

//Create the client
//create new socket and immediatlye starts a connection
var client = net.createConnection({ port: 6000 }, function () {
  //Send the message
  client.write(outboundMessage);
});

//when the server writes back, log what is says then kill the client
client.on("data", function (inboundMessage) {
  var messageString = inboundMessage.toString();
  console.log("I wrote " + outboundMessage + " and they said " + messageString);
  client.end();
});