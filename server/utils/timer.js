module.exports = (req, res, next) => {
  req.date = Date.now();
  return next();
};
