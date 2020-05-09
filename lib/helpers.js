/*
 * helpers for various tasks
 */

//Dependencies
var crypto = require("crypto");
var config = require("./config");

var helpers = {};

//helpers for hashing
helpers.hash = function (str) {
  if (typeof str == "string" && str.length > 0) {
    var hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

//parse json string to an object inall cases, without throwing error
helpers.parseJsonToObject = function (str) {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

helpers.createRandomString = function (strLength) {
  strLength = typeof strLength == "number" && strLength > 0 ? strLength : false;
  if (strLength) {
    //Derfne all the possible charactessrs
    var possibleCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";

    var str = "";
    for (i = 1; i <= strLength; i++) {
      //Get a random charachter from the possible charachters string
      var randomCharacter = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );

      str += randomCharacter;
    }
    return str;
  } else {
    return false;
  }
};

//Export the module
module.exports = helpers;
