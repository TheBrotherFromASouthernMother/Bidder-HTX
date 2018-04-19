const router = require('express').Router();

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require("../app.js").db;

router.use(bodyParser.urlencoded({ extended: false }));


router.get('/login', (req, res) => {
    if (req.session.user) {
    res.redirect('/artwork');
  } else {
      res.render('layouts/login')
  }
})

router.post('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/artwork');
  }
  let {email, password} = req.body;

  console.log(email, password);
  db.one('SELECT * FROM users WHERE email = $1', [email]).then( data => {
    bcrypt.compare(password, data.password).then(function(result) {
      // res == true
      console.log("Password match:", result);
      if (result === true) {
      req.session.user = {
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        verified: data.verified
      };
      res.redirect('/artwork');
      } else {
        res.send('Incorrect password')
      }
    });
  }).catch( err => {
    console.log('Oh no there is an error', err)
    res.send(`Oh no there is an error ${err}`)
  })
})


module.exports = router;
