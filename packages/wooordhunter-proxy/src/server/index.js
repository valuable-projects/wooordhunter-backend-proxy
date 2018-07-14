// @flow

const express = require('express');
const bodyParser = require('body-parser');

// database connection
require('../database');

// middlewares
const { cors, logger } = require('../middleware');

// routes
const registrationRoute = require('../routes/register');
const wordRoute = require('../routes/word');
const tipsRoute = require('../routes/tip');

module.exports = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors);
  app.use(logger);

  app.use('/registration', registrationRoute);
  app.use('/word', wordRoute);
  app.use('/tips', tipsRoute);

  return app;
};
