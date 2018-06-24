// @flow

const { env } = process;

const MONGODB_URL = `${env.MONGO_URL || ''}:${env.MONGO_PORT || ''}/${env.MONGO_DATABASE || ''}`;

module.exports = {
  MONGODB_URL,
  PREFIX: 'http://wooordhunt.ru',
};
