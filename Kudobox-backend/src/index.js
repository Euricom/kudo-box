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
const puppeteer = require("puppeteer");
const kudoImages = require("./data/kudoImages");
var dateFormat = require("dateformat");

//config
const config = require("./config/config");

// Our logger
const consoleHandler = Logger.createDefaultHandler();

Logger.useDefaults();
Logger.setLevel(config.logLevel);
Logger.setHandler((messages, context) => {
  //if (config.env === "development") {
  consoleHandler(messages, context);
  //}
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
  // Logger.info("DO USER STUFF HERE");
  // Logger.info("=========== START TOKEN RECEIVED ===========");
  // Logger.info(token);
  // Logger.info("=========== END TOKEN RECEIVED ===========");
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

app.use(express.static("/src/assets/images"));
app.use("/images", express.static(__dirname + "/assets/images"));

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
  try {
    Kudo.findById(req.params.id)
      .exec()
      .then(kudo => {
        kudo.image = req.body.data;
        kudo.save();

        return res.status(200).end();
      });
  } catch (err) {
    res.boom.notFound(err);
  }
});

app.get("/api/kudo/:id/getImage", function(req, res) {
  try {
    Logger.info("getimage start");
    baseUrl = req.protocol + "://" + req.get("host");
    Logger.info("getimage baseUrl ", baseUrl);

    return Kudo.findById(req.params.id)
      .populate("sender")
      .exec()
      .then(kudo => {
        // Logger.info("getimage kudo ", kudo);
        return screenshotDOMElement(kudo, baseUrl, {
          selector: "#captureThis",
          encoding: "binary"
        }).then(img => res.type("image/png").send(img));
      });
  } catch (err) {
    res.boom.badRequest(err);
  }
});

function screenshotDOMElement(kudo, baseUrl, opts = {}) {
  // Logger.info("screenshotDOMElement ", kudo);
  try {
    var htmlstring = `
      <div id="captureThis" class="captureContainer my-kudo-card" style="position: relative; width: 500px; border-radius: 4px; box-shadow: 0 0 12px 2px #d7d7d5;">
        <img src="${baseUrl}${kudoImages.find(image => image.id === kudo.kudoId)
      .url || kudoImages[0].url}" 
          alt="Kudo" class="my-kudo-card-image" style="width: 500px; height:500px; display: block;" width="500">
        <textarea  class="textAreaForImage" style="font-family: '${
          kudo.fontFamily
        }'; position: absolute; padding: 0px; margin: 0px; 
        font-size: 20px; border: none; background: none; outline: none; resize: none; color: rgb(105, 190, 40); //top: 149px; top: 132px; //top: 0; //left: 89px; 
        left: 77px; width: 355px; height: 225px; line-height: 35.5px; display: block;">${
          kudo.text
        }</textarea>
        <div class="generalInfo" style="position: absolute; bottom: 8px; left: 50px; color: #69be28; width: 80%; text-align: center;">
          <p>${kudo.sender.name} - ${dateFormat(
      kudo.createdOn,
      "dddd d/m/yy h:mm"
    )}</p>
        </div>
      </div>
        `;
    // Logger.info("screenshotDOMElement htmlstring", htmlstring);
    Logger.info("launch puppeteer");
    return puppeteer
      .launch({
        args: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-setuid-sandbox",
          "--no-first-run",
          "--deterministic-fetch",
          '--proxy-server="direct://"',
          "--proxy-bypass-list=*",
          "--disable-gpu"
        ]
      })
      .then(browser => {
        Logger.info("launch new page");

        return browser.newPage().then(page => {
          return page.setContent(htmlstring).then(() => {
            const padding = "padding" in opts ? opts.padding : 0;
            const path = "path" in opts ? opts.path : null;
            const selector = opts.selector;

            if (!selector) throw Error("Please provide a selector.");
            Logger.info("eval");

            return page.evaluate(selector => {
              const element = document.querySelector(selector);
              if (!element) return null;
              const { x, y, width, height } = element.getBoundingClientRect();
              return { left: x, top: y, width, height, id: element.id };
            }, selector).then((rect)=> {

            if (!rect)
              throw Error(
                `Could not find element that matches selector: ${selector}.`
              );
            Logger.info("screenshot");

            return page
              .screenshot({
                path,
                clip: {
                  x: rect.left - padding,
                  y: rect.top - padding,
                  width: rect.width + padding * 2,
                  height: rect.height + padding * 2
                }
              })
              .then(image => {
                browser.close();
                return image;
              });
          });
        });
        });
      });

    // Logger.info("setUserAgent");

    // page.setUserAgent(
    //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    // );
    // Logger.info("setContent");

    // page.setContent(htmlstring);

    // const padding = "padding" in opts ? opts.padding : 0;
    // const path = "path" in opts ? opts.path : null;
    // const selector = opts.selector;

    // if (!selector) throw Error("Please provide a selector.");
    // Logger.info("eval");

    // const rect = page.evaluate(selector => {
    //   const element = document.querySelector(selector);
    //   if (!element) return null;
    //   const { x, y, width, height } = element.getBoundingClientRect();
    //   return { left: x, top: y, width, height, id: element.id };
    // }, selector);

    // if (!rect)
    //   throw Error(`Could not find element that matches selector: ${selector}.`);
    // Logger.info("screenshot");

    // var image = page.screenshot({
    //   path,
    //   clip: {
    //     x: rect.left - padding,
    //     y: rect.top - padding,
    //     width: rect.width + padding * 2,
    //     height: rect.height + padding * 2
    //   }
    // });
    // Logger.info("close");

    // browser.close();
    // Logger.info("screenshotDOMElement done");

    // return image;
  } catch (error) {
    throw error;
  }
}

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
  try {
    const skip = parseInt(req.query.skip) || 0;
    Logger.info("skip", skip);
    Kudo.find()
      .populate("receiver")
      .sort({ createdOn: "descending" })
      .limit(50)
      .skip(skip)
      .exec()
      .then(kudos => {
        Logger.info(kudos.length);
        res.json(kudos);
      });
  } catch (err) {
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
    await newKudo.save().then(async kudo => {
      const test = await kudo.getLatestPrivate();
      io.emit("newWallOfFameKudo", [test]);
      console.log(kudo);
      res.send({ message: "New kudo inserted." });
    });
  } catch (err) {
    res.boom.badRequest(err);
  }
});

app.post("/api/kudo/batch", authenticate(), async (req, res, next) => {
  try {
    let kudos = req.body;
    const sender = req.currentUser._id;
    const status = "unread";
    let promiseList = [];
    kudos.forEach(kudo => {
      kudo._id = undefined;
      let newKudo = new Kudo(kudo);
      newKudo.sender = sender;
      newKudo.status = status;
      promiseList.push(newKudo.save().then(kudo => kudo.getLatestPrivate()));
    });
    const savedKudos = await Promise.all(promiseList);
    io.emit("newWallOfFameKudo", [...savedKudos]);
    res.send({ message: "New kudo inserted." });
  } catch (err) {
    res.boom.badRequest(err);
  }
});

//public kudo
app.get("/api/publicKudo/:id", (req, res, next) => {
  try {
    Kudo.findById(req.params.id)
      .populate("sender")
      .sort({ createdOn: "descending" })
      .exec()
      .then(kudos => {
        res.json(kudos);
      });
  } catch (err) {
    res.boom.badRequest(err);
  }
});

// endpoint to delete a kudo
app.delete("/api/kudo/:id", authenticate(), async (req, res) => {
  await Kudo.deleteOne({ _id: req.params.id });
  res.send({ message: "Kudo removed." });
});
