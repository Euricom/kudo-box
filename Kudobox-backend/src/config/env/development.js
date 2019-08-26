const config =(module.exports = {});

config.env = 'development';
config.port = process.env.PORT || 3000;
config.mongo ={
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    dbName: 'kudobox'
}
config.tenantId = '0b53d2c1-bc55-4ab3-a161-927d289257f2'
config.creds = {
    // Requried
  identityMetadata: `https://login.microsoftonline.com/${config.tenantId}/v2.0/.well-known/openid-configuration`,
 
  // Required
  clientID: 'ac1b97c4-ddc2-4768-b514-d303002bd393',

  // Required.
  // If you are using the common endpoint, you should either set `validateIssuer` to false, or provide a value for `issuer`.
  validateIssuer: true,

  // Required. 
  // Set to true if you use `function(req, token, done)` as the verify callback.
  // Set to false if you use `function(req, token)` as the verify callback.
  passReqToCallback: false,

  // Required if you are using common endpoint and setting `validateIssuer` to true.
  // For tenant-specific endpoint, this field is optional, we will use the issuer from the metadata by default.
  issuer: null,

  // Optional, default value is clientID
  audience: null,

  // Optional. Default value is false.
  // Set to true if you accept access_token whose `aud` claim contains multiple values.
  allowMultiAudiencesInToken: false,

  // Optional. 'error', 'warn' or 'info'
  loggingLevel:'info', 
}
config.tokenKey = process.env.tokenKey || "djghhhhuuwiwuewieuwieuriwu";

