var router = require('express').Router();
var promise = require('bluebird');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}))

const db = require("../app.js").db;

const authenticateUser = require('../public/js/authenticateUser.js').authenticateUser;
const isUserVerified = require('../public/js/userVerification.js').isUserVerified;

router.get('/payment', authenticateUser, isUserVerified, function(req,res) {
    res.render('layouts/payment', {
        'bid': req.query.bidAmount,
        'userInfo': req.session.user
    })
});
// router.post('/payment', function(req,res) {
//    let newBid = req.body.bidAmount;
//    db.none('INSERT INTO bids(bid_amount) values($1)',[newBid]).then(function() {
//        db.any('SELCT * FROM bids').then(function(data) {
//            res.render('payment', {
//                'bids': data
//            });
//        })
//    })
// })

module.exports = router;
