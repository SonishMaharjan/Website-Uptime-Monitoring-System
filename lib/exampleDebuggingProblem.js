/*
Library that demonstrates something thrown when it's init() is called

*/

//Container for the module
var example = {};

//Init function
example.init = function () {
  //this is an error crated intentionally (bar is not defined)
  var foo = bar;
};

//Export the module
module.exports = example;
