var router = require('express').Router();

router.get('/artwork', (req,res) => {
    res.render('layouts/artwork')
});

module.exports = router;