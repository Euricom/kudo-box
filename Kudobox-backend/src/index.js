// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const Kudo = require('./models/kudo');
const User = require('./models/user')
const authentication = require('./middleware/authentication');
var passport = require('passport');
var OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;
const Logger = require('js-logger');
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
//users
var users = [];

// Our logger
const consoleHandler = Logger.createDefaultHandler();

Logger.useDefaults();
Logger.setLevel(config.logLevel);
Logger.setHandler((messages, context) => {
    if (config.env === 'development') {
        consoleHandler(messages, context);
    }
});

var bearerStrategy = new OIDCBearerStrategy(options,
  function(req,token, done) {
    Logger.info('DO USER STUFF HERE');
    Logger.info('=========== START TOKEN RECEIVED ===========');
    Logger.info(token);
    Logger.info('=========== END TOKEN RECEIVED ===========');
    Logger.info('url:' + req.originalUrl)
    done(null, token);
    // findById(token.oid, function(err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     // "Auto-registration"
    //     Logger.info('User was added automatically as they were new. Their oid is: ', token.oid);
    //     users.push(token);
    //     owner = token.oid;
    //     return done(null, token);
    //   }
    //   owner = token.oid;
    //   return done(null, user, token);
    // });
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

// defining an endpoint to return all users
app.get('/api/user',(req, res,next) => {
  
  User.find((err, users) => {
    if (err){
      res.status(err);
    }
    else{
        res.json(users);
    }
});
});
// defining an endpoint to return all kudos
app.get('/api/kudo',(req, res,next) => {
  
  Kudo.find((err, kudos) => {
    if (err){
      res.status(err);
    }
    else{
        res.json(kudos);
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
