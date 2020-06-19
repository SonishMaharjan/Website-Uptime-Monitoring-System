/* 
Exmple of http 2
*/

//Dependencies
var http2 = require("http2");

//Init the server
var server = http2.createServer();

//On a stream, send back hello world

server.on("stream", function (stream, headers) {
  //   console.log(stream);
  stream.respond({ status: 200, "content-type": "text/html" });
  stream.end("<html><body><p> Hello World </p> </body></html>");
});

console.log("http2 server started");
server.listen(6000);
