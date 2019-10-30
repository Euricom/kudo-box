const config = require("./development");

config.env = "production";

config.mongo = process.env.mongo

module.exports = config;
