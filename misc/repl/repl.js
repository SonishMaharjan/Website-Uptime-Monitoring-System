/*
    Example repl server
    Take in the word 'fizz' and log out 'buzz'
*/
//Dependencies
var repl = require("repl");

//Start the repl
repl.start({
  prompt: ">",
  eval: function (str) {
    //evaluation function for incoming inputs
    console.log("At evaluation stage:", str);

    //If the user said 'fizz', say 'buzz' back to them
    if (str.indexOf("foo") > -1) {
      console.log("buzz");
    }
  },
});
