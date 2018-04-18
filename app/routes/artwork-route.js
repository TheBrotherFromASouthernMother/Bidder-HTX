var router = require('express').Router();
var promise = require('bluebird');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}))

const initOptions = {
    // Initialization Options
    promiseLib: promise
  };
  const pgp = require('pg-promise')(initOptions);
  const db = pgp({
    connectionString: 'postgres://qgauodbyzimumj:4071b5334860231f7881bb907f5fbc9e9fad3e60b9c759cd8bdac0214daf670d@ec2-54-83-204-6.compute-1.amazonaws.com:5432/d5df5c8pc330kr',
    ssl: true
  });

const authenticateUser = require('./authenticateUser.js').authenticateUser;

router.get('/artwork', authenticateUser, (req,res) => {
    db.any('WITH high_bids AS (SELECT MAX(bid_amount), lot_id FROM bids GROUP BY lot_id) SELECT * FROM high_bids INNER JOIN lots ON lot_id = lots.id INNER JOIN artworks ON artworks.id = artwork_id WHERE auction_id = 1;').then(function(data) {
        res.render('layouts/artwork', {
            'artworks': data
        });
    })
})

module.exports = router;
