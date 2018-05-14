module.exports = (req, res, next) => {
  console.log('destination', req.destination);

  return next();
};
