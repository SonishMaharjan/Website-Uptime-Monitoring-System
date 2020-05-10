/* 
8 Create and export configuration variables
*/

//Container for all environments

var environments = {};

//Stagind(Default) environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: "staging",
  hashingSecret: "thisIsASecret",
};

//Production environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: "production",
  hashingSecret: "thisIsAlsoSecret",
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