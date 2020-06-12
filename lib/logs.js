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

//List all the logs, and optionally  include the compressed logs
lib.list = function (includeCompressedLogs, callback) {
  fs.readdir(lib.baseDir, function (err, data) {
    if (!err && data && data.length > 0) {
      var trimmedFileNames = [];
      data.forEach(function (fileName) {
        if (fileName.indexOf(".log") > -1) {
          trimmedFileNames.push(fileName.replace(".log", ""));
        }
        //Add on the .gz files
        if (fileName.indexOf(".gz.b64") > -1 && includeCompressedLogs) {
          trimmedFileNames.push(fileName.replace(".gz.b64", ""));
        }
      });
      callback(false, trimmedFileNames);
    } else {
      callback(err, data);
    }
  });
};

//Compress the contents of one .log file into a .gz.b64 file with in the same direcotry
lib.compress = function (logId, newFileId, callback) {
  var sourceFile = logId + ".log";
  var destFile = newFileId + ".gz.b64";

  //Readt the source file
  fs.readFile(lib.baseDir + sourceFile, "utf8", function (err, inputString) {
    if (!err && inputString) {
      //Compress the data using gzip
      zlib.gzip(inputString, function (err, buffer) {
        //buffer is 8 bits character that is formed after zipping the text file
        if (!err && buffer) {
          //Send the data to the destination file
          //x in wx ensure that the file is always newly created
          fs.open(lib.baseDir + destFile, "wx", function (err, fileDescriptor) {
            if (!err && fileDescriptor) {
              //Write to the destination file
              // convert 8 bit charechteerto base64(made of 64 charachte AZaz09+/)
              //Buffer(8bits) is 00001111 00111111 (hex-representation : 0f 3f)
              //above buffer base 64 is retrieved by:
              //base 64(spliting to 6 bit) 000011 110011
              //and it coreespond to hex charachter( for above it is 'Dz' )

              //fs.writeFile use UTF-8 encoding by default
              //@todo remove// not need to remove , use to to analay buffer and b64
              // console.log("buffer:");
              // console.log(buffer);
              // console.log("buf.to b64");
              // console.log(buffer.toString("base64"));

              fs.writeFile(fileDescriptor, buffer.toString("base64"), function (
                err
              ) {
                if (!err) {
                  //Close the destination file
                  fs.close(fileDescriptor, function (err) {
                    if (!err) {
                      callback(false);
                    } else {
                      // console.log("hehe error");
                      callback(err);
                    }
                  });
                } else {
                  callback(err);
                }
              });
            }
          });
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

//Decompress the contentes of a .gz.b64 file int o a string variable
lib.decompress = function (fileId, callback) {
  var fileName = fileId + ".gz.b64";
  fs.readFile(lib.baseDir + fileName, "utf8", function (err, str) {
    //@todo remove
    console.log("saved zipped file ");
    console.log(str);
    if (!err && str) {
      //Decompress the data
      //Base64 is 6 bit data
      var inputBuffer = Buffer.from(str, "base64");

      // @todo_ remove
      console.log(" inut buffer with hex encodin");
      console.log(inputBuffer);
      zlib.unzip(inputBuffer, function (er, outputBuffer) {
        if (!err && outputBuffer) {
          //Callback
          var str = outputBuffer.toString();

          // @todo remove
          console.log("unzpped final ");
          console.log(str);
          callback(false, str);
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

//Truncate a log file
lib.truncate = function (logId, callback) {
  fs.truncate(lib.baseDir + logId + ".log", 0, function (err) {
    if (!err) {
      callback(false);
    } else {
      callback(err);
    }
  });
};

//Export module
module.exports = lib;
