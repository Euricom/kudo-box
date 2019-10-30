const mongoose = require("mongoose");
const config = require("../config/config");
const initDataGenerator = require("./initDataGenerator");
const User = require("../models/user");
const Kudo = require("../models/kudo");
const Logger = require("js-logger");

module.exports = function() {
  Logger.info("Initialize mongodb...");
  // Logger.info(
  //   "DEZE VALUE ZOEKT GE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  //   process.env.mongo
  // );
  const connectionString = config.mongo;
  // Logger.info(
  //   "DEZE VALUE ZOEKT GE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  //   config.mongo
  // );
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  let connection = mongoose.connection;
  connection.on("error", console.error.bind(console, "connection error: "));
  connection.once("open", function() {
    Logger.info("connected");
  });
  User.findOne({}).then(async user => {
    if (!user) {
      await initDataGenerator.generateUsers();
    }

    if (config.env === "development") {
      mongoose.set("debug", true);
      Kudo.findOne({}).then(async kudo => {
        if (!kudo) {
          initDataGenerator.generateKudos();
        }
      });
    }
  });
};
