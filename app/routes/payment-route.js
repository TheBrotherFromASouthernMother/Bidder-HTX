var router = require('express').Router();

router.get('/payment', (req,res) => {
    res.render('layouts/payment')
});

module.exports = router;