/*
 * request handlers
 */
//Dependencies
var _data = require("./data");
var helpers = require("./helpers");
var config = require("./config");
var _url = require("url");
var dns = require("dns");

//Define handlers
var handlers = {};

/*
 * HTML  Handlers
 */

//Index handler
handlers.index = function (data, callback) {
  //Remove any request that isn't a get
  if (data.method == "get") {
    //Prepare data for interpolation
    var templateData = {
      "head.title": "Uptime Monitoring- Made Simple",
      "head.description":
        "We offer free, simple HTTP/HTTPS uptime monitoring. Sends you message when uptime monitoring goes down",
      "body.title": "Hello templated world!",
      "body.class": "index",
    };

    //Read in a temtemplate as string
    helpers.getTemplate("index", templateData, function (err, str) {
      if (!err && str) {
        //Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

//Create Account handler
handlers.accountCreate = function (data, callback) {
  //Remove any request that isn't a get
  if (data.method == "get") {
    //Prepare data for interpolation
    var templateData = {
      "head.title": "Create an account",
      "head.description": "Sign Up is easy and only take few seconds.",
      "body.title": "Hello templated world!",
      "body.class": "accountCreate",
    };

    //Read in a temtemplate as string
    helpers.getTemplate("accountCreate", templateData, function (err, str) {
      if (!err && str) {
        //Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

//Create new session
handlers.sessionCreate = function (data, callback) {
  //Remove any request that isn't a get
  if (data.method == "get") {
    //Prepare data for interpolation
    var templateData = {
      "head.title": "Log in to your account",
      "head.description":
        "Please enter you phone number and password to access your account",
      "body.title": "Hello templated world!",
      "body.class": "sessionCreate",
    };

    //Read in a temtemplate as string
    helpers.getTemplate("sessionCreate", templateData, function (err, str) {
      if (!err && str) {
        //Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

//Edit account
handlers.accountEdit = function (data, callback) {
  //Remove any request that isn't a get
  if (data.method == "get") {
    //Prepare data for interpolation
    var templateData = {
      "head.title": "Logged out",
      "body.class": "accountEdit",
    };

    //Read in a temtemplate as string
    helpers.getTemplate("accountEdit", templateData, function (err, str) {
      if (!err && str) {
        //Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

//Delete session
handlers.sessionDeleted = function (data, callback) {
  //Remove any request that isn't a get
  if (data.method == "get") {
    //Prepare data for interpolation
    var templateData = {
      "head.title": "Logged out",
      "head.description": "You've been logout of your account.",
      "body.class": "sessionDeleted",
    };

    //Read in a temtemplate as string
    helpers.getTemplate("sessionDeleted", templateData, function (err, str) {
      if (!err && str) {
        //Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// /Account hasbeen deleted
handlers.accountDeleted = function (data, callback) {
  //Remove any request that isn't a get
  if (data.method == "get") {
    //Prepare data for interpolation
    var templateData = {
      "head.title": "Account Deleted",
      "head.description": "Your account has been deleted",
      "body.class": "accountDeleted",
    };

    //Read in a temtemplate as string
    helpers.getTemplate("accountDeleted", templateData, function (err, str) {
      if (!err && str) {
        //Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// /Create a new Check
handlers.checksCreate = function (data, callback) {
  //Remove any request that isn't a get
  if (data.method == "get") {
    //Prepare data for interpolation
    var templateData = {
      "head.title": "Create new check",
      "body.class": "checksCreate",
    };

    //Read in a temtemplate as string
    helpers.getTemplate("checksCreate", templateData, function (err, str) {
      if (!err && str) {
        //Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

//Dashboard view of chek
handlers.checksList = function (data, callback) {
  //Remove any request that isn't a get
  if (data.method == "get") {
    //Prepare data for interpolation
    var templateData = {
      "head.title": "Dashboard",
      "body.class": "checksList",
    };

    //Read in a temtemplate as string
    helpers.getTemplate("checksList", templateData, function (err, str) {
      if (!err && str) {
        //Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

//Checks edit
handlers.checkEdit = function (data, callback) {
  //Remove any request that isn't a get
  if (data.method == "get") {
    //Prepare data for interpolation
    var templateData = {
      "head.title": "Check Details",
      "body.class": "checkEdit",
    };

    //Read in a temtemplate as string
    helpers.getTemplate("checkEdit", templateData, function (err, str) {
      if (!err && str) {
        //Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

/*
 *
 * JSON api handlers
 */

handlers.ping = function (data, callback) {
  callback(200);
};

handlers.exampleError = function (data, callback) {
  var err = new Error("This is an error example");
  throw err;
};

//Users
handlers.users = function (data, callback) {
  var acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

//Container for the users sub methods
//_users consist of all user method
handlers._users = {};

//Users - post
//Required data: firstName, lastName, phone, password, tosAgreement
//Optional data: none
handlers._users.post = function (data, callback) {
  // console.log(data);
  //Check that all data are filled out
  var firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  var lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  var phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  var tosAgreement =
    typeof data.payload.tosAgreement == "boolean" &&
    data.payload.tosAgreement == true
      ? true
      : false;
  if (firstName && lastName && phone && password && tosAgreement) {
    //Make sure that user doesnt already exist
    //_data is strored data
    _data.read("users", phone, function (err, data) {
      if (err) {
        //Hash the password
        var hashedPassword = helpers.hash(password);
        if (hashedPassword) {
          //Create the user object
          var userObject = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            hashedPassword: hashedPassword,
            tosAgreement: true,
          };

          //Store user
          _data.create("users", phone, userObject, function (err) {
            if (!err) {
              callback(200, { Success: "New user created" });
            } else {
              console.log(err);
              callback(500, { Error: "Could not create the new user" });
            }
          });
        } else {
          callback(500, { Error: "Could not hash the user's password" });
        }
      } else {
        //User already exists
        callback(400, { Error: "A user with that phone number already exist" });
      }
    });
  } else {
    callback(400, { Error: "Missing required fields" });
  }
};

//Users - get
//Required data: phone
//Optional data: none
handlers._users.get = function (data, callback) {
  //Check that the phone number is valid
  var phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    //Get the token from headers
    var token = typeof (data.headers.token == "string")
      ? data.headers.token
      : false;
    //Check if token is valid for user
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        //Lookup the user
        _data.read("users", phone, function (err, data) {
          if (!err && data) {
            //Remove the hashed password from the user object before returning to request
            delete data.hashedPassword;
            callback(200, data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403, {
          Error: "Missing required token in header or token is invalid",
        });
      }
    });
  } else {
    callback(400, { Error: "Missing required field in handlers._users.get" });
  }
};

//Users - put
//Required data: phone
// Optional data: firstName,lastName, password (at least one must be specified)
handlers._users.put = function (data, callback) {
  //Check for required field
  var phone =
    typeof data.payload.phone == "string" && data.payload.phone.length == 10
      ? data.payload.phone.trim()
      : false;

  // check for option field
  var firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  var lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;

  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  //Error if phone is invalid
  if (phone) {
    //Error if  noting is sent to update
    if (firstName || lastName || password) {
      //Verify that the given token is valid for the phone number
      token = typeof data.headers.token == "string" ? data.headers.token : null;

      //Check if token is valid for user
      handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
        if (tokenIsValid) {
          //Lookup the user
          _data.read("users", phone, function (err, userData) {
            if (!err && userData) {
              //Update the fields that are necessary
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.hashedPassword = helpers.hash(password);
              }

              //Store new updates
              _data.update("users", phone, userData, function (err) {
                if (!err) {
                  callback(200);
                } else {
                  console.log(err);
                  callback(500, { Error: "Could not update user " });
                }
              });
            } else {
              callback(400, { Error: "The specified user does not exist" });
            }
          });
        } else {
          callback(403, {
            Error: "Missing required token in header or token is invalid",
          });
        }
      });
    }
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

//Users - delete
//Required field phone
// @todo cleanup(delete) any other data files associated with this user
handlers._users.delete = function (data, callback) {
  //Check that the phone number is valid
  var phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    //Get the token from headers
    var token =
      typeof data.headers.token == "string" ? data.headers.token : false;

    //Check if token is valid for user
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        //Lookup the user
        _data.read("users", phone, function (err, data) {
          if (!err && data) {
            _data.delete("users", phone, function (err) {
              if (!err) {
                //Delete the each of the checks
                var userChecks =
                  typeof data.checks == "object" && data.checks instanceof Array
                    ? data.checks
                    : [];

                var checksToDelete = userChecks.length;
                if (checksToDelete > 0) {
                  var checksDeleted = 0;
                  var deletionErrors = false;

                  //Loop through the checks
                  userChecks.forEach(function (checkId) {
                    //Delete the check
                    _data.delete("checks", checkId, function (err) {
                      if (err) {
                        deletionErrors = true;
                      }
                      checksDeleted++;
                      if (checksDeleted == checksToDelete) {
                        if (!deletionErrors) {
                          callback(200);
                        } else {
                          callback({
                            Error:
                              "Error occured while deleting users check. All checks might not have been deleted.",
                          });
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500, { Error: "Could not delete the specified user" });
              }
            });
          } else {
            callback(404, { Error: "Could not find the specified user" });
          }
        });
      } else {
        callback(403, {
          Error: "Missing required token in header or token is invalid",
        });
      }
    });
  } else {
    callback(400, { Error: "Missing required field in handlers._users.get" });
  }
};

//Tokens
handlers.tokens = function (data, callback) {
  var acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

//container for all tokens methods
handlers._tokens = {};

// Tokens - post
//Required data: phone , password
//Optional data: None

handlers._tokens.post = function (data, callback) {
  var phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone
      : null;
  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password
      : null;

  if (phone && password) {
    //Lookup the user who match the phone number

    _data.read("users", phone, function (err, userData) {
      if (!err && userData) {
        // Hash the sent password, and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        if (hashedPassword == userData.hashedPassword) {
          //If valid chreate new token with random name and set expiration time for 1 hour
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            phone: phone,
            id: tokenId,
            expires: expires,
          };

          //Store the token
          _data.create("tokens", tokenId, tokenObject, function (err) {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, { Error: "Could not create the new token" });
            }
          });
        } else {
          callback(400, {
            Error:
              "Password did not match the specified user' stored password.",
          });
        }
      } else {
        callback(400, { Error: "Could not find the specified user" });
      }
    });
  } else {
    callback(400, { Error: "Missing required field(s)" });
  }
};

// Tokens - get
//Required data:id
//optional data: none
handlers._tokens.get = function (data, callback) {
  //Check that the id is valid
  var id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id
      : null;
  if (id) {
    //Look up the tokenytt
    _data.read("tokens", id, function (err, tokenData) {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { Error: "Missing requried fields" });
  }
};

// Tokens - put
// Required data:id, extend
//optional data : none
handlers._tokens.put = function (data, callback) {
  var id =
    typeof data.payload.id == "string" && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;
  var extend =
    typeof data.payload.extend == "boolean" && data.payload.extend == true
      ? data.payload.id.trim()
      : false;
  if (id && extend) {
    //Lookup the token
    _data.read("tokens", id, function (err, tokenData) {
      if (!err && tokenData) {
        //Check if the token is already expired
        if (tokenData.expires > Date.now()) {
          tokenData.expires = Date.now() + 1000 * 60 * 60;

          //store the new updates'
          _data.update("tokens", id, tokenData, function (err) {
            if (!err) {
              callback(200);
            } else {
              callback(500, {
                Error: "Could not update the token's expiration",
              });
            }
          });
        } else {
          callback(400, {
            Error: "The token has already expired, and can not be extended.",
          });
        }
      } else {
        callback(400, { Error: "Specified token does not exist." });
      }
    });
  } else {
    callback(400, {
      Error: "Missing requried field(s) or field(s) are invalid",
    });
  }
};

// Tokens - delete
//Required data: id
//Optional data: none
handlers._tokens.delete = function (data, callback) {
  //Check that the id is valid
  var id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id
      : null;
  if (id) {
    //Lookup token
    _data.read("tokens", id, function (err, data) {
      if (!err) {
        _data.delete("tokens", id, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, { Error: "Could not delete the specified token" });
          }
        });
      } else {
        callback(500, { Error: "Could not read the specified token" });
      }
    });
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

//Checks
handlers.checks = function (data, callback) {
  var acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._checks[data.method](data, callback);
  } else {
    callback(405);
  }
};

//container for all checks methods
handlers._checks = {};

//Checks -post
//required data: protocol, url, method, successCodes, timeoutSeconds
//Optional data: none

handlers._checks.post = function (data, callback) {
  //validate inputs
  var protocol =
    typeof data.payload.protocol == "string" &&
    ["https", "http"].indexOf(data.payload.protocol) > -1
      ? data.payload.protocol
      : null;

  var url =
    typeof data.payload.url == "string" && data.payload.url.trim().length > 0
      ? data.payload.url
      : null;
  var method =
    typeof data.payload.method == "string" &&
    ["post", "get", "put", "delete"].indexOf(data.payload.method) > -1
      ? data.payload.method
      : null;
  var successCodes =
    typeof data.payload.successCodes == "object" &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : null;

  var timeoutSeconds =
    typeof data.payload.timeoutSeconds == "number" &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5
      ? data.payload.timeoutSeconds
      : null;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    //Get the token from headers
    var token =
      typeof data.headers.token == "string" ? data.headers.token : false;

    //Lookup the user by reading the token
    _data.read("tokens", token, function (err, tokenData) {
      if (!err && tokenData) {
        var userPhone = tokenData.phone;

        //Lookup the user
        _data.read("users", userPhone, function (err, userData) {
          if (!err && userData) {
            var userChecks =
              typeof userData.checks == "object" &&
              userData.checks instanceof Array
                ? userData.checks
                : [];
            //Verify that the user has less than the nuber of max-checks-per-user
            if (userChecks.length < config.maxChecks) {
              //verrify that the Url given has DNS entries (and therefor can resolve)
              var parsedUrl = _url.parse(protocol + "://" + url, true);
              var hostName =
                typeof parsedUrl.hostname == "string" &&
                parsedUrl.hostname.length > 0
                  ? parsedUrl.hostname
                  : false;

              dns.resolve(hostName, function (err, records) {
                //@todo remove
                console.log(records);
                if (!err && records) {
                  //Create a random id for the check
                  var checkId = helpers.createRandomString(20);

                  //Create the check object, and include the user's phone
                  var checkObject = {
                    id: checkId,
                    userPhone: userPhone,
                    protocol: protocol,
                    url: url,
                    method: method,
                    successCodes: successCodes,
                    timeoutSeconds: timeoutSeconds,
                  };

                  //Save the object
                  _data.create("checks", checkId, checkObject, function (err) {
                    if (!err) {
                      //Add the check id to user's object
                      userData.checks = userChecks;
                      userData.checks.push(checkId);

                      //Save the new user data
                      _data.update("users", userPhone, userData, function (
                        err
                      ) {
                        if (!err) {
                          //Return te data about the new check
                          callback(200, checkObject);
                        } else {
                          callback(500, {
                            Error:
                              "Could not update the user with the new check",
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        Error: "Could not create the new check",
                      });
                    }
                  });
                } else {
                  callback(400, {
                    Error:
                      "The host name of url doesnot resolve any dns entries ",
                  });
                }
              });
            } else {
              callback(400, {
                Error:
                  "User already has the maximum number of checks (" +
                  config.maxChecks +
                  ")",
              });
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400, { Error: "Missing required inputs, or inputs are invalid" });
  }
};

//Check -get
//Requried data; id
//Optional data: none
handlers._checks.get = function (data, callback) {
  //Check if the id is valid
  var id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : null;
  if (id) {
    //Lookup the check
    _data.read("checks", id, function (err, checkData) {
      if (!err && checkData) {
        //Get the token from headers
        var token =
          typeof data.headers.token == "string" ? data.headers.token : false;
        //Verify that the given token is valid and belongs to the user who created the check

        handlers._tokens.verifyToken(token, checkData.userPhone, function (
          tokenIsValid
        ) {
          if (tokenIsValid) {
            //return the check data
            callback(200, checkData);
          } else {
            callback(403);
          }
        });
      } else {
        callback(403, { Error: "Check not found" });
      }
    });
  } else {
    callback(400, { Error: "Missing required field (invalid check)" });
  }
};

//Checks - put
//Required data: id
//Optional data: protocol, url, method, successCodes, timeoutSeconds(one must be sent)
handlers._checks.put = function (data, callback) {
  //Required field
  var id =
    typeof data.payload.id == "string" && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : null;

  //Check for optional field
  var protocol =
    typeof data.payload.protocol == "string" &&
    ["https", "http"].indexOf(data.payload.protocol) > -1
      ? data.payload.protocol
      : null;

  var url =
    typeof data.payload.url == "string" && data.payload.url.trim().length > 0
      ? data.payload.url
      : null;
  var method =
    typeof data.payload.method == "string" &&
    ["post", "get", "put", "delete"].indexOf(data.payload.method) > -1
      ? data.payload.method
      : null;
  var successCodes =
    typeof data.payload.successCodes == "object" &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : null;

  var timeoutSeconds =
    typeof data.payload.timeoutSeconds == "number" &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5
      ? data.payload.timeoutSeconds
      : null;
  //Check to make sure the id is valid

  if (id) {
    //Check to make sure one or more optional fields has been sent

    if (protocol || url || method || successCodes || timeoutSeconds) {
      //lookup the checkt
      _data.read("checks", id, function (err, checkData) {
        if (!err && checkData) {
          //Get the token from the headers
          var token =
            typeof data.headers.token == "string" ? data.headers.token : null;

          //Verify that the given token is valid and belongs to the user who created it
          handlers._tokens.verifyToken(token, checkData.userPhone, function (
            tokenIsValid
          ) {
            if (tokenIsValid) {
              //Update the check where necessary
              if (protocol) {
                checkData.protocol = protocol;
              }
              if (url) {
                checkData.url = url;
              }
              if (method) {
                checkData.method = method;
              }
              if (successCodes) {
                checkData.successCodes = successCodes;
              }
              if (timeoutSeconds) {
                checkData.timeoutSeconds = timeoutSeconds;
              }
              //Store data
              _data.update("checks", id, checkData, function (err) {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, { Error: "Could not update the check" });
                }
              });
            } else {
              callback(403);
            }
          });
        } else {
          callback(400, { Error: "Check Id does not exist" });
        }
      });
    }
  } else {
    callback(400, { Error: "Missing required field for put method of check" });
  }
};

//Delete the check
//Required data check  id
// optioal data : none
handlers._checks.delete = function (data, callback) {
  //Check that the phone number is valid
  var id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    //Lookup the checks
    _data.read("checks", id, function (err, checkData) {
      if (!err && checkData) {
        //Get the token from headers
        var token =
          typeof data.headers.token == "string" ? data.headers.token : false;

        //Check if token is valid for user
        handlers._tokens.verifyToken(token, checkData.userPhone, function (
          tokenIsValid
        ) {
          if (tokenIsValid) {
            //delete the checkdata
            _data.delete("checks", id, function (err) {
              if (!err) {
                //Lookup the user
                _data.read("users", checkData.userPhone, function (
                  err,
                  userData
                ) {
                  if (!err && userData) {
                    var userChecks =
                      typeof userData.checks == "object" &&
                      userData.checks instanceof Array
                        ? userData.checks
                        : [];

                    //Remove delete the check from the list
                    var checkPosition = userChecks.indexOf(id);

                    if (checkPosition > -1) {
                      userChecks.splice(checkPosition, 1);
                    } else {
                      callback(500, {
                        Error: "Could not find the check on the user's onject",
                      });
                    }
                    _data.update(
                      "users",
                      checkData.userPhone,
                      userData,
                      function (err) {
                        if (!err) {
                          callback(200);
                        } else {
                          callback(500, {
                            Error:
                              "Could not update the user whilst deleting check",
                          });
                        }
                      }
                    );
                  } else {
                    callback(500, {
                      Error:
                        "Could not find the user who created the check. so could not remove the check from the list of the checks on user object",
                    });
                  }
                });
              } else {
                callback(500, { Error: "Could not delete the check data" });
              }
            });
          } else {
            callback(403, {
              Error: "Missing required token in header or token is invalid",
            });
          }
        });
      } else {
        callback(400, { Error: "the specific check id does not exist" });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required field(check id) in handlers.checks.delete",
    });
  }
};

//Verify if the given token id is currently valid for given user:
handlers._tokens.verifyToken = function (id, phone, callback) {
  //Lookup the token
  _data.read("tokens", id, function (err, tokenData) {
    if (!err && tokenData) {
      //Check that the token is for the given user and has not expired
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

//Favicon
handlers.favicon = function (data, callback) {
  //Reject andy request that isn't a GET
  if (data.method == "get") {
    //Read in the favicon's data
    helpers.getStaticAsset("favicon.ico", function (err, data) {
      if (!err && data) {
        //Callback the data
        callback(200, data, "favicon");
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

//Public assets
handlers.public = function (data, callback) {
  //get the filename being requested
  var trimmedAssetName = data.trimmedPath.replace("public/", "").trim();

  //Reject any request that isn't a GET
  if (data.method == "get") {
    //Get the filename being requested
    if (trimmedAssetName.length > 0) {
      helpers.getStaticAsset(trimmedAssetName, function (err, data) {
        if (!err && data) {
          //Determine the content type (default to plain text)
          var contentType = "plain";

          if (trimmedAssetName.indexOf(".css") > -1) {
            contentType = "css";
          }

          if (trimmedAssetName.indexOf(".png") > -1) {
            contentType = "png";
          }

          if (trimmedAssetName.indexOf(".jpg") > -1) {
            contentType = "jpg";
          }

          if (trimmedAssetName.indexOf(".ico") > -1) {
            contentType = "Favicon";
          }

          //Callback the data
          callback(200, data, contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
};

handlers.notFound = function (data, callback) {
  callback(404);
};

module.exports = handlers;
