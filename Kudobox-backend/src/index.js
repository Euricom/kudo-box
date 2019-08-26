// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const helmet = require('helmet');
const morgan = require('morgan');
const Kudo = require('./models/kudo');
const authentication = require('./middleware/authentication');

//config
const config = require('./config/config')

//db

// defining the Express app
const app = express();

// // kudoding Helmet to enhance your API's security
// app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.use('/',authentication);

// add morgan to log HTTP requests
app.use(morgan('combined'));

// initialize db

require('./data/mongo')();

function proctectRoute(req,res,next){
  // if user exists the token was sent with the request
  if(req.user){
   //if user exists then go to next middleware
     next();
  }
// token was not sent with request send error to user
  else{
     res.status(500).json({error:'login is required'});
  }
}

app.listen(config.port,function() {
  console.log(`API Server listening on port ${config.port}`);
  console.log('Open browser at:');
  console.log( `http://localhost:${config.port}`);
});

// defining an endpoint to return all kudos
app.get('/kudo',(req, res,next) => {
  
  Kudo.find((err, kudo) => {
    if (err){
      res.status(err);
    }
    else{
        res.json(kudo);
    }
});
});

app.get('/kudo/:id', async (req, res,next) => {  
  await Kudo.findById(req.params.id,(err,kudo) => {
    if (err){
      res.status(err); }
    else{
        res.json(kudo);
    }
});
});

// endpoint to create a kudo
app.post('/kudo',  async (req, res) => {
  const newKudo = new Kudo(req.body);
  await newKudo.save();
  res.send({ message: 'New kudo inserted.' });
});

// endpoint to delete a kudo
app.delete('/kudo/:id', async (req, res) => {
  await Kudo.deleteOne({_id: req.params.id});
  res.send({ message: 'Kudo removed.' });
});
