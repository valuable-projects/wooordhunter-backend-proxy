// @flow

const mongoose = require('mongoose');

const { MONGODB_URL } = require('../../config');
const models = require('./models');

mongoose.connect(MONGODB_URL);

module.exports = {
  models,
};
