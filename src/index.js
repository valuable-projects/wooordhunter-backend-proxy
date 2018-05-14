const http = require('http');
const { compose } = require('compose-middleware');

const cache = require('./cache');

const logger = require('./logger');
const cors = require('./cors');
const gateway = require('./gateway');

const port = 8000;

console.log('wooorhunter backend proxy is running');

const middleware = compose([cors, gateway, logger]);

const server = http.createServer((req, res) => {
  middleware(req, res, () => {
    const { destination } = req;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (cache.has(destination)) {
      return cache.getStream(destination).pipe(res);
    }

    return http.get(destination, (wooordHuntResponse) => {
      wooordHuntResponse.pipe(res);
      cache.setStream(destination, wooordHuntResponse);
      wooordHuntResponse.on('error', console.error);
    });
  });
});

server.listen(port);
