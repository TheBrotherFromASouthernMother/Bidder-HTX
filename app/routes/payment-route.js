var router = require('express').Router();

const authenticateUser = require('./authenticateUser.js').authenticateUser;

router.get('/payment', authenticateUser, (req,res) => {
    res.render('layouts/payment')
});

module.exports = router;
