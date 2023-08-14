function log(req, res, next) {
  console.log("Logging");
  // it is necessary to put the next() for giving the access to other middle wear
  next();
}

module.exports = log