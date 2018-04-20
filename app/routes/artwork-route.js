var router = require('express').Router();
var promise = require('bluebird');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}))

const db = require("../app.js").db;

const authenticateUser = require('../public/js/authenticateUser.js').authenticateUser;

router.get('/artwork/:whatever', authenticateUser, (req,res) => {

    let whateverId = req.params.whatever;
    let queryString = 'SELECT * FROM lots INNER JOIN artworks ON artwork_id = artworks.id WHERE auction_id = '
    queryString = queryString.concat(whateverId).concat(";");

    db.any(queryString).then(function(data) {
        res.render('layouts/artwork', {
            'artworks': data,
            'userInfo': req.session.user
        });
    })

})

module.exports = router;