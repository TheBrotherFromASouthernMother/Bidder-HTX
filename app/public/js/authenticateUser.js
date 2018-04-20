module.exports.authenticateUser =  (req, res, next) => {
  if (!req.session.user) {
    res.render('layouts/acess');
  } else {
    return next();
  }
}
