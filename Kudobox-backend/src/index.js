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
var boom = require("express-boom");

//config
const config = require("./config/config");

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

// defining the Express app http server and socketio
const app = express();
// var http = require("http").createServer(app);

passport.use(bearerStrategy);

app.use(passport.initialize()); // Starts passport
app.use(passport.session()); // Provides session support

// // kudoding Helmet to enhance your API's security
app.use(helmet());

app.use(boom());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

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


var server = app.listen(config.port, function() {
  if (config.env === "development") {
    Logger.info(`API Server listening on port ${config.port}`);
    Logger.info("Open browser at:");
    Logger.info(`http://localhost:${config.port}`);
  }
});
var io = require("socket.io").listen(server);

io.on("connection", function(socket) {
  console.log("client connected");
});

app.post("/api/kudo/:id/saveImage", function(req, res) {
  try{
  Kudo.findById(req.params.id).exec().then(kudo => {
   
      kudo.image = req.body.data;
      kudo.save();

      return res.status(200).end();
    }
  );
}catch(err){
  res.boom.notFound(err);
}
});

app.get("/api/kudo/:id/getImage", function(req, res) {
  try{
  Kudo.findById(req.params.id).exec().then(kudo => {

      var img = Buffer.from(kudo.image.split(",")[1], "base64");

      res.writeHead(200, {
        "Content-Type": "image/jpg",
        "Content-Length": img.length
      });
      res.end(img);
    });  
}catch(err){
  res.boom.badRequest(err);
}
});

// defining an endpoint to return all users
app.get("/api/user", authenticate(), (req, res, next) => {
  // exclude own user from users list
  User.find({ _id: { $ne: req.currentUser._id } }, (err, users) => {
    if (err) {
      res.boom.notFound(err);
    } else {
      res.json(users);
    }
  });
});
// defining an endpoint to return 50 kudos
app.get("/api/kudo", authenticate(), (req, res, next) => {
  try{
  const skip = parseInt(req.query.skip) || 0;
  Logger.info("skip", skip);
  Kudo.find()
    .populate("receiver")
    .sort({ createdOn: "descending" })
    .limit(50)
    .skip(skip)
    .exec().then(kudos=>{
        Logger.info(kudos.length);
        res.json(kudos);
      });
  }catch(err){
    res.boom.badRequest(err);
  }
});

app.get("/api/mykudo/", authenticate(), async (req, res, next) => {
  try {
    Kudo.find({ receiver: req.currentUser._id })
      .populate("sender")
      .sort({ createdOn: "descending" })
      .exec()
      .then(kudo => res.json(kudo))
      .catch(err => next(err));
  } catch (err) {
    res.boom.badRequest(err);
  }
});

app.get("/api/unreadKudos/", authenticate(), (req, res, next) => {
  try {
    Kudo.find({ receiver: req.currentUser._id, status: "unread" })
      .count()
      .then(kudoCount => res.json(kudoCount))
      .catch(err => next(err));
  } catch (err) {
    res.boom.badRequest(err);
  }
});

app.put("/api/changeStatus/", authenticate(), (req, res, next) => {
  try {
    Kudo.find({ receiver: req.currentUser._id, status: "unread" })
      .then(kudos => {
        kudos.forEach(kudo => {
          kudo.status = req.body.status;
          kudo.save();
        });
        res.send({ message: "Status are updated" });
      })
      .catch(err => next(err));
  } catch (err) {
    res.boom.badRequest(err);
  }
});

// endpoint to create a kudo
app.post("/api/kudo", authenticate(), async (req, res) => {
  try {
    let kudo = req.body;
    kudo.sender = req.currentUser._id;
    kudo.status = "unread";

    const newKudo = new Kudo(req.body);
    await newKudo.save().then(kudo => {
      io.emit("newWallOfFameKudo", [kudo]);
      console.log(kudo)
      res.send({ message: "New kudo inserted." });
    });
  } catch (err) {
    res.boom.badRequest(err);
  }
});

app.post("/api/kudo/batch", authenticate(), async (req, res, next) => {
  try{
  let kudos = req.body;
  const sender = req.currentUser._id;
  const status = "unread";
  let promiseList = [];
  kudos.forEach(kudo => {
    kudo._id = undefined
    let newKudo = new Kudo(kudo);
    newKudo.sender = sender;
    newKudo.status = status;
    promiseList.push(newKudo.save());
  });
  const savedKudos = await Promise.all(promiseList);
  
  io.emit("newWallOfFameKudo", [...savedKudos]);  
  res.send({ message: "New kudo inserted." });
}catch(err){
  res.boom.badRequest(err);
}
});

//public kudo
app.get("/api/publicKudo/:id", (req, res, next) => {
  try{
  Kudo.findById(req.params.id)
    .populate("sender")
    .sort({ createdOn: "descending" })
    .exec().then(kudos => {     
        res.json(kudos);      
    });
  }catch(err){
    res.boom.badRequest(err);
  }
});

// endpoint to delete a kudo
app.delete("/api/kudo/:id", authenticate(), async (req, res) => {
  await Kudo.deleteOne({ _id: req.params.id });
  res.send({ message: "Kudo removed." });
});
