const router = require('express').Router();


router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy( err => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        return res.redirect('/');
      }
    })
  }
})


module.exports = router;
