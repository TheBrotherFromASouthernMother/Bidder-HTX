var router = require('express').Router();

const authenticateUser = require('../public/js/authenticateUser.js').authenticateUser;

router.get('/payment', authenticateUser, (req,res) => {
    res.render('layouts/payment')
});

module.exports = router;
