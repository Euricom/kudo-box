const config =(module.exports = {});

config.env = 'development';
config.port = process.env.PORT || 3000;
config.mongo ={
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    dbName: 'kudobox'
}