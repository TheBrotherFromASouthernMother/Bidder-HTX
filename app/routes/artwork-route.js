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

    // to select auction specific info from db
    let queryStringName = 'SELECT * FROM auctions WHERE id = ';
    queryStringName = queryStringName.concat(whateverId).concat(";");
    let me = null;

    let finalquery = queryString.concat(';').concat(queryStringName);

    db.multi(finalquery)
    .spread((data, name) => {
        res.render('layouts/artwork', {
            'auctionname' : name[0],
            'artworks': data,
            'userInfo': req.session.user
        })
   })
   .catch(error => {
    console.log("there is an error ahh")
    });
});

module.exports = router;