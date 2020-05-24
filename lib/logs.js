/*
Libratry for storing and rotating logs
*/

//Dependencies

var fs = require("fs");
var path = require("path");
var zlib = require("zlib");

//Container for the module
var lib = {};

//Base directory of the logs folder
lib.baseDir = path.join(__dirname, "../.logs/");

//Append a string to a file. Create the file if it does not exist.
lib.append = function (file, str, callback) {
  //Open the file for appending
  fs.open(lib.baseDir + file + ".log", "a", function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      fs.appendFile(fileDescriptor, str + "\n", function (err) {
        if (!err) {
          fs.close(fileDescriptor, function (err) {
            if (!err) {
              callback(false);
            } else {
              callback("Error on closing file that was being appended");
            }
          });
        } else {
          callback("Error appending to file");
        }
      });
    } else {
      callback("Could not open the file for appending");
    }
  });
};

//Export module
module.exports = lib;
