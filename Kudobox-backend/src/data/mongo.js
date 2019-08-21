const mongoose = require('mongoose');


module.exports = function(){
  console.log('Initialize mongodb...');
  const url = 'mongodb://localhost:27017';
  const dbName = 'kudobox';
  const mongoDBURL = `${url}/${dbName}`;
  mongoose.connect(mongoDBURL, {useNewUrlParser: true,useUnifiedTopology: true });
  let db = mongoose.connection;
  db.on('error',console.error.bind(console,'connection error: '))
  db.once('open', function(){
    console.log('connected');
  })
};