var router = require('express').Router();
var promise = require('bluebird');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}))

const db = require("../app.js").db;

const authenticateUser = require('../public/js/authenticateUser.js').authenticateUser;

// when on artwork specific pages, retrieve artwork ID from the url route parameter
// in order to grab artwork information from db
router.get('/artwork/:whatever', authenticateUser, (req,res) => {
    let whateverId = req.params.whatever;
    let queryString = 'SELECT * FROM lots INNER JOIN artworks ON artwork_id = artworks.id WHERE auction_id = '
    queryString = queryString.concat(whateverId).concat(";");
    db.any(queryString).then(function(data) {
        res.render('layouts/artwork', {
            'artworks': data, // make db record queried accessible on artwork page
            'userInfo': req.session.user // grab user id from session
        });
    })
})

module.exports = router;