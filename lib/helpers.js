/*
 * helpers for various tasks
 */

//Dependencies
var crypto = require("crypto");
var config = require("./config");
var https = require("https");
var querystring = require("querystring");
var twilio = require("twilio");

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

//Send message via twilio
helpers.sendTwiloSms = function (phone, msg, callback) {
  //Validate parameters
  phone =
    typeof phone == "string" && phone.trim().length == 10
      ? phone.trim()
      : false;
  msg =
    typeof msg == "string" && msg.trim().length > 0 && msg.trim().length <= 1600
      ? msg.trim()
      : false;

  if (phone && msg) {
    //Configure the request payload
    var payload = {
      from: config.twilio.fromPhone,
      to: "+977" + phone,
      body: msg,
    };

    //this is from twilio docs
    var client = new twilio(config.twilio.accountsid, config.twilio.authToken);

    client.messages
      .create(payload)
      .then((message) => {
        console.log("sending sms success");
        // console.log(message);
        callback(false);
      })
      .catch((err) => {
        console.log("Error while sending SMS");
        callback(err);
      });

    //This are the code from  tutorail
    //Stringyfy payload
    // var stringPayload = querystring.stringify(payload);

    // //Configure the request details
    // var requestDetails = {
    //   protocol: "https:",
    //   hostname: "api.twilio.com",
    //   method: "POST",
    //   path: "/2010-04-01/" + config.twilio.accoundSid + "/Messages.json",
    //   auth: config.twilio.accountsid + ":" + config.twilio.authToken,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Content-Length": Buffer.byteLength(stringPayload),
    //   },
    // };

    // //Instantiate the request object
    // var req = https.request(requestDetails, function (res) {
    //   //Grab the status of the sent request
    //   var status = res.statusCode;
    //   console.log(res);
    //   //Callback successfully if the request went through
    //   if (status == 200 || status == 201) {
    //     callback(false);
    //   } else {
    //     callback("Status code returned was " + status);
    //   }
    // });

    // //Bind to the error event so it doesn't get throw
    // req.on("error", function (e) {
    //   console.log("req error");
    //   callback(e);
    // });

    // //Add the payload
    // req.write(stringPayload);

    // //End the request ie send the request
    // req.end();
  } else {
    callback("Parameter missing to send the SMS from twilio");
  }
};

//Export the module
module.exports = helpers;
