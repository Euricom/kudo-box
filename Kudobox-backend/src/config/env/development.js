const Logger = require('js-logger');
const settings = require('../settings.json')

const config =(module.exports = {});

config.env = 'development';
config.logLevel = Logger.DEBUG;
config.port = process.env.PORT || 4001;
config.mongo = settings.connectionStrings.mongo
config.tenantId = '0b53d2c1-bc55-4ab3-a161-927d289257f2'
config.creds = settings.creds
