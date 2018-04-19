var router = require('express').Router();
var promise = require('bluebird');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}))

const db = require("../app.js").db;


const authenticateUser = require('../public/js/authenticateUser.js').authenticateUser;

router.get('/auction', authenticateUser, (req,res) => {
    
    let todaysDate = new Date(),
        rightNow = todaysDate.getTime(),
        dataToPass = [];

    db.query('SELECT * FROM auctions;').then( data => {

        data.forEach( obj => {
            let startDate = obj.start_timestamp,
                startTimeStamp = startDate.getTime(),
                endDate = obj.end_timestamp,
                endTimeStamp = endDate.getTime();
            if (startTimeStamp < rightNow && endTimeStamp > rightNow) {
                dataToPass = dataToPass.concat(obj);
            };
        });


        res.render('layouts/auction', {
            'auctionsyo': dataToPass,
        });
    }).catch( err => {
        console.log('Oh no there is an error', err)
        res.send(`Oh no there is an error ${err}`)
      })
})

module.exports = router;
