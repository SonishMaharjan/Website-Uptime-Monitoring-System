/* 
8 Create and export configuration variables
*/

//Container for all environments

var environments = {};

//Stagind(Default) environment
environments.staging = {
  port: 3000,
  envName: "staging",
};

//Production environment
environments.production = {
  port: 5000,
  envName: "production",
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
