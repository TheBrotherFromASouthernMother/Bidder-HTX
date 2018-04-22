const router = require('express').Router();


router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session = null;
    return res.render('layouts/logout');
  } else {
    res.redirect('/login')
  }
})


module.exports = router;
