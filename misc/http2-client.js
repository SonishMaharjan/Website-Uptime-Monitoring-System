/*
http2 client example 

*/

//Dependencies http2 = require('http2');
var http2 = require("http2");

//Create client
var client = http2.connect("http://localhost:6000");

//Create a request
var req = client.request({
  ":path": "/",
});

//when a message is received, add the pieces of information
var str = "";

req.on("data", function (chunk) {
  console.log(data);
  str += chunk;
});

//whent the message ends, log it out
req.on("end", function () {
  console.log(str);
});

//end the request
req.end();
