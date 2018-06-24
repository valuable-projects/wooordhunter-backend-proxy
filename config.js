// @flow

const { env } = process;

let mongoDBUrl = env.MONGO_URL || '';
let mongoDBPort = env.MONGO_PORT || '';
let mongoDBDatabase = env.MONGO_PORT || '';

if (process.env.NODE_ENV === 'TEST') {
  mongoDBUrl = mongoDBUrl || 'mongodb://127.0.0.1';
  mongoDBPort = mongoDBPort || 27017;
  mongoDBDatabase = mongoDBDatabase || 'test';
}

const MONGODB_URL = `${mongoDBUrl}:${mongoDBPort}/${mongoDBDatabase}`;

console.log('MONGODB_URL', MONGODB_URL);

module.exports = {
  MONGODB_URL,
  PREFIX: 'http://wooordhunt.ru',
};
