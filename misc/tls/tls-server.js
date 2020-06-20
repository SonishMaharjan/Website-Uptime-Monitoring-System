/*
example tcp(net ) server
listen to post 6000 and sends the word 'pong' to client
*/

//Dependencies
var tls = require("tls");
var fs = require("fs");
var path = require("path");

//server options
var options = {
  key: fs.readFileSync(path.join(__dirname, "./../../https/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./../../https/cert.pem")),
};

//Create TCP/IPC server
//create unix socket
var server = tls.createServer(options, function (connection) {
  //send the word 'pong'
  //Connection is a socket object
  //   console.log(connection);

  var outboundMessage = "pong";
  connection.write(outboundMessage);

  //When the client writes something, log it out
  connection.on("data", function (inboundMessage) {
    var messageString = inboundMessage.toString();
    console.log(
      "I wrote " + outboundMessage + " and they said " + messageString
    );
  });
});

//Listen
server.listen(6000);
