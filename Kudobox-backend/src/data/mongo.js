const mongoose = require("mongoose");
const config = require("../config/config");
const initDataGenerator = require("./initDataGenerator");
const User = require("../models/user");
const Kudo = require("../models/kudo");

module.exports = function() {
  console.log("Initialize mongodb...");
  const connectionString = config.mongo;
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function() {
    console.log("connected");
  });
  User.findOne({}).then(async user => {
    if (user) {
      await User.deleteMany({}, function(err, result) {
        if (err) {
          console.log("error delete collection");
        } else {
          console.log("delete collection success");
        }
        return null;
      });
    }
    await initDataGenerator.generateUsers();
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
