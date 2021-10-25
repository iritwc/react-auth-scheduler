const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
const logger = require('morgan');
const bookingRouter = require('./server/bookingRouting');

// Create a new Express app
const app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
// var mongoDB = 'mongodb://127.0.0.1/scheduler';
var mongoDB = 'mongodb+srv://scheduler:IfZ5K3Nl4JRe1u5B@cluster0.vxztn.azure.mongodb.net/scheduler?retryWrites=true&w=majority';
// var mongoDB = 'mongodb+srv://scheduler:dynamicyield@cluster0-vxztn.azure.mongodb.net/scheduler?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true }).
  catch(error => console.log('mongoose connect: ', error));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-ac8x93re.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

app.use('/api', checkJwt, bookingRouter);

// Start the app
app.listen(3001, () => console.log('API listening on 3001'));
