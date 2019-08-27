// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const Kudo = require('./models/kudo');
const authentication = require('./middleware/authentication');
const bunyan = require('bunyan')
var passport = require('passport');
var OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;

//config
const config = require('./config/config')

//options
var options = {
  // The URL of the metadata document for your app. We will put the keys for token validation from the URL found in the jwks_uri tag of the in the metadata.
  identityMetadata: config.creds.identityMetadata,
  clientID: config.creds.clientID,
  validateIssuer: config.creds.validateIssuer,
  issuer: config.creds.issuer,
  passReqToCallback: config.creds.passReqToCallback,
  isB2C: config.creds.isB2C,
  policyName: config.creds.policyName,
  allowMultiAudiencesInToken: config.creds.allowMultiAudiencesInToken,
  audience: config.creds.audience,
  loggingLevel: config.creds.loggingLevel,
  loggingNoPII: config.creds.loggingNoPII,
  clockSkew: config.creds.clockSkew,
  scope: config.creds.scope,
};
//current owner
var owner = null;

// Our logger
var log = bunyan.createLogger({
  name: 'Kudobox logger'
});

var bearerStrategy = new OIDCBearerStrategy(options,
  function(token, done) {
    log.info('verifying the user');
    log.info(token, 'was the token retreived');
    findById(token.oid, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        // "Auto-registration"
        log.info('User was added automatically as they were new. Their oid is: ', token.oid);
        users.push(token);
        owner = token.oid;
        return done(null, token);
      }
      owner = token.oid;
      return done(null, user, token);
    });
  }
);


// defining the Express app
const app = express();
passport.use(bearerStrategy);

app.use(passport.initialize()); // Starts passport
app.use(passport.session()); // Provides session support


// // kudoding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.use('/api',passport.authenticate('oauth-bearer', {
  session: false
}));

// add morgan to log HTTP requests
app.use(morgan('combined'));

// initialize db

require('./data/mongo')();


app.listen(config.port,function() {
  console.log(`API Server listening on port ${config.port}`);
  console.log('Open browser at:');
  console.log( `http://localhost:${config.port}`);
});

// defining an endpoint to return all kudos
app.get('/api/kudo',(req, res,next) => {
  
  Kudo.find((err, kudo) => {
    if (err){
      res.status(err);
    }
    else{
        res.json(kudo);
    }
});
});

app.get('api/kudo/:id', async (req, res,next) => {  
  await Kudo.findById(req.params.id,(err,kudo) => {
    if (err){
      res.status(err); }
    else{
        res.json(kudo);
    }
});
});

// endpoint to create a kudo
app.post('api/kudo',  async (req, res) => {
  const newKudo = new Kudo(req.body);
  await newKudo.save();
  res.send({ message: 'New kudo inserted.' });
});

// endpoint to delete a kudo
app.delete('api/kudo/:id', async (req, res) => {
  await Kudo.deleteOne({_id: req.params.id});
  res.send({ message: 'Kudo removed.' });
});
