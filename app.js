// @flow

const express = require('express');

// middlewares
const { cors, logger } = require('./middleware');

// routes
const registrationRoute = require('./routes/register');
const wordRoute = require('./routes/word');
const tipsRoute = require('./routes/tip');

const app = express();

app.use(cors);
app.use(logger);

app.use('/registration', registrationRoute);
app.use('/word', wordRoute);
app.use('/tips', tipsRoute);

app.listen('3333');
