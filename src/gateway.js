const prefix = require('../config').PREFIX;

module.exports = (req, res, next) => {
  const destination = req.headers['wooorhunt-destination-header'] || '';

  if (!destination.startsWith(prefix)) {
    res.statusCode = 500;
    return res.end();
  }

  req.destination = destination;

  return next();
};
