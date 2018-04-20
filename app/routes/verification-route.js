const router = require('express').Router();

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require("../app.js").db;

router.get('/verification', (req, res) => {
  if (req.session.user && req.session.user.verified === true) {
    res.redirect('/auction');
    return;
  }
  res.render('layouts/verifyAccount');
})


router.post('/verification', (req, res) => {
  let {email} = req.body;
  db.one('SELECT * FROM users WHERE email = $1', [email])
  .then( data => {
    if (data.verified === true) {
      res.send('already verified');
      return;
    }
    bcrypt.compare(email, data['activation_hash'])
    .then(result => {
      if (result === false) {
        res.send('There is no username matching that input')
        return;
      }
      db.any('UPDATE users SET verified = TRUE WHERE email = $1', [email])
      .then( ()=> {
        res.send('user has been verified');
        return;
      }).catch( err => {
        console.log(err);
        res.send('there was an error processing your request')
        return;
      });

    }).catch( err => {
      console.log(err);
      res.send("There was an error processing your request")
      return;
    })
  }).catch( err => {
    console.log(err);
    res.send("There was an error processing your request")
    return;
  })
})

module.exports = router;
