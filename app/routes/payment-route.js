var router = require('express').Router();
var promise = require('bluebird');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}))

const db = require("../app.js").db;

const authenticateUser = require('../public/js/authenticateUser.js').authenticateUser;
const isUserVerified = require('../public/js/userVerification.js').isUserVerified;

// when on the payment url, retrieve the artwork ID from the url query
// in order to grab artwork information from db
router.get('/payment', authenticateUser, isUserVerified, function(req,res) {
    let artworkId = req.query.artworkId;
    let queryString = 'SELECT * FROM artworks INNER JOIN lots ON lots.artwork_id = artworks.id WHERE artworks.id = ';
    queryString = queryString.concat(artworkId).concat(";");
    db.any(queryString).then(function(data) {
        res.render('layouts/payment', {
            'bid': req.query.bidAmount, // grab bid amount from url query
            'userInfo': req.session.user, // grab user id from session
            'artworkInfo': data[0] // make db record queried accessible on payment page
        })
    });
});

module.exports = router;
