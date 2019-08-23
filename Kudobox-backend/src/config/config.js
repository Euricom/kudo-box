const env = process.env.NODE_ENV || 'development';

// Service message for console in case of unknown environment
if (env !== 'test' && env !== 'development' && env !== 'production') {
    const log = require('../core/logger')('config');
    log.fatal(`ERROR - Unsupported environment: ${  env}`);
    log.fatal('Use: NODE_ENV=[test | development | production]');
    log.error('Quiting...');
    process.exit();
}
const cfg = require(`./env/${env}`);

module.exports = cfg;
