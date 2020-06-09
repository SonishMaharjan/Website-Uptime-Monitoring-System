/*
CLI related tasks
*/

//Dependencies
var readline = require("readline");
var util = require("util");
var debug = util.debuglog("cli");
var events = require("events");

class _events extends events {}

var e = new _events();

//Instantiate the CLI module object
var cli = {};

//Input handlers
e.on("man", function (str) {
  cli.responders.help();
});

e.on("help", function (str) {
  cli.responders.help();
});

e.on("exit", function (str) {
  cli.responders.exit();
});

e.on("stats", function (str) {
  cli.responders.stats();
});

e.on("list users", function (str) {
  cli.responders.listUsers();
});

e.on("more user info", function (str) {
  cli.responders.moreUserInfo(str);
});

e.on("list checks", function (str) {
  cli.responders.listChecks();
});

e.on("more check info", function (str) {
  cli.responders.moreCheckInfo();
});

e.on("list logs", function (str) {
  cli.responders.listLogs();
});

e.on("more log info", function (str) {
  cli.responders.moreLogInfo(str);
});

//Responders object
cli.responders = {};

//Help/Man
cli.responders.help = function () {
  var commands = {
    man: "Kill the CLI(and the rest of the application)",
    help: "Show this help page",
    exit: "Alias of the 'man' command",
    stats:
      "Get statistics on the underlying operating system and resource utilization",
    "list users":
      "Show the list of all registered (undeleted) users in the system",
    "more user info --{userId}": "Show details of specific user",
    "list checks --up --down":
      "Show the list of all the active checks in the system, including their state. The '--up' and '--down' flags are both optional ",
    "more checks info --{checkId}": "Show the details of specified check",
    "list logs":
      "Show the list of all the log files available to be read(compressed and uncompressed)",
    "more log info --{fileName}": "Show details of a specified log file",
  };

  //Show a header fo the help page that is  as wide as screen
  cli.horizontalLine();
  cli.centered("CLI MANUAL");
  cli.horizontalLine();
  cli.verticalSpace(2);

  //Show each command, followed by its explationtion, in white and yellow respectively

  for (var key in commands) {
    if (commands.hasOwnProperty(key)) {
      var value = commands[key];
      var line = "\x1b[33m" + key + "\x1b[0m";
      var padding = 60 - line.length;
      for (i = 0; i < padding; i++) {
        line += " ";
      }

      line += value;
      console.log(line);
      cli.verticalSpace();
    }
  }
  cli.verticalSpace(1);

  //End with another horizontal line
  cli.horizontalLine();
};

//Creat a vertical space
cli.verticalSpace = function (lines) {
  lines = typeof lines == "number" && lines > 0 ? lines : 1;
  for (i = 0; i < lines; i++) {
    console.log("");
  }
};

cli.horizontalLine = function () {
  //Get the available screen size

  var width = process.stdout.columns;
  var line = "";
  for (i = 0; i < width; i++) {
    line += "-";
  }
  console.log(line);
};

//Create centered text on the screen
cli.centered = function (str) {
  str = typeof str == "string" && str.trim().length > 0 ? str.trim() : "";

  //Get the variable screen size
  var width = process.stdout.columns;

  //Calbulate the left padding there should be
  var leftPadding = Math.floor((width - str.length) / 2);

  //Put in left padded spaces before the strin iteself
  var line = "";
  for (i = 0; i < leftPadding; i++) {
    line += " ";
  }
  line += str;
  console.log(line);
};

//Exit
cli.responders.exit = function () {
  process.exit(0);
};

cli.responders.stats = function () {
  console.log("You asked for stats");
};

cli.responders.listUsers = function () {
  console.log("You asked for list user.");
};

cli.responders.moreUserInfo = function (str) {
  console.log("You asked for more user info data: ", str);
};

cli.responders.listChecks = function () {
  console.log("You asked for list check");
};

cli.responders.moreCheckInfo = function (str) {
  console.log("You asked for more check info data:", str);
};

cli.responders.listLogs = function () {
  console.log("You asked for list log.");
};

cli.responders.moreLogInfo = function (str) {
  console.log("our asked for mor lig info data", str);
};

//Input processor
cli.processInput = function (str) {
  str = typeof str == "string" && str.trim().length > 0 ? str.trim() : false;
  //Only process the input if the user actually wrote something. Otherwise ignore it
  if (str) {
    //Codify the unique strings that identify the unique questions allowed to be asked
    var uniqueInputs = [
      "man",
      "help",
      "exit",
      "stats",
      "list users",
      "more user info",
      "list checks",
      "more checks info",
      "list logs",
      "more log info",
    ];

    //Go through the possible inputs, emit an event when a match is found
    var matchFound = false;
    var counter = 0;
    uniqueInputs.some(function (input) {
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true;

        //Emit an event matching the unique inut, and include the full string
        e.emit(input, str);
        return true;
      }
    });
    //If no match is found, tell the user to try again
    if (!matchFound) {
      console.log("Sorry, try again");
    }
  }
};

//Init script
cli.init = function () {
  //Send the start message to the console, in dark blue
  console.log("\x1b[34m%s\x1b[0m", "The CLI is running. ");

  //Start the interface
  var _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">",
  });

  //Create an initial prompt
  _interface.prompt();

  //Handle each line of input seperately
  _interface.on("line", function (str) {
    //Send to the input processor
    cli.processInput(str);

    //Re-initialize the prompt afterwards
    _interface.prompt();
  });

  //If user stops the CLI, kill the associated process
  _interface.on("close", function () {
    process.exit(0);
  });
};

module.exports = cli;
