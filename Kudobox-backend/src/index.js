// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const Kudo = require("./models/kudo");
const User = require("./models/user");
var passport = require("passport");
var OIDCBearerStrategy = require("passport-azure-ad").BearerStrategy;
const Logger = require("js-logger");
//config
const config = require("./config/config");
const httpError = require("./util/httpError");

// Our logger
const consoleHandler = Logger.createDefaultHandler();

Logger.useDefaults();
Logger.setLevel(config.logLevel);
Logger.setHandler((messages, context) => {
  if (config.env === "development") {
    consoleHandler(messages, context);
  }
});
//options for bearerStrategy
var options = {
  // The URL of the metadata document for your app. We will put the keys for token validation from the URL found in the jwks_uri tag of the in the metadata.
  identityMetadata: config.creds.identityMetadata,
  clientID: config.creds.clientID,
  validateIssuer: config.creds.validateIssuer,
  issuer: config.creds.issuer,
  passReqToCallback: config.creds.passReqToCallback,
  isB2C: config.creds.isB2C,
  allowMultiAudiencesInToken: config.creds.allowMultiAudiencesInToken,
  loggingLevel: config.creds.loggingLevel,
  loggingNoPII: config.creds.loggingNoPII,
  scope: config.creds.scope
};

var bearerStrategy = new OIDCBearerStrategy(options, async function(
  req,
  token,
  done
) {
  Logger.info("DO USER STUFF HERE");
  Logger.info("=========== START TOKEN RECEIVED ===========");
  Logger.info(token);
  Logger.info("=========== END TOKEN RECEIVED ===========");
  Logger.info("url:" + req.originalUrl);
  const currentUser = await User.findOne({ email: token.preferred_username });
  if (currentUser) {
    req.currentUser = currentUser;
    done(null, token);
  } else {
    done(httpError.notFound(token.email));
  }
});

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
authenticate = function() {
  return passport.authenticate("oauth-bearer", {
    session: false
  });
};
//  app.use("/api");

// add morgan to log HTTP requests
app.use(morgan("combined"));

// initialize db

require("./data/mongo")();

app.listen(config.port, function() {
  if (config.env === "development") {
    Logger.info(`API Server listening on port ${config.port}`);
    Logger.info("Open browser at:");
    Logger.info(`http://localhost:${config.port}`);
  }
});

app.post("/api/kudo/:id/saveImage",function(req,res){
  Kudo.findById(req.params.id).exec((err, kudo) => {
    if (err) {
      res.status(err);
    } else {
     kudo.image =req.body.data;
     kudo.save();
     
     return res.status(200).end();
    }
  });
 
 });

 app.get('/api/kudo/:id/getImage',function(req,res){
  Kudo.findById(req.params.id).exec((err, kudo) => {
    if (err) {
      res.status(err);
    } else {
      var img = Buffer.from(kudo.image.split(',')[1], 'base64');

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img); 
    }
  });

  
 })

// defining an endpoint to return all users
app.get("/api/user", authenticate(), (req, res, next) => {
  // exclude own user from users list
  User.find({ _id: { $ne: req.currentUser._id } }, (err, users) => {
    if (err) {
      res.status(err);
    } else {
      res.json(users);
    }
  });
});
// defining an endpoint to return 50 kudos
app.get("/api/kudo", authenticate(), (req, res, next) => {
  const skip = parseInt(req.query.skip) || 0;
  Logger.info("skip", skip);
  Kudo.find()
    .populate("receiver")
    .sort({ createdOn: "descending" })
    .limit(50)
    .skip(skip)
    .exec((err, kudos) => {
      if (err) {
        Logger.info(err);

        res.status(err);
      } else {
        Logger.info(kudos.length);

        res.json(kudos);
      }
    });
});

app.get("/api/mykudo/", authenticate(), async (req, res, next) => {
  Kudo.find({ receiver: req.currentUser._id })
    .populate("sender")
    .sort({ createdOn: "descending" })
    .exec((err, kudo) => {
      if (err) {
        res.status(err);
      } else {
        res.json(kudo);
      }
    });
});

app.get("/api/unreadKudos/", authenticate(), (req, res, next) => {
  Kudo.find({ receiver: req.currentUser._id, status: "unread" }).count(
    (err, kudoCount) => {
      if (err) {
        res.status(err);
      } else {
        res.json(kudoCount);
      }
    }
  );
});

app.put("/api/changeStatus/", authenticate(), (req, res, next) => {
  Kudo.find(
    { receiver: req.currentUser._id, status: "unread" },
    (err, kudos) => {
      if (err) {
        res.status(err);
      } else {
        kudos.forEach(kudo => {
          kudo.status = req.body.status;
          kudo.save();
        });
        res.send({ message: "Status are updated" });
      }
    }
  );
});

// endpoint to create a kudo
app.post("/api/kudo", authenticate(), async (req, res) => {
  let kudo = req.body;
  kudo.sender = req.currentUser._id;
  kudo.status = "unread";

  const newKudo = new Kudo(req.body);
  await newKudo.save();
  res.send({ message: "New kudo inserted." });
});

app.post("/api/kudo/batch", authenticate(), async (req, res) => {
  let kudos = req.body;
  const sender = req.currentUser._id;
  const status = "unread";
  let promiseList = [];

  kudos.forEach(kudo => promiseList.push(new Kudo(kudo).save()));

  await Promise.all(promiseList);
  res.send({ message: "New kudo inserted." });
});

//public kudo
app.get("/api/publicKudo/:id", (req, res, next) => {
  Kudo.findById(req.params.id)
    .populate("sender")
    .sort({ createdOn: "descending" })
    .exec((err, kudos) => {
      if (err) {
        res.status(err);
      } else {
        res.json(kudos);
      }
    });
});

// endpoint to delete a kudo
app.delete("/api/kudo/:id", authenticate(), async (req, res) => {
  await Kudo.deleteOne({ _id: req.params.id });
  res.send({ message: "Kudo removed." });
});
