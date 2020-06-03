/*
Front logic for the application
*
*/

//Container for the frontend application
var app = {};

//Config
app.config = {
  sessionToken: false,
};

//AJAX Client (fot the restful API)

app.client = {};

//Interface for making API calls
app.client.request = function (
  headers,
  path,
  method,
  queryStringObject,
  payload,
  callback
) {
  //Set defaults
  headers = typeof headers == "object" && headers !== null ? headers : {};
  path = typeof path == "string" ? path : "/";
  method =
    typeof method == "string" &&
    ["POST", "GET", "PUT", "DELETE"].indexOf(method) > -1
      ? method.toUpperCase()
      : "GET";

  queryStringObject =
    typeof queryStringObject == "object" && queryStringObject !== null
      ? queryStringObject
      : {};

  payload =
    typeof payload == "object" && payload !== null ? queryStringObject : {};

  callback = typeof callback == "function" ? callback : false;

  //For each query string parameter sent, add it to the path
  var requestUrl = path + "?";
  var counter = 0;
  for (var queryKey in queryStringObject) {
    if (queryStringObject.hasOwnProperty(queryKey)) {
      counter++;
      //If at least one query string parameter has already been added, prepend new ones with an ampersand
      if (counter > 1) {
        requestUrl += "&";
      }
      //Add the key and value
      requestUrl += queryKey + "=" + queryStringObject(queryKey);
    }
  }

  //Form the http request as Json type
  var xhr = new XMLHttpRequest();
  //create a client
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  //For each header sent, add it to the request
  for (var headerKey in headers) {
    if (headers.hasOwnPorperty(headerKey)) {
      xhr.setRequestHeader(headerKey, headers[headerKey]);
    }
  }

  //If there is a current session, add that to headers to
  if (app.config.sessionToken) {
    xhr.setRequestHeader("token", app.config.sessionToken.id);
  }

  //when the request comens back , handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var statusCode = xhr.status;
      var responseReturned = xhr.responseText;

      //Callback if requested
      if (callback) {
        try {
          var parsedResponse = JSON.parse(responseReturned);
          callback(statusCode, parsedResponse);
        } catch (e) {
          callback(statusCode, false);
        }
      }
    }
  };

  //Set the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);
};
