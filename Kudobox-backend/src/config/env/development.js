const Logger = require('js-logger');


const config =(module.exports = {});

config.env = 'development';
config.logLevel = Logger.DEBUG;
config.port = process.env.PORT || 4001;
config.mongo ={
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    dbName: 'kudobox'
}
config.tenantId = '0b53d2c1-bc55-4ab3-a161-927d289257f2'
config.creds = {
    // Requried
  identityMetadata: `https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/v2.0/.well-known/openid-configuration`,
 
  // Required
  clientID: 'ac1b97c4-ddc2-4768-b514-d303002bd393',

  // Required.
  // If you are using the common endpoint, you should either set `validateIssuer` to false, or provide a value for `issuer`.
  validateIssuer: false,

  // Required. 
  // Set to true if you use `function(req, token, done)` as the verify callback.
  // Set to false if you use `function(req, token)` as the verify callback.
  passReqToCallback: true,

  // Required if you are using common endpoint and setting `validateIssuer` to true.
  // For tenant-specific endpoint, this field is optional, we will use the issuer from the metadata by default.
  issuer: 'https://login.microsoftonline.com/0b53d2c1-bc55-4ab3-a161-927d289257f2/v2.0',

  // Optional, default value is clientID
  // audience: 'api://kudobox.euri.com',

  // Optional. Default value is false.
  // Set to true if you accept access_token whose `aud` claim contains multiple values.
  allowMultiAudiencesInToken: false,

  // Optional. 'error', 'warn' or 'info'
  loggingLevel:'info', 
  isB2C:false,
  loggingNoPII: false
}
config.tokenKey = process.env.tokenKey || "djghhhhuuwiwuewieuwieuriwu";

