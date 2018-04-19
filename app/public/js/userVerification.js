module.exports.isUserVerified = (req, res, next) => {
  if (req.session.user.verified === true) {
    return next();
  } else {
    res.redirect('/verification')
  }
}
