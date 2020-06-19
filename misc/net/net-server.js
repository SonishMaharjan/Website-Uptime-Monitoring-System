/*
example tcp(net ) server
listen to post 6000 and sends the word 'pong' to client
*/

//Dependencies
var net = require("net");

//Create TCP/IPC server
//create unix socket
var server = net.createServer(function (connection) {
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
