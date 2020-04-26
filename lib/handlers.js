/*
 * request handlers
 */
//Dependencies
var _data = require("./data");
var helpers = require("./helpers");

//Define handlers
var handlers = {};

handlers.ping = function (data, callback) {
  callback(200);
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
              callback(200);
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
// @TODO only let an authenticated user access theri object
handlers._users.get = function (data, callback) {
  //Check that the phone number is valid
  var phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
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
    callback(400, { Error: "Missing required field in handlers._users.get" });
  }
};

//Users - put
//Required data: phone
// Optional data: firstName,lastName, password (at least one must be specified)
// @TODO only authenticated user should be allowed to update , users can not update others data
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
    }
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

//Users - delete
//Required field phone
// @todo only let an authenticated user delet theri object
// @todo cleanup(delete) any other data files associated with this user
handlers._users.delete = function (data, callback) {
  //Check that if phone number is valid

  //Check that the phone number is valid
  var phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    //Lookup the user
    _data.read("users", phone, function (err, data) {
      if (!err && data) {
        _data.delete("users", phone, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, { Error: "Could not delete the specified user" });
          }
        });
      } else {
        callback(404, { Error: "Could not find the specified user" });
      }
    });
  } else {
    callback(400, { Error: "Missing required field in handlers._users.get" });
  }
};

handlers.notFound = function (data, callback) {
  callback(404);
};

module.exports = handlers;
