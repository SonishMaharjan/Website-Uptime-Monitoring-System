/* 
8 Create and export configuration variables
*/

//Container for all environments

var environments = {};

//Testing env
environments.testing = {
  httpPort: 4000,
  httpsPort: 4001,
  envName: "testng",
  hashingSecret: "thisIsAlsoSecret",
  maxChecks: 5,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromPhone: process.env.TWILIO_PHONE,
  },
  templatesGlobals: {
    appName: "UptimeChecker",
    companyName: "NotAReaCompany, Inc",
    yearCreated: "2018",
    baseUrl: "http://localhost:3000/",
  },
};

//Stagind(Default) environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: "staging",
  hashingSecret: "thisIsASecret",
  maxChecks: 5,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromPhone: process.env.TWILIO_PHONE,
  },
  templatesGlobals: {
    appName: "UptimeChecker",
    companyName: "NotAReaCompany, Inc",
    yearCreated: "2018",
    baseUrl: "http://localhost:3000/",
  },
};

//Production environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: "production",
  hashingSecret: "thisIsAlsoSecret",
  maxChecks: 5,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromPhone: process.env.TWILIO_PHONE,
  },
  templatesGlobals: {
    appName: "UptimeChecker",
    companyName: "NotAReaCompany, Inc",
    yearCreated: "2018",
    baseUrl: "http://localhost:5000/",
  },
};

//Determine which environment was passed as command-line argument
var currentEnv =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

//Chect that the current environment is one of the environments above, if not , default to staging
var environmentToExport =
  typeof environments[currentEnv] == "object"
    ? environments[currentEnv]
    : environments.staging;

//Export the module
module.exports = environmentToExport;
