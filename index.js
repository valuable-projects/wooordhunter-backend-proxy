const http = require('http');
const port = 8000;

const prefix = 'http://wooordhunt.ru/';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Wooorhunt-Destination-Header');

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  const destination = req.headers['wooorhunt-destination-header'] || '';

  console.log('destination', destination);

  if (!destination.startsWith(prefix)) {
    res.statusCode = 500;
    return res.end();
  }

  return http.get(destination, (wooordHuntResponse) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    wooordHuntResponse.pipe(res);
    wooordHuntResponse.on('error', console.error);
  });
});

server.listen(port);
