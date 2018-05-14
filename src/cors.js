module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Wooorhunt-Destination-Header');

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  return next();
};
