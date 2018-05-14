const LRU = require('lru-cache');
const convertToStream = require('into-stream');

const { CACHE_CLEANING_CYCLE } = require('../config');

const options = {
  max: 2000,
  maxAge: 60 * 60 * 1000,
};

const cache = LRU(options);

// Release old unused values
setInterval(() => cache.prune(), CACHE_CLEANING_CYCLE);

module.exports = {
  has: key => cache.has(key),

  getStream: (key) => {
    const value = cache.get(key);

    return convertToStream(value);
  },

  setStream(key, stream) {
    let buffer = '';

    stream
      .on('data', (chunk) => {
        buffer += chunk.toString();
      })
      .on('end', () => {
        cache.set(key, buffer);
      });
  },
};
