const mongoose = require('mongoose');
const config = require('../config/config');


module.exports = function(){
  console.log('Initialize mongodb...');
  const url = config.mongo.uri;
  const dbName = config.mongo.dbName;
  const mongoDBURL = `${url}/${dbName}`;
  mongoose.connect(mongoDBURL, {useNewUrlParser: true,useUnifiedTopology: true });
  let db = mongoose.connection;
  db.on('error',console.error.bind(console,'connection error: '))
  db.once('open', function(){
    console.log('connected');
  })
};
