module.exports.authenticateUser =  (req, res, next) => {
  if (!req.session.user) {
    res.send('Unauthorized access attempt')
  } else {
    return next();
  }
}
