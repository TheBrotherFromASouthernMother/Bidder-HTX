var router = require('express').Router();
var promise = require('bluebird');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}))

const db = require("../app.js").db;


const authenticateUser = require('./authenticateUser.js').authenticateUser;

router.get('/lot/:whatever', authenticateUser, (req,res) => {

    let whateverId = req.params.whatever;
    let queryString = 'WITH high_bids AS (SELECT MAX(bid_amount), lot_id FROM bids GROUP BY lot_id) SELECT * FROM high_bids INNER JOIN lots ON lot_id = lots.id INNER JOIN artworks ON artworks.id = artwork_id WHERE artwork_id = ';
    queryString = queryString.concat(whateverId).concat(";");

    db.any(queryString).then(function(data) {
        res.render('layouts/lot', {
            'artwork' : data
        });
    })
})

module.exports = router;


// $(".bid-on-it").click( function() {
//     let artworkId = $(this).attr("artwork-id");
//     window.location = "/" + artworkId;
// });