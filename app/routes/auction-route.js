var router = require('express').Router();
var promise = require('bluebird');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}))

const db = require("../app.js").db;


const authenticateUser = require('../public/js/authenticateUser.js').authenticateUser;

router.get('/auction', authenticateUser, (req,res) => {
    
    let date = new Date();
    let timestamp = date.getTime();
    console.log(timestamp);

    db.any('SELECT * FROM auctions;').then(function(data) {
        console.log(data[0].start_timestamp);
        var startDate = new Date(start_timestamp);
        console.log(startDate);
        console.log(data[0].end_timestamp);
        console.log(data);
        res.render('layouts/auction', {
            'auctionsyo': data,
        });
    })
})

module.exports = router;
